'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant, Coupon, DeliveryType } from '@/lib/types';
import { validateCoupon, getStoreSettings } from '@/lib/store';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateVariant: (cartItemId: string, newVariant: ProductVariant) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'komban_cart_items_v1';
const COUPON_STORAGE_KEY = 'komban_applied_coupon_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('home_delivery');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items or coupon change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items, appliedCoupon, isLoaded]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const cartItemId = `${product.id}-${variant.weightLabel}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedVariant: variant,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const updateVariant = (cartItemId: string, newVariant: ProductVariant) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === cartItemId);
      if (!target) return prev;
      const newCartItemId = `${target.product.id}-${newVariant.weightLabel}`;
      const existingWithNewVariant = prev.find((item) => item.id === newCartItemId);

      if (existingWithNewVariant && existingWithNewVariant.id !== cartItemId) {
        return prev
          .filter((item) => item.id !== cartItemId)
          .map((item) =>
            item.id === newCartItemId
              ? { ...item, quantity: item.quantity + target.quantity }
              : item
          );
      }

      return prev.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              id: newCartItemId,
              selectedVariant: newVariant,
            }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const price = item.selectedVariant.discountPrice ?? item.selectedVariant.price;
    return sum + price * item.quantity;
  }, 0);

  // Re-validate coupon against subtotal
  let discountAmount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountType === 'flat') {
        discountAmount = appliedCoupon.discountValue;
      } else {
        discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
        if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
          discountAmount = appliedCoupon.maxDiscount;
        }
      }
    }
  }

  const applyCoupon = (code: string) => {
    const res = validateCoupon(code, subtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Delivery charge calculations
  const settings = getStoreSettings();
  let deliveryFee = 0;
  if (items.length > 0) {
    if (deliveryType === 'shop_pickup') {
      deliveryFee = 0;
    } else {
      deliveryFee = subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
    }
  }

  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateVariant,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        deliveryType,
        setDeliveryType,
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

