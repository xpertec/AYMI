// ═══════════════ PRODUCTOS ═══════════════
const PRODUCTS = [
  {id:1,name:"Aretes Gota Dorada",category:"aretes",material:"Acero Quirúrgico",price:12,oldPrice:18,img:"img/aretes_dorados.png",badge:"oferta",isOferta:true},
  {id:2,name:"Collar Corazón Brillante",category:"collares",material:"Xuping",price:15,oldPrice:22,img:"img/collar_corazon.png",badge:"oferta",isOferta:true},
  {id:3,name:"Pulsera Rose Gold",category:"pulseras",material:"Acero Quirúrgico",price:10,oldPrice:16,img:"img/pulsera_rosegold.png",badge:"oferta",isOferta:true},
  {id:4,name:"Set Perlas Elegante",category:"sets",material:"Fantasía Fina",price:25,oldPrice:38,img:"img/set_perlas.png",badge:"oferta",isOferta:true},
  {id:5,name:"Collar Cadena Layered",category:"collares",material:"Xuping",price:14,oldPrice:20,img:"img/collar_cadena.png",badge:"oferta",isOferta:true},
  {id:6,name:"Aretes Perla Clásicos",category:"aretes",material:"Acero Quirúrgico",price:7,img:"img/aretes_dorados.png",badge:"new"},
  {id:7,name:"Collar Dije Luna",category:"collares",material:"Xuping",price:18,img:"img/collar_corazon.png",badge:"new"},
  {id:8,name:"Pulsera Cadena Fina",category:"pulseras",material:"Acero Quirúrgico",price:9,img:"img/pulsera_rosegold.png"},
  {id:9,name:"Set Mariposa Completo",category:"sets",material:"Fantasía Fina",price:22,img:"img/set_perlas.png"},
  {id:10,name:"Aretes Argolla Mini",category:"aretes",material:"Acero Quirúrgico",price:8,img:"img/aretes_dorados.png"},
  {id:11,name:"Collar Infinito",category:"collares",material:"Xuping",price:16,img:"img/collar_cadena.png"},
  {id:12,name:"Pulsera Charm Corazón",category:"pulseras",material:"Fantasía Fina",price:11,img:"img/pulsera_rosegold.png"},
  {id:13,name:"Set Corona Dorada",category:"sets",material:"Xuping",price:30,img:"img/set_perlas.png",badge:"new"},
  {id:14,name:"Aretes Estrella",category:"aretes",material:"Acero Quirúrgico",price:6,img:"img/aretes_dorados.png"},
  {id:15,name:"Anillo Solitario Cristal",category:"anillos",material:"Acero Quirúrgico",price:12,img:"img/collar_corazon.png",badge:"new"},
  {id:16,name:"Anillo Doble Banda",category:"anillos",material:"Xuping",price:10,img:"img/pulsera_rosegold.png"},
  {id:17,name:"Collar Choker Dorado",category:"collares",material:"Fantasía Fina",price:8,img:"img/collar_cadena.png"},
  {id:18,name:"Aretes Flor Cristal",category:"aretes",material:"Xuping",price:9,img:"img/aretes_dorados.png"},
  {id:19,name:"Pulsera Tobillera",category:"pulseras",material:"Acero Quirúrgico",price:7,img:"img/pulsera_rosegold.png"},
  {id:20,name:"Set Día de la Madre",category:"sets",material:"Acero Quirúrgico",price:3,oldPrice:15,img:"img/set_perlas.png",badge:"oferta",isOferta:true},
];

let cart = [];
let currentFilter = 'todos';

// ═══════════════ INIT ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  renderOfertasGrid();
  renderCatalogoGrid(PRODUCTS);
  initCountdown();
  initScrollAnimations();
  initNavbar();
  initCart();
  initContactForm();
  createParticles();
});

// ═══════════════ RENDER OFERTAS ═══════════════
function renderOfertasGrid() {
  const grid = document.getElementById('ofertasGrid');
  const ofertas = PRODUCTS.filter(p => p.isOferta);
  grid.innerHTML = ofertas.map(p => createProductCard(p, true)).join('');
}

