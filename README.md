# KOMBAN CUTS – Premium Online Meat & Seafood E-Commerce Platform

> **Fresh Cuts. Pure Quality. Delivered Fresh.**  
> **142, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu – 641012**  
> Direct Phone & WhatsApp: **+91 98422 12345** • Email: **orders@kombancuts.com**

---

## 🥩 About KOMBAN CUTS

**KOMBAN CUTS** is a full-stack, production-ready online meat, seafood, and poultry shopping platform designed and built specifically for the residents and families of **Coimbatore, Tamil Nadu, India**. 

The platform departs from messy wet-market ordering by providing a temperature-controlled (0–4°C), transparent net-weight e-commerce experience with express 45–60 minute doorstep delivery and counter pickup across Coimbatore (RS Puram, Gandhipuram, Saibaba Colony, Peelamedu, Race Course, Singanallur, Saravanampatti, Vadavalli, Ramanathapuram, etc.).

---

## 🎨 Brand Identity

- **Business Name:** KOMBAN CUTS
- **Tagline:** *Fresh Cuts. Pure Quality. Delivered Fresh.*
- **Location:** Coimbatore, Tamil Nadu, India
- **Brand Colors:**
  - **Primary:** Deep Black (`#111111`)
  - **Secondary:** Dark Charcoal (`#202020`)
  - **Accent:** Premium Red (`#D62828` / `#B71C1C`)
  - **Background:** Clean White (`#FFFFFF`) / Off-White (`#F8F9FA`)
  - **Text:** Dark Grey (`#333333`)
- **Logo:** Custom meat-cleaver silhouette badge with horn notch, gold accent, and bold modern typography.

---

## 🚀 Website Structure & Pages

1. **Home (`/`)**: Hero with high-resolution imagery, category cards, best-seller cuts, 6-pillar trust standards, active coupon promo codes, 4-step farm-to-kitchen workflow, Coimbatore customer testimonials, and newsletter signup.
2. **Shop All (`/shop`)**: Instant search by English or Tamil product names, category filters, price range slider, discount-only toggle, and multi-criteria sorting.
3. **Chicken (`/category/chicken`)**: Whole Chicken, Skinless Chicken, Chicken Curry Cut, Chicken Breast, Chicken Boneless, Chicken Leg Pieces, Chicken Wings, Chicken Lollipop.
4. **Mutton (`/category/mutton`)**: Mutton Curry Cut, Mutton Boneless, Mutton Chops, Mutton Liver, Mutton Biryani Cut, Mutton Keema.
5. **Fish & Seafood (`/category/fish-seafood`)**: Seer Fish (Vanjaram), Pomfret (Vavval), Sardine (Mathi), Rohu, Catla, Prawns, Fresh Crab (Nandu).
6. **Eggs (`/category/eggs`)**: Country Eggs (*Naatu Kozhi Muttai* with golden yolks), Farm Fresh White Eggs, Egg Trays (30 eggs), Half Dozen (6 eggs), One Dozen (12 eggs).
7. **Product Details (`/product/[slug]`)**: Weight/portion selection (250g, 500g, 1kg or custom pack sizes), net-weight vs gross-weight transparency, storage advice (0-4°C), recipe guidelines, verified customer reviews, and sticky mobile Add-to-Cart bar.
8. **Shopping Cart (`/cart` & Slide-Out Drawer)**: Quantity modification, portion switcher, coupon code validator (`FRESH50`, `KOMBAN10`, `FIRSTBUY`), free-delivery progress tracker, and `localStorage` persistence.
9. **Checkout (`/checkout`)**:
   - Customer details (Name, Phone, Email, Address, Coimbatore locality, Pincode).
   - Fulfillment selector:
     - **Home Delivery**: Delivery zone validation, delivery slots, express 45-60 min dispatch.
     - **Shop Pickup**: 142 Cross Cut Road counter, scheduled pickup times, ₹0 delivery fee.
   - Payment Methods:
     - **Cash on Delivery (COD) / Pay on Pickup**.
     - **Online Payment (Razorpay)**: Server-side cryptographic HMAC SHA256 signature verification.
10. **Live Order Tracking (`/track/[id]`)**: Visual 5-stage timeline (`Placed` → `Confirmed` → `Preparing Cuts` → `Ready / Out for Delivery` → `Delivered`), order breakdown, and 1-click WhatsApp order summary generator.
11. **My Orders (`/orders`)**: Customer order history with live status badges.
12. **My Account (`/account`)**: Customer profile, saved delivery addresses with address book manager, and Supabase authentication integration.
13. **About Us (`/about`)**: Butchery standards, cold-chain assurance, and Coimbatore local story.
14. **Contact Us (`/contact`)**: Store location, direct phone line, WhatsApp business button, and contact form.
15. **FAQs (`/faqs`)**: Interactive accordions addressing freshness, net weight, hygiene, and refund policies.
16. **Privacy Policy (`/privacy`)**: Data security, zero card storage declaration, and customer rights.
17. **Terms and Conditions (`/terms`)**: Service area terms, perishable meat guarantees, and Coimbatore jurisdiction.
18. **Admin Dashboard (`/admin`)**:
    - **Overview (`/admin`)**: Key metrics (Total Sales, Today's Sales, Total Orders, Pending Orders, Completed Orders, Low Stock Alerts), and quick status changer.
    - **Product Management (`/admin/products`)**: Add new meat cut, inline price editing, inline stock updater, availability toggle, and product deletion.
    - **Order Management (`/admin/orders`)**: Search orders, filter by status / payment method / fulfillment, inspect customer address, and update status in real time.
    - **Customer Directory (`/admin/customers`)**: Buyer database, order counts, and total spend tracking.
    - **Sales Reports (`/admin/reports`)**: Daily / weekly / monthly revenue bar charts, top-selling meat cuts, and delivery vs pickup volume.
    - **Business Settings (`/admin/settings`)**: Configure shop address, WhatsApp number, opening hours, delivery charges, free delivery threshold, and promo banners.

---

## 🛠️ Technical Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Icons:** Lucide React
- **Backend:** Next.js Server Actions & Route Handlers (`/api/checkout/razorpay-create`, `/api/checkout/razorpay-verify`, `/api/products`, `/api/orders`)
- **Database:** PostgreSQL (Supabase schema provided at `supabase/schema.sql`)
- **Authentication:** Supabase Auth (with instant local demo fallback)
- **Payment Gateway:** Razorpay
- **WhatsApp Integration:** Floating responsive widget and dynamic order notification formatter

---

## 💻 Local Setup & Development

### 1. Requirements
- Node.js v18+ (Node v22 LTS bundled in `.tools/nodejs` for zero-install execution)
- npm / pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🗄️ Database Setup (Supabase)

A complete PostgreSQL migration script with full Row Level Security (RLS) policies and seed data is provided in `supabase/schema.sql`.

To apply:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. Copy your **Project URL** and **Anon Key** into your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 💳 Razorpay Online Payment Integration

To enable live Razorpay payments:
1. Create a free account at [dashboard.razorpay.com](https://dashboard.razorpay.com).
2. Generate your **API Keys** in Test or Live mode.
3. Add them to `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 📱 WhatsApp Business Integration

The WhatsApp floating widget and order dispatch notifier automatically link to the phone number configured in `Store Settings` (`/admin/settings`). Default: `+91 98422 12345`.
