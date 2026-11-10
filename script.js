/**
 * MGH FARM - LIVESTOCK, FRESH MEATS & EGGS E-COMMERCE LOGIC
 * High-performance store controller & WhatsApp checkout
 * Rasinagar, Kothambadi, Attur, Salem
 */

// -----------------------------------------------------------------------------
// Product Catalog Data
// -----------------------------------------------------------------------------
const PRODUCTS = [
  {
    id: 'naatu-kozhi',
    title: 'Naatu Kozhi (Country Chicken)',
    category: 'country-chicken',
    categoryLabel: 'Free-Range Native Breed',
    badge: 'Popular',
    desc: 'Authentic village country chicken raised on open pasture and natural grains. Dense, protein-rich meat with deep traditional flavor.',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: '500g (Curry Cut)', price: 290, weight: '500g' },
      { name: '1 kg (Curry Cut)', price: 560, weight: '1kg' },
      { name: '1 kg (Biryani Cut)', price: 560, weight: '1kg' }
    ],
    selectedVariant: 1
  },
  {
    id: 'broiler-chicken',
    title: 'Fresh Broiler Chicken (Curry Cut)',
    category: 'broiler',
    categoryLabel: 'Tender Farm Broiler',
    badge: 'Daily Fresh',
    desc: '100% antibiotic-free, tender grain-fed chicken. Cut fresh in morning batches into clean curry pieces with bone.',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: '500g (Curry Cut)', price: 140, weight: '500g' },
      { name: '1 kg (Curry Cut)', price: 260, weight: '1kg' },
      { name: '1 kg (Skinless)', price: 280, weight: '1kg' }
    ],
    selectedVariant: 1
  },
  {
    id: 'boneless-breast',
    title: 'Tender Chicken Breast (Boneless)',
    category: 'broiler',
    categoryLabel: '100% Lean Protein',
    badge: 'Healthy Cut',
    desc: 'Juicy, lean chicken breast fillets with zero bone or fat. Perfect for pan-frying, fitness meals, nuggets, and tikkas.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: '500g (Fillets)', price: 190, weight: '500g' },
      { name: '1 kg (Fillets)', price: 370, weight: '1kg' }
    ],
    selectedVariant: 0
  },
  {
    id: 'goat-mutton-curry',
    title: 'Farm Goat Mutton (Curry Cut)',
    category: 'mutton',
    categoryLabel: 'Pasture-Grazed Goat',
    badge: 'Prime Meat',
    desc: 'Tender bone-in mutton from young, free-grazing Salem goats. Rich texture that absorbs spices for melt-in-the-mouth curries.',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: '500g (Curry Cut)', price: 460, weight: '500g' },
      { name: '1 kg (Curry Cut)', price: 890, weight: '1kg' }
    ],
    selectedVariant: 1
  },
  {
    id: 'mutton-chops',
    title: 'Goat Mutton Chops & Ribs',
    category: 'mutton',
    categoryLabel: 'Special Cut',
    badge: 'Chukka Special',
    desc: 'Hand-trimmed ribs and succulent chops with the perfect meat-to-fat balance. Ideal for traditional Salem Mutton Sukka fry.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: '500g (Chops)', price: 490, weight: '500g' },
      { name: '1 kg (Chops)', price: 950, weight: '1kg' }
    ],
    selectedVariant: 0
  },
  {
    id: 'country-eggs',
    title: 'Naatu Kozhi Muttai (Country Eggs)',
    category: 'eggs',
    categoryLabel: 'Pasture Flock Eggs',
    badge: 'Organic',
    desc: 'Organic brown country eggs collected daily from our free-range hens. Deep golden-orange yolks packed with vitamins and minerals.',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: 'Pack of 6 Eggs', price: 75, weight: '6 pcs' },
      { name: 'Pack of 12 Eggs', price: 145, weight: '12 pcs' },
      { name: 'Tray of 30 Eggs', price: 350, weight: '30 pcs' }
    ],
    selectedVariant: 1
  },
  {
    id: 'white-farm-eggs',
    title: 'Farm Fresh Poultry Eggs',
    category: 'eggs',
    categoryLabel: 'Daily Harvest',
    badge: 'Best Value',
    desc: 'Clean, sanitized farm fresh table eggs collected each morning. High protein, consistent quality for daily breakfast cooking.',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&w=700&q=80',
    variants: [
      { name: 'Pack of 10 Eggs', price: 70, weight: '10 pcs' },
      { name: 'Tray of 30 Eggs', price: 195, weight: '30 pcs' }
    ],
    selectedVariant: 1
  },
  {
    id: 'healthy-chicks',
    title: 'Healthy Flock Starter Chicks',
    category: 'chicks',
    categoryLabel: 'Livestock Poultry',
    badge: 'Vaccinated',
    desc: 'Strong, active day-old chicks from vaccinated parent stock. Excellent survival rate for backyard farm homesteads and poultry starters.',
    image: 'images/chicks.png',
    variants: [
      { name: 'Batch of 10 Chicks', price: 450, weight: '10 chicks' },
      { name: 'Batch of 25 Chicks', price: 1050, weight: '25 chicks' }
    ],
    selectedVariant: 0
  }
];