// ═══════════════ RENDER CATÁLOGO ═══════════════
function renderCatalogoGrid(products) {
  const grid = document.getElementById('catalogoGrid');
  const filtered = currentFilter === 'todos' ? products : products.filter(p => p.category === currentFilter);
  
  // Search filter
  const search = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const final = search ? filtered.filter(p => 
    p.name.toLowerCase().includes(search) || 
    p.category.toLowerCase().includes(search) || 
    p.material.toLowerCase().includes(search)
  ) : filtered;

  grid.innerHTML = final.length ? final.map(p => createProductCard(p)).join('') : 
    '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#888"><p style="font-size:1.2rem">No se encontraron productos</p><p style="font-size:.9rem;margin-top:8px">Intenta con otra búsqueda o categoría</p></div>';
  
  // Re-trigger animations
  setTimeout(() => {
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity .4s, transform .4s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  }, 10);
}

// ═══════════════ PRODUCT CARD HTML ═══════════════
function createProductCard(p, isOferta = false) {
  let badgeHtml = '';
  if (p.badge === 'oferta') badgeHtml = '<span class="product-card__badge product-card__badge--oferta">🔥 Oferta</span>';
  else if (p.badge === 'new') badgeHtml = '<span class="product-card__badge product-card__badge--new">✨ Nuevo</span>';

  const oldPriceHtml = p.oldPrice ? `<span class="product-card__price--old">S/ ${p.oldPrice.toFixed(2)}</span>` : '';
  
  return `<div class="product-card" data-id="${p.id}">
    ${badgeHtml}
    <div class="product-card__img-wrap">
      <img src="${p.img}" alt="${p.name}" class="product-card__img" loading="lazy"/>
      <div class="product-card__overlay">
        <button class="product-card__quick-add" onclick="addToCart(${p.id})">+ Agregar al carrito</button>
      </div>
    </div>
    <div class="product-card__info">
      <div class="product-card__category">${p.category}</div>
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__material">${p.material}</div>
      <div class="product-card__prices">
        <span class="product-card__price">S/ ${p.price.toFixed(2)}</span>
        ${oldPriceHtml}
      </div>
    </div>
    <button class="product-card__add-btn" onclick="addToCart(${p.id})" id="addBtn${p.id}">
      🛒 Agregar al carrito
    </button>
  </div>`;
}

// ═══════════════ CART ═══════════════
function initCart() {
  // Filters
  document.querySelectorAll('.catalogo__filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.catalogo__filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      renderCatalogoGrid(PRODUCTS);
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => renderCatalogoGrid(PRODUCTS), 300);
    });
  }

  // Cart toggle (mobile)
  document.getElementById('cartToggleBtn').addEventListener('click', toggleCart);
  document.getElementById('cartCloseBtn').addEventListener('click', toggleCart);

  // Delivery options
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', updateCartTotals);
  });

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  sidebar.classList.toggle('open');
  
  // Overlay
  let overlay = document.querySelector('.cart-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.addEventListener('click', toggleCart);
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} agregado al carrito`);
  
  // Button animation
  const btn = document.getElementById(`addBtn${id}`);
  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓ Agregado';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '🛒 Agregar al carrito';
    }, 1500);
  }

  // On mobile, briefly show cart
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar.classList.contains('open')) {
      // Just update count, don't open
    }
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartCount = document.getElementById('cartCount');
  
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalItems;
  
  // Animate count
  cartCount.style.transform = 'scale(1.4)';
  setTimeout(() => cartCount.style.transition = 'transform .3s', 0);
  setTimeout(() => cartCount.style.transform = 'scale(1)', 300);

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="cart__empty" id="cartEmpty">
      <svg viewBox="0 0 80 80" class="cart__empty-icon">
        <circle cx="40" cy="40" r="35" fill="none" stroke="#E8A0BF" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="40" y="45" text-anchor="middle" font-size="28">🛒</text>
      </svg>
      <p>Tu carrito está vacío</p>
      <span>¡Agrega algo bonito!</span>
    </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item__img"/>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">S/ ${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item__controls">
          <button class="cart-item__qty-btn" onclick="updateQty(${item.id},-1)">−</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="cart-item__qty-btn" onclick="updateQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const isDelivery = document.querySelector('input[name="delivery"]:checked')?.value === 'delivery';
  const deliveryCost = isDelivery ? 5 : 0;
  const total = subtotal + deliveryCost;

  document.getElementById('cartSubtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `S/ ${total.toFixed(2)}`;
  document.getElementById('deliveryRow').style.display = isDelivery ? 'flex' : 'none';
}

// ═══════════════ CHECKOUT WHATSAPP ═══════════════
function checkout() {
  if (cart.length === 0) return;
  
  const delivery = document.querySelector('input[name="delivery"]:checked')?.value;
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryCost = delivery === 'delivery' ? 5 : 0;
  const total = subtotal + deliveryCost;
  
  const paymentNames = { efectivo: 'Efectivo', yape: 'Yape', plin: 'Plin' };
  const deliveryNames = { retiro: 'Retiro en tienda', delivery: 'Delivery Lima' };
  
  let msg = `🛍️ *PEDIDO AYMI JOYERÍA*\n\n`;
  cart.forEach(item => {
    msg += `• ${item.name} x${item.qty} — S/ ${(item.price * item.qty).toFixed(2)}\n`;
  });
  msg += `\n📦 Entrega: ${deliveryNames[delivery] || 'Retiro'}`;
  msg += `\n💳 Pago: ${paymentNames[payment] || 'Efectivo'}`;
  if (deliveryCost > 0) msg += `\n🚚 Delivery: S/ ${deliveryCost.toFixed(2)}`;
  msg += `\n\n💰 *TOTAL: S/ ${total.toFixed(2)}*`;
  msg += `\n\n¡Gracias por elegir AYMI! 💝`;

  const url = `https://wa.me/51933669674?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ═══════════════ COUNTDOWN ═══════════════
