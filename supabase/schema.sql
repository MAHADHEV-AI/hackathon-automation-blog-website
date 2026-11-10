-- ========================================================
-- KOMBAN CUTS - Supabase PostgreSQL Schema & Seed Migration
-- Premium Meat & Seafood E-Commerce Platform (Coimbatore)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Customers & Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'manager')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    label TEXT DEFAULT 'Home' CHECK (label IN ('Home', 'Work', 'Other')),
    recipient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    house_no TEXT NOT NULL,
    street TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT DEFAULT 'Coimbatore',
    state TEXT DEFAULT 'Tamil Nadu',
    pincode TEXT NOT NULL,
    delivery_instructions TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tamil_name TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    badge TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tamil_name TEXT,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE RESTRICT,
    description TEXT NOT NULL,
    short_description TEXT,
    cutting_type TEXT,
    gross_weight TEXT,
    net_weight TEXT,
    serves TEXT,
    storage TEXT DEFAULT 'Keep refrigerated at 0-4°C. Consume within 48 hours.',
    base_price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    stock_quantity INT DEFAULT 100,
    is_available BOOLEAN DEFAULT true,
    is_bestseller BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCT VARIANTS TABLE (e.g. 250g, 500g, 1kg or Egg Packs)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    weight_label TEXT NOT NULL,
    multiplier NUMERIC(5, 2) DEFAULT 1.0,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    stock INT DEFAULT 50,
    is_available BOOLEAN DEFAULT true
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY, -- e.g. KC-2026-0001
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_type TEXT NOT NULL CHECK (delivery_type IN ('home_delivery', 'shop_pickup')),
    delivery_address JSONB,
    delivery_slot TEXT,
    pickup_time TEXT,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0.00,
    coupon_code TEXT,
    delivery_fee NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'razorpay', 'shop_pickup')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    order_status TEXT DEFAULT 'placed' CHECK (order_status IN ('placed', 'confirmed', 'preparing', 'ready_or_out', 'delivered', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_image TEXT,
    weight_label TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);

-- 8. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT NOT NULL,
    razorpay_signature TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'success',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
    discount_value NUMERIC(10, 2) NOT NULL,
    min_order_amount NUMERIC(10, 2) DEFAULT 0.00,
    max_discount NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ
);

-- 10. DELIVERY ZONES TABLE (Coimbatore)
CREATE TABLE IF NOT EXISTS public.delivery_zones (
    id TEXT PRIMARY KEY,
    area_name TEXT NOT NULL,
    pincodes TEXT[] NOT NULL,
    estimated_minutes INT DEFAULT 45,
    standard_fee NUMERIC(10, 2) DEFAULT 40.00,
    is_active BOOLEAN DEFAULT true
);

-- 11. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    id INT PRIMARY KEY DEFAULT 1,
    shop_name TEXT DEFAULT 'KOMBAN CUTS',
    tagline TEXT DEFAULT 'Fresh Cuts. Pure Quality. Delivered Fresh.',
    address TEXT DEFAULT '142, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu – 641012',
    phone TEXT DEFAULT '+91 98422 12345',
    whatsapp_number TEXT DEFAULT '+91 98422 12345',
    email TEXT DEFAULT 'contact@kombancuts.com',
    opening_hours TEXT DEFAULT 'Mon - Sun: 06:30 AM – 09:30 PM',
    min_order_amount NUMERIC(10, 2) DEFAULT 199.00,
    free_delivery_threshold NUMERIC(10, 2) DEFAULT 499.00,
    delivery_fee NUMERIC(10, 2) DEFAULT 40.00,
    pickup_available BOOLEAN DEFAULT true,
    cod_enabled BOOLEAN DEFAULT true,
    online_payment_enabled BOOLEAN DEFAULT true,
    promo_banner_text TEXT DEFAULT 'Freshness You Can Trust – Only at KOMBAN CUTS. Flat ₹50 OFF on orders above ₹499! Use Code: FRESH50',
    promo_banner_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Categories & Products & Variants: Public Read, Admin Write
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Public can view variants" ON public.product_variants FOR SELECT USING (is_available = true);
CREATE POLICY "Public can view delivery zones" ON public.delivery_zones FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view store settings" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);

-- User Profiles: Users can read and update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Addresses: Users can read and manage their own addresses
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Orders: Users can view their own orders, Admins can view all orders
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users create own orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users view own order items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Users insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Reviews: Logged in users can post reviews
CREATE POLICY "Users can insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Admin Full Access Policy Helper (When profile role is 'admin')
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins full manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full manage products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full manage variants" ON public.product_variants FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full manage orders" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full manage settings" ON public.store_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full manage coupons" ON public.coupons FOR ALL USING (public.is_admin());