// -----------------------------------------------------------------------------
// State Management
// -----------------------------------------------------------------------------
let cart = [];
let appliedCoupon = null;
let currentCategory = 'all';
let searchQuery = '';

// Load cart from localStorage if available
try {
  const savedCart = localStorage.getItem('mgh_farm_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn('Could not load cart from storage', e);
}

// -----------------------------------------------------------------------------
// DOM Elements
// -----------------------------------------------------------------------------
const productsContainer = document.getElementById('products-container');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const mobileStickyCart = document.getElementById('mobile-sticky-cart');
const cartCounter = document.getElementById('cart-counter');
const drawerItemCount = document.getElementById('drawer-item-count');
const mscCounter = document.getElementById('msc-counter');
const mscTotal = document.getElementById('msc-total');
const cartItemsContainer = document.getElementById('cart-items-container');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryDelivery = document.getElementById('summary-delivery');
const summaryDiscountRow = document.getElementById('summary-discount-row');
const summaryDiscount = document.getElementById('summary-discount');
const summaryGrandTotal = document.getElementById('summary-grand-total');
const btnSubmitOrder = document.getElementById('btn-submit-order');
const couponCodeInput = document.getElementById('coupon-code-input');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const couponMsg = document.getElementById('coupon-msg');
const storeSearchInput = document.getElementById('store-search-input');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const deliveryHomeRadio = document.getElementById('del-home');
const deliveryPickupRadio = document.getElementById('del-pickup');
const addressField = document.getElementById('address-field');

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// -----------------------------------------------------------------------------
// Product Rendering & Filtering
// -----------------------------------------------------------------------------
function renderProducts() {
  if (!productsContainer) return;

  const filtered = PRODUCTS.filter(p => {
    const matchCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; border: 1px dashed var(--border);">
        <p style="font-size: 2rem; margin: 0 0 10px;">🔍</p>
        <h3 style="margin: 0 0 6px; color: var(--forest-dark);">No items found</h3>
        <p style="color: #666; margin: 0;">Try searching for "chicken", "mutton", "eggs", or clear your category filter.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = filtered.map(product => {
    const currentVariant = product.variants[product.selectedVariant] || product.variants[0];
    const cartItemKey = `${product.id}_${product.selectedVariant}`;
    const inCartItem = cart.find(item => item.key === cartItemKey);
    const cartQty = inCartItem ? inCartItem.qty : 0;

    return `
      <article class="product-card" id="card-${product.id}">
        <div class="product-img-wrap">
          <img class="product-img" src="${product.image}" alt="${product.title}" loading="lazy">
          <div class="product-badge-strip">
            <span class="product-tag tag-fresh">${product.badge}</span>
            <span class="product-tag">${product.categoryLabel}</span>
          </div>
        </div>

        <div class="product-body">
          <span class="product-category-name">${product.category.replace('-', ' ')}</span>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-desc">${product.desc}</p>

          <div class="product-options-row">
            <span class="option-label">Select Portion / Pack:</span>
            <div class="variant-chips" role="radiogroup" aria-label="Portion size">
              ${product.variants.map((v, idx) => `
                <button 
                  type="button" 
                  class="chip ${idx === product.selectedVariant ? 'active' : ''}" 
                  onclick="selectProductVariant('${product.id}', ${idx})"
                  aria-pressed="${idx === product.selectedVariant}"
                >
                  ${v.name}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="product-footer-row">
            <div class="price-display">
              <span class="price-current">₹${currentVariant.price}</span>
              <span class="price-unit">Per ${currentVariant.weight}</span>
            </div>

            <div>
              ${cartQty > 0 ? `
                <div class="qty-stepper">
                  <button class="qty-btn" onclick="changeProductQty('${product.id}', ${product.selectedVariant}, -1)" aria-label="Decrease quantity">-</button>
                  <span class="qty-num">${cartQty}</span>
                  <button class="qty-btn" onclick="changeProductQty('${product.id}', ${product.selectedVariant}, 1)" aria-label="Increase quantity">+</button>
                </div>
              ` : `
                <button class="btn-add-cart" onclick="addProductToCart('${product.id}', ${product.selectedVariant})">
                  <span>+ Add</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// -----------------------------------------------------------------------------
// Product Variant & Cart Actions
// -----------------------------------------------------------------------------
window.selectProductVariant = function(productId, variantIndex) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (prod) {
    prod.selectedVariant = variantIndex;
    renderProducts();
  }
};

window.addProductToCart = function(productId, variantIndex) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const variant = prod.variants[variantIndex];
  const key = `${prod.id}_${variantIndex}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      id: prod.id,
      title: prod.title,
      variantName: variant.name,
      price: variant.price,
      weight: variant.weight,
      image: prod.image,
      qty: 1
    });
  }

  saveCart();
  renderProducts();
  updateCartUI();
  openCartDrawer();
};

window.changeProductQty = function(productId, variantIndex, delta) {
  const key = `${productId}_${variantIndex}`;
  const index = cart.findIndex(item => item.key === key);

  if (index !== -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  } else if (delta > 0) {
    addProductToCart(productId, variantIndex);
    return;
  }

  saveCart();
  renderProducts();
  updateCartUI();
};

window.updateCartItemQty = function(key, delta) {
  const index = cart.findIndex(item => item.key === key);
  if (index !== -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderProducts();
    updateCartUI();
  }
};

function saveCart() {
  try {
    localStorage.setItem('mgh_farm_cart', JSON.stringify(cart));
  } catch (e) {
    console.warn(e);
  }
}

// -----------------------------------------------------------------------------
// Cart Drawer & Checkout UI
// -----------------------------------------------------------------------------
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Update Counters
  if (cartCounter) cartCounter.textContent = totalItems;
  if (drawerItemCount) drawerItemCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
  if (mscCounter) mscCounter.textContent = `${totalItems} items`;
  if (mscTotal) mscTotal.textContent = `₹${subtotal}`;

  // Render items in cart
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🧺</div>
        <h4>Your basket is empty</h4>
        <p>Explore our fresh country chicken, tender mutton cuts, and farm eggs.</p>
        <button class="btn-primary" style="margin: 0 auto; display: inline-flex;" onclick="closeCartDrawer(); window.location.href='#store';">
          <span>Explore Farm Store</span>
          <span class="btn-arrow">&#8595;</span>
        </button>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <img class="cir-img" src="${item.image}" alt="${item.title}">
        <div class="cir-info">
          <h4 class="cir-title">${item.title}</h4>
          <div class="cir-variant">${item.variantName}</div>
          <div class="cir-price">₹${item.price * item.qty} <span style="font-size: 0.7rem; color: #888; font-weight: normal;">(₹${item.price} each)</span></div>
        </div>
        <div class="cir-stepper">
          <button class="cir-btn" onclick="updateCartItemQty('${item.key}', -1)" aria-label="Decrease">&minus;</button>
          <span class="cir-qty">${item.qty}</span>
          <button class="cir-btn" onclick="updateCartItemQty('${item.key}', 1)" aria-label="Increase">+</button>
        </div>
      </div>
    `).join('');
  }

  // Calculate Delivery Fee
  const isPickup = deliveryPickupRadio && deliveryPickupRadio.checked;
  let deliveryFee = 0;
  if (!isPickup && cart.length > 0) {
    deliveryFee = subtotal >= 499 ? 0 : 40;
  }

  // Calculate Discount
  let discount = 0;
  if (appliedCoupon === 'FARM10') {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedCoupon === 'WELCOME50') {
    discount = subtotal >= 300 ? 50 : 0;
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  // Update Summary Rows
  if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal}`;
  if (summaryDelivery) {
    if (isPickup) {
      summaryDelivery.textContent = 'FREE (Farm Pickup)';
    } else if (subtotal >= 499 && subtotal > 0) {
      summaryDelivery.innerHTML = '<span style="color: #18864b; font-weight: 700;">FREE (Orders > ₹499)</span>';
    } else if (cart.length === 0) {
      summaryDelivery.textContent = '₹0';
    } else {
      summaryDelivery.textContent = '₹40 (Attur/Salem)';
    }
  }

  if (summaryDiscountRow && summaryDiscount) {
    if (discount > 0) {
      summaryDiscountRow.style.display = 'flex';
      summaryDiscount.textContent = `-₹${discount}`;
    } else {
      summaryDiscountRow.style.display = 'none';
    }
  }

  if (summaryGrandTotal) summaryGrandTotal.textContent = `₹${grandTotal}`;
}

// Open/Close Cart
function openCartDrawer() {
  if (cartDrawer) cartDrawer.classList.add('is-open');
  if (cartBackdrop) cartBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  if (cartDrawer) cartDrawer.classList.remove('is-open');
  if (cartBackdrop) cartBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

// -----------------------------------------------------------------------------
// WhatsApp Order Placement
// -----------------------------------------------------------------------------
function handleWhatsAppOrderSubmit() {
  if (cart.length === 0) {
    alert('Your cart is empty! Please add some fresh meats or eggs first.');
    return;
  }

  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const addressInput = document.getElementById('cust-address');
  const instructionsInput = document.getElementById('cust-instructions');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const instructions = instructionsInput ? instructionsInput.value.trim() : '';
  const isPickup = deliveryPickupRadio && deliveryPickupRadio.checked;

  if (!name) {
    alert('Please enter your full name.');
    nameInput.focus();
    return;
  }

  if (!phone || phone.replace(/\D/g, '').length < 10) {
    alert('Please enter a valid 10-digit WhatsApp/phone number.');
    phoneInput.focus();
    return;
  }

  if (!isPickup && !address) {
    alert('Please enter your delivery address in Attur / Salem.');
    addressInput.focus();
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let deliveryFee = isPickup ? 0 : (subtotal >= 499 ? 0 : 40);
  let discount = 0;
  if (appliedCoupon === 'FARM10') discount = Math.round(subtotal * 0.10);
  else if (appliedCoupon === 'WELCOME50' && subtotal >= 300) discount = 50;

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);
  const orderId = 'MGH-' + Math.floor(100000 + Math.random() * 900000);

  // Build formatted WhatsApp message
  let msg = `🌾 *NEW FRESH ORDER - MGH FARM*\n`;
  msg += `*Order ID:* ${orderId}\n`;
  msg += `--------------------------------\n`;
  msg += `👤 *Customer:* ${name}\n`;
  msg += `📱 *Phone:* ${phone}\n`;
  msg += `🚚 *Fulfillment:* ${isPickup ? '🚜 Farm Gate Pickup (Rasinagar)' : '🚚 Home Delivery'}\n`;
  if (!isPickup) {
    msg += `📍 *Delivery Address:* ${address}\n`;
  }
  if (instructions) {
    msg += `🔪 *Cutting Note:* ${instructions}\n`;
  }
  msg += `--------------------------------\n`;
  msg += `*ITEMS ORDERED:*\n`;

  cart.forEach((item, index) => {
    msg += `${index + 1}. *${item.title}*\n`;
    msg += `   └ ${item.variantName} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  msg += `--------------------------------\n`;
  msg += `Subtotal: ₹${subtotal}\n`;
  if (deliveryFee > 0) {
    msg += `Packaging & Delivery: ₹${deliveryFee}\n`;
  } else if (!isPickup) {
    msg += `Packaging & Delivery: FREE\n`;
  }
  if (discount > 0) {
    msg += `Coupon Discount (${appliedCoupon}): -₹${discount}\n`;
  }
  msg += `*GRAND TOTAL: ₹${grandTotal}*\n`;
  msg += `--------------------------------\n`;
  msg += `_Please confirm my fresh morning butchered order. Thank you!_`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/918489542722?text=${encodedMsg}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');

  // Clear cart and show notification
  cart = [];
  saveCart();
  renderProducts();
  updateCartUI();
  closeCartDrawer();

  alert(`Thank you ${name}! Your order ${orderId} has been prepared. We are redirecting you to WhatsApp (+91 8489542722) for instant confirmation.`);
}

// -----------------------------------------------------------------------------
// Coupon Handler
// -----------------------------------------------------------------------------
function handleApplyCoupon() {
  if (!couponCodeInput || !couponMsg) return;

  const code = couponCodeInput.value.trim().toUpperCase();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (!code) {
    couponMsg.textContent = 'Please enter a coupon code.';
    couponMsg.className = 'coupon-msg error';
    return;
  }

  if (code === 'FARM10') {
    appliedCoupon = 'FARM10';
    couponMsg.textContent = '🎉 FARM10 applied! 10% discount added.';
    couponMsg.className = 'coupon-msg success';
  } else if (code === 'WELCOME50') {
    if (subtotal < 300) {
      couponMsg.textContent = 'Coupon WELCOME50 is valid on orders above ₹300.';
      couponMsg.className = 'coupon-msg error';
      return;
    }
    appliedCoupon = 'WELCOME50';
    couponMsg.textContent = '🎉 WELCOME50 applied! ₹50 off.';
    couponMsg.className = 'coupon-msg success';
  } else {
    couponMsg.textContent = 'Invalid coupon code. Try FARM10 for 10% off.';
    couponMsg.className = 'coupon-msg error';
  }

  updateCartUI();
}

// -----------------------------------------------------------------------------
// Event Listeners Setup
// -----------------------------------------------------------------------------
function setupEventListeners() {
  // Cart drawer triggers
  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);
  if (mobileStickyCart) mobileStickyCart.addEventListener('click', openCartDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('is-open')) {
      closeCartDrawer();
    }
  });

  // Mobile navigation hamburger toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = menuToggle.querySelector('.menu-icon');
      if (icon) icon.textContent = isOpen ? '\u2212' : '+';
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('.menu-icon');
        if (icon) icon.textContent = '+';
      });
    });
  }

  // Delivery radio toggle (toggle address visibility)
  if (deliveryHomeRadio && deliveryPickupRadio && addressField) {
    deliveryHomeRadio.addEventListener('change', () => {
      addressField.style.display = 'block';
      updateCartUI();
    });
    deliveryPickupRadio.addEventListener('change', () => {
      addressField.style.display = 'none';
      updateCartUI();
    });
  }

  // Order submission button
  if (btnSubmitOrder) {
    btnSubmitOrder.addEventListener('click', handleWhatsAppOrderSubmit);
  }

  // Coupon application
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', handleApplyCoupon);
  }
  if (couponCodeInput) {
    couponCodeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApplyCoupon();
      }
    });
  }

  // Category filter tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = tab.getAttribute('data-category');
      renderProducts();
    });
  });

  // Live product search
  if (storeSearchInput) {
    storeSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }
}
