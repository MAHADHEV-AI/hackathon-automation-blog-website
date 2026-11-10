export type ProductCategory = 'chicken' | 'mutton' | 'fish-seafood' | 'eggs';

export interface ProductVariant {
  id: string;
  weightLabel: string; // e.g. "250g", "500g", "1kg", "6 Eggs", "12 Eggs", "30 Egg Tray"
  price: number;
  discountPrice?: number;
  multiplier: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  tamilName?: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  cuttingType?: string;
  grossWeight?: string;
  netWeight?: string;
  serves?: string;
  storage?: string;
  basePrice: number;
  discountPrice?: number;
  stockQuantity: number;
  isAvailable: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  imageUrl: string;
  gallery?: string[];
  tags?: string[];
  variants: ProductVariant[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string; // combination of product.id + variant.weightLabel
  productId: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
}

export interface DeliveryZone {
  id: string;
  areaName: string;
  pincodes: string[];
  estimatedMinutes: number;
  standardFee: number;
  isActive: boolean;
}

export type DeliveryType = 'home_delivery' | 'shop_pickup';
export type PaymentMethod = 'cod' | 'razorpay' | 'shop_pickup';
export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready_or_out'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  weightLabel: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email?: string;
  houseNo: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string; // e.g. KC-2026-0001
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: DeliveryType;
  deliveryAddress?: DeliveryAddress;
  deliverySlot?: string;
  pickupTime?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: 'customer' | 'admin';
  savedAddresses: DeliveryAddress[];
  createdAt: string;
}

export interface StoreSettings {
  shopName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  minOrderAmount: number;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  pickupAvailable: boolean;
  codEnabled: boolean;
  onlinePaymentEnabled: boolean;
  promoBannerText: string;
  promoBannerActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

