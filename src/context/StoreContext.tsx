'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, StoreSettings, Coupon, OrderStatus } from '@/lib/types';
import {
  getStoreProducts,
  saveStoreProducts,
  getStoreOrders,
  saveStoreOrders,
  getStoreSettings,
  saveStoreSettings,
  getStoreCoupons,
  saveStoreCoupons,
  createOrder as createStoreOrder,
  updateOrderStatus as updateStoreOrderStatus,
} from '@/lib/store';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  settings: StoreSettings;
  coupons: Coupon[];
  refreshData: () => void;
  updateProductPrice: (productId: string, newBasePrice: number, newDiscountPrice?: number) => void;
  updateProductStock: (productId: string, newStock: number, isAvailable: boolean) => void;
  addNewProduct: (product: Product) => void;
  editProduct: (productId: string, updates: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  changeOrderStatus: (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
  ) => Order | undefined;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const refreshData = () => {
    setProducts(getStoreProducts());
    setOrders(getStoreOrders());
    setSettings(getStoreSettings());
    setCoupons(getStoreCoupons());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateProductPrice = (productId: string, newBasePrice: number, newDiscountPrice?: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        // Also update variants prices proportionately
        const updatedVariants = p.variants.map((v) => ({
          ...v,
          price: Math.round(newBasePrice * v.multiplier),
          discountPrice: newDiscountPrice ? Math.round(newDiscountPrice * v.multiplier) : undefined,
        }));
        return {
          ...p,
          basePrice: newBasePrice,
          discountPrice: newDiscountPrice,
          variants: updatedVariants,
        };
      }
      return p;
    });
    setProducts(updated);
    saveStoreProducts(updated);
  };

  const updateProductStock = (productId: string, newStock: number, isAvailable: boolean) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, stockQuantity: newStock, isAvailable } : p
    );
    setProducts(updated);
    saveStoreProducts(updated);
  };

  const addNewProduct = (product: Product) => {
    const updated = [product, ...products];
    setProducts(updated);
    saveStoreProducts(updated);
  };

  const editProduct = (productId: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, ...updates } : p));
    setProducts(updated);
    saveStoreProducts(updated);
  };

  const removeProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    saveStoreProducts(updated);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder = createStoreOrder(orderData);
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const changeOrderStatus = (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
  ) => {
    const updated = updateStoreOrderStatus(orderId, status, paymentStatus);
    if (updated) {
      setOrders(getStoreOrders());
    }
    return updated;
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    const current = getStoreSettings();
    const updated = { ...current, ...newSettings };
    setSettings(updated);
    saveStoreSettings(updated);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        settings,
        coupons,
        refreshData,
        updateProductPrice,
        updateProductStock,
        addNewProduct,
        editProduct,
        removeProduct,
        placeOrder,
        changeOrderStatus,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