function initCountdown() {
  // Mother's Day 2026 - second Sunday of May = May 10, 2026
  const target = new Date('2026-05-10T23:59:59-05:00');
  
  function update() {
    const now = new Date();
    const diff = Math.max(0, target - now);
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    document.getElementById('countDays').textContent = String(d).padStart(2, '0');
    document.getElementById('countHours').textContent = String(h).padStart(2, '0');
    document.getElementById('countMins').textContent = String(m).padStart(2, '0');
    document.getElementById('countSecs').textContent = String(s).padStart(2, '0');
  }
  
  update();
  setInterval(update, 1000);
}

// ═══════════════ NAVBAR ═══════════════
function initNavbar() {
  // Scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Smooth scroll & active state
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      document.querySelectorAll('.navbar__link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = ['hero', 'ofertas', 'catalogo', 'contacto'];
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        document.querySelectorAll('.navbar__link').forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar__link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });
}

// ═══════════════ SCROLL ANIMATIONS ═══════════════
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ═══════════════ CONTACT FORM ═══════════════
function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const msg = document.getElementById('contactMsg').value;
    
    const text = `Hola AYMI! 👋\n\nSoy *${name}*\n📱 ${phone}\n\n${msg}`;
    window.open(`https://wa.me/51933669674?text=${encodeURIComponent(text)}`, '_blank');
  });
}

// ═══════════════ TOAST ═══════════════
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ═══════════════ PARTICLES ═══════════════
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const symbols = ['✦', '♦', '◇', '⬥', '❋', '✧'];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `position:absolute;font-size:${8 + Math.random() * 14}px;color:rgba(212,165,116,${0.1 + Math.random() * 0.15});left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:float ${5 + Math.random() * 10}s ease-in-out infinite;animation-delay:${Math.random() * 5}s;pointer-events:none`;
    container.appendChild(p);
  }
  // Add float animation
  if (!document.getElementById('floatStyle')) {
    const style = document.createElement('style');
    style.id = 'floatStyle';
    style.textContent = '@keyframes float{0%,100%{transform:translateY(0) rotate(0deg);opacity:.3}50%{transform:translateY(-20px) rotate(180deg);opacity:.6}}';
    document.head.appendChild(style);
  }
}

// ═══════════════ FOOTER FILTER ═══════════════
function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.catalogo__filter').forEach(b => {
    b.classList.toggle('active', b.dataset.category === cat);
  });
  renderCatalogoGrid(PRODUCTS);
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}
