'use client';

import {
  Product,
  Order,
  StoreSettings,
  Coupon,
  DeliveryZone,
  UserProfile,
  Review,
  OrderStatus,
} from './types';
import {
  PRODUCTS_DATA,
  INITIAL_STORE_SETTINGS,
  INITIAL_COUPONS,
  COIMBATORE_DELIVERY_ZONES,
  TESTIMONIALS_DATA,
} from './data';

const STORAGE_KEYS = {
  PRODUCTS: 'komban_products_v1',
  ORDERS: 'komban_orders_v1',
  SETTINGS: 'komban_settings_v1',
  COUPONS: 'komban_coupons_v1',
  USER_PROFILE: 'komban_user_profile_v1',
  REVIEWS: 'komban_reviews_v1',
};

// Helper for safe client-side localStorage access
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// ----------------- Initial Sample Orders -----------------
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'KC-2026-1042',
    customerName: 'Senthil Nathan',
    customerPhone: '+91 94433 11223',
    customerEmail: 'senthil.n@gmail.com',
    deliveryType: 'home_delivery',
    deliveryAddress: {
      fullName: 'Senthil Nathan',
      phone: '+91 94433 11223',
      houseNo: '45/2, Green Avenue',
      street: 'Avinashi Road',
      area: 'Peelamedu & Hopes College',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641004',
      deliveryInstructions: 'Leave with apartment security.',
    },
    deliverySlot: 'Express 45-60 Mins',
    items: [
      {
        productId: 'chicken-curry-cut',
        productName: 'Chicken Curry Cut',
        productImage: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
        weightLabel: '1kg',
        unitPrice: 269,
        quantity: 1,
        totalPrice: 269,
      },
      {
        productId: 'country-eggs',
        productName: 'Country Eggs (Naatu Kozhi Muttai)',
        productImage: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=800&q=80',
        weightLabel: 'Pack of 12',
        unitPrice: 149,
        quantity: 1,
        totalPrice: 149,
      },
    ],
    subtotal: 418,
    discountAmount: 0,
    deliveryFee: 40,
    totalAmount: 458,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'preparing',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'KC-2026-1041',
    customerName: 'Priya Dharshini',
    customerPhone: '+91 98421 99887',
    customerEmail: 'priya.d@yahoo.com',
    deliveryType: 'shop_pickup',
    pickupTime: 'Today 06:00 PM',
    items: [
      {
        productId: 'mutton-curry-cut',
        productName: 'Mutton Curry Cut',
        productImage: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
        weightLabel: '500g',
        unitPrice: 469,
        quantity: 2,
        totalPrice: 938,
      },
      {
        productId: 'seer-fish-vanjaram',
        productName: 'Seer Fish (Vanjaram)',
        productImage: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
        weightLabel: '500g (3-4 steaks)',
        unitPrice: 549,
        quantity: 1,
        totalPrice: 549,
      },
    ],
    subtotal: 1487,
    discountAmount: 50,
    couponCode: 'FRESH50',
    deliveryFee: 0,
    totalAmount: 1437,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'ready_or_out',
    razorpayOrderId: 'order_M83jf9Kls0',
    razorpayPaymentId: 'pay_M83kf093jks',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  },
  {
    id: 'KC-2026-1040',
    customerName: 'Manojkumar',
    customerPhone: '+91 99440 55443',
    customerEmail: 'manoj.k@gmail.com',
    deliveryType: 'home_delivery',
    deliveryAddress: {
      fullName: 'Manojkumar',
      phone: '+91 99440 55443',
      houseNo: '12B, Thiruvenkatasamy Rd',
      street: 'West RS Puram',
      area: 'R.S. Puram & D.B. Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641002',
    },
    items: [
      {
        productId: 'chicken-breast-boneless',
        productName: 'Chicken Breast Boneless',
        productImage: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
        weightLabel: '1kg',
        unitPrice: 389,
        quantity: 1,
        totalPrice: 389,
      },
    ],
    subtotal: 389,
    discountAmount: 0,
    deliveryFee: 35,
    totalAmount: 424,
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
  },
];

// ----------------- Store API Functions -----------------

export const getStoreProducts = (): Product[] => {
  return getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, PRODUCTS_DATA);
};

export const saveStoreProducts = (products: Product[]): void => {
  setLocalItem(STORAGE_KEYS.PRODUCTS, products);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const products = getStoreProducts();
  return products.find((p) => p.slug === slug || p.id === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getStoreProducts();
  return products.filter((p) => p.category === category);
};

export const addProduct = (product: Product): void => {
  const products = getStoreProducts();
  const updated = [product, ...products];
  saveStoreProducts(updated);
};

export const updateProduct = (id: string, updates: Partial<Product>): void => {
  const products = getStoreProducts();
  const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveStoreProducts(updated);
};

export const deleteProduct = (id: string): void => {
  const products = getStoreProducts();
  const updated = products.filter((p) => p.id !== id);
  saveStoreProducts(updated);
};

// ----------------- Orders API -----------------

export const getStoreOrders = (): Order[] => {
  return getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, SAMPLE_ORDERS);
};

export const saveStoreOrders = (orders: Order[]): void => {
  setLocalItem(STORAGE_KEYS.ORDERS, orders);
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getStoreOrders();
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const orders = getStoreOrders();
  const nextNum = 1000 + orders.length + 1;
  const newOrder: Order = {
    ...orderData,
    id: `KC-2026-${nextNum}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newOrder, ...orders];
  saveStoreOrders(updated);
  return newOrder;
};

export const updateOrderStatus = (
  orderId: string,
  status: OrderStatus,
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
): Order | undefined => {
  const orders = getStoreOrders();
  let updatedOrder: Order | undefined;
  const updated = orders.map((o) => {
    if (o.id === orderId) {
      updatedOrder = {
        ...o,
        orderStatus: status,
        ...(paymentStatus ? { paymentStatus } : {}),
        updatedAt: new Date().toISOString(),
      };
      return updatedOrder;
    }
    return o;
  });
  saveStoreOrders(updated);
  return updatedOrder;
};

// ----------------- Settings & Coupons -----------------

export const getStoreSettings = (): StoreSettings => {
  return getLocalItem<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS);
};

export const saveStoreSettings = (settings: StoreSettings): void => {
  setLocalItem(STORAGE_KEYS.SETTINGS, settings);
};

export const getStoreCoupons = (): Coupon[] => {
  return getLocalItem<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
};

export const saveStoreCoupons = (coupons: Coupon[]): void => {
  setLocalItem(STORAGE_KEYS.COUPONS, coupons);
};

export const validateCoupon = (
  code: string,
  subtotal: number
): { valid: boolean; coupon?: Coupon; discount: number; message: string } => {
  const coupons = getStoreCoupons();
  const found = coupons.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
  );

  if (!found) {
    return { valid: false, discount: 0, message: 'Invalid or expired coupon code.' };
  }

  if (subtotal < found.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ₹${found.minOrderAmount} required for coupon ${found.code}.`,
    };
  }

  let discount = 0;
  if (found.discountType === 'flat') {
    discount = found.discountValue;
  } else {
    discount = Math.round((subtotal * found.discountValue) / 100);
    if (found.maxDiscount && discount > found.maxDiscount) {
      discount = found.maxDiscount;
    }
  }

  return {
    valid: true,
    coupon: found,
    discount,
    message: `Coupon ${found.code} applied successfully!`,
  };
};
