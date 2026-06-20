/* ============================================================
   GameVerse — script.js
   Loader · Navbar · Particles · Games · Cart ·
   Trending · Reviews · Counters · Forms · Theme · Utils
   ============================================================ */

'use strict';

/* ── DATA ─────────────────────────────────────────────────────── */

const GAMES = [
  {
    id: 1, title: 'Nebula Strike', genre: 'action',
    rating: 4.8, price: 59.99,
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    badge: 'New'
  },
  {
    id: 2, title: 'Dragon Realm: Origins', genre: 'rpg',
    rating: 4.9, price: 49.99,
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    badge: 'Best Seller'
  },
  {
    id: 3, title: 'Apex Circuit', genre: 'racing',
    rating: 4.6, price: 39.99,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    badge: 'Hot'
  },
  {
    id: 4, title: 'Shadow Odyssey', genre: 'adventure',
    rating: 4.7, price: 44.99,
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    badge: null
  },
  {
    id: 5, title: 'Goal Masters 25', genre: 'sports',
    rating: 4.5, price: 34.99,
    img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    badge: 'Sale'
  },
  {
    id: 6, title: 'Cyber Phantom', genre: 'action',
    rating: 4.8, price: 54.99,
    img: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&q=80',
    badge: 'New'
  },
  {
    id: 7, title: 'Elysian Chronicles', genre: 'rpg',
    rating: 4.9, price: 59.99,
    img: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=600&q=80',
    badge: null
  },
  {
    id: 8, title: 'Turbo Velocity', genre: 'racing',
    rating: 4.4, price: 29.99,
    img: 'https://images.unsplash.com/photo-1503204077-1d8f3f7b2afa?w=600&q=80',
    badge: null
  },
  {
    id: 9, title: 'Lost Frontier', genre: 'adventure',
    rating: 4.6, price: 42.99,
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    badge: null
  },
  {
    id: 10, title: 'Basketball Pro 2025', genre: 'sports',
    rating: 4.3, price: 24.99,
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    badge: 'Sale'
  },
  {
    id: 11, title: 'Iron Arsenal', genre: 'action',
    rating: 4.7, price: 47.99,
    img: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=600&q=80',
    badge: null
  },
  {
    id: 12, title: 'Mythic Quest: Rebirth', genre: 'rpg',
    rating: 5.0, price: 69.99,
    img: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80',
    badge: 'Editor\'s Pick'
  }
];

const TRENDING = [
  {
    title: 'Nebula Strike', tag: '#1 This Week', price: '$59.99',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80'
  },
  {
    title: 'Elysian Chronicles', tag: 'RPG of the Year', price: '$59.99',
    img: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&q=80'
  },
  {
    title: 'Cyber Phantom', tag: 'Community Favourite', price: '$54.99',
    img: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=1200&q=80'
  }
];

const REVIEWS = [
  {
    name: 'Alex M.', initials: 'AM', game: 'Nebula Strike',
    stars: 5, text: 'Absolutely mind-blowing graphics and gameplay. GameVerse had it delivered to my library in seconds — price was unbeatable.'
  },
  {
    name: 'Sofia R.', initials: 'SR', game: 'Dragon Realm: Origins',
    stars: 5, text: 'Best RPG I\'ve played in years. GameVerse\'s curated picks always land exactly what I\'m looking for. 10/10 service.'
  },
  {
    name: 'James K.', initials: 'JK', game: 'Apex Circuit',
    stars: 4, text: 'Silky smooth racing experience. Bought it on a whim during a sale and it\'s now my go-to weekend game. Great store.'
  },
  {
    name: 'Priya N.', initials: 'PN', game: 'Shadow Odyssey',
    stars: 5, text: 'The story is phenomenal. Found it through GameVerse\'s recommendation engine — it knew my taste better than I did.'
  },
  {
    name: 'Carlos D.', initials: 'CD', game: 'Iron Arsenal',
    stars: 4, text: 'Tons of replayability. GameVerse\'s instant key delivery made this an impulse buy I don\'t regret at all.'
  },
  {
    name: 'Yuki T.', initials: 'YT', game: 'Mythic Quest: Rebirth',
    stars: 5, text: 'A masterpiece. GameVerse had the best price I could find anywhere online, shipped instantly. Will shop here forever.'
  }
];

/* ── STATE ─────────────────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('gv_cart') || '[]');
let currentGenre = 'all';
let searchQuery  = '';
let trendIdx     = 0;
let reviewIdx    = 0;
let trendTimer   = null;
let countersDone = false;

/* ── UTILITIES ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const stars = (n) => '★'.repeat(Math.floor(n)) + (n % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(n));

function saveCart() { localStorage.setItem('gv_cart', JSON.stringify(cart)); }

/* ── LOADER ─────────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  setTimeout(() => loader.classList.add('done'), 2000);
}

/* ── PARTICLES ──────────────────────────────────────────────── */
function initParticles() {
  const container = $('#particles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 20 : 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    const size = Math.random() * 3 + 1;
    const colors = ['#8b5cf6','#06b6d4','#3b82f6'];
    p.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:${colors[Math.floor(Math.random()*3)]};
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      opacity:${Math.random()*.6+.2};
      animation: floatP ${Math.random()*8+6}s ease-in-out ${Math.random()*5}s infinite alternate;
    `;
    container.appendChild(p);
  }

  // Keyframe for particles
  if (!document.getElementById('particle-style')) {
    const s = document.createElement('style');
    s.id = 'particle-style';
    s.textContent = `
      @keyframes floatP {
        from { transform: translateY(0) scale(1); }
        to   { transform: translateY(-30px) scale(1.2); }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar   = $('#navbar');
  const hamburger= $('#hamburger');
  const navLinks = $('#navLinks');
  const links    = $$('.nav-link');

  // Scroll → sticky style
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
    toggleBackTop();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    navLinks.classList.toggle('mobile-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }
  });
}

function updateActiveLink() {
  const sections = $$('section[id], header[id]');
  const links = $$('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  links.forEach(l => {
    const href = l.getAttribute('href').slice(1);
    l.classList.toggle('active', href === current);
  });
}

/* ── THEME TOGGLE ────────────────────────────────────────────── */
function initTheme() {
  const btn   = $('#themeToggle');
  const moon  = btn.querySelector('.icon-moon');
  const sun   = btn.querySelector('.icon-sun');
  const saved = localStorage.getItem('gv_theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('gv_theme', next);
  });

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    moon.style.display = t === 'dark' ? 'block' : 'none';
    sun.style.display  = t === 'light' ? 'block' : 'none';
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/* ── GAMES ───────────────────────────────────────────────────── */
function renderGames(list) {
  const grid = $('#gamesGrid');
  const none = $('#noResults');
  grid.innerHTML = '';

  if (!list.length) {
    none.style.display = 'block';
    return;
  }
  none.style.display = 'none';

  list.forEach(game => {
    const inCart = cart.some(c => c.id === game.id);
    const card = document.createElement('article');
    card.className = 'game-card reveal';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="game-thumb">
        <img src="${game.img}" alt="${game.title} cover art" loading="lazy" width="600" height="375" />
        ${game.badge ? `<span class="game-badge">${game.badge}</span>` : ''}
      </div>
      <div class="game-info">
        <div class="game-meta">
          <span class="game-genre">${game.genre}</span>
          <span class="game-rating" aria-label="Rating: ${game.rating} out of 5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${game.rating}
          </span>
        </div>
        <h3 class="game-title">${game.title}</h3>
        <div class="game-footer">
          <span class="game-price">$${game.price.toFixed(2)}</span>
          <button class="btn-cart ${inCart ? 'added' : ''}"
            data-id="${game.id}"
            aria-label="${inCart ? 'Added to cart' : 'Add ' + game.title + ' to cart'}">
            ${inCart
              ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Added'
              : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add to Cart'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Cart button handler
    card.querySelector('.btn-cart').addEventListener('click', (e) => {
      addToCart(game, e.currentTarget);
    });
  });

  // Trigger reveal for freshly added cards
  setTimeout(observeReveal, 100);
}

function filteredGames() {
  return GAMES.filter(g => {
    const matchGenre = currentGenre === 'all' || g.genre === currentGenre;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchSearch;
  });
}

function initSearch() {
  const input  = $('#searchInput');
  const clear  = $('#searchClear');
  const chips  = $$('.chip');

  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    clear.style.display = searchQuery ? 'flex' : 'none';
    renderGames(filteredGames());
  });

  clear.addEventListener('click', () => {
    input.value = '';
    searchQuery  = '';
    clear.style.display = 'none';
    input.focus();
    renderGames(filteredGames());
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentGenre = chip.dataset.genre;
      renderGames(filteredGames());
    });
  });
}

/* ── CART ─────────────────────────────────────────────────────── */
function addToCart(game, btn) {
  const exists = cart.findIndex(c => c.id === game.id);
  if (exists > -1) {
    // Already in cart — remove (toggle)
    cart.splice(exists, 1);
    btn.classList.remove('added');
    btn.setAttribute('aria-label', 'Add ' + game.title + ' to cart');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add to Cart`;
  } else {
    cart.push({ id: game.id, title: game.title, price: game.price, img: game.img });
    btn.classList.add('added');
    btn.setAttribute('aria-label', 'Added to cart');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Added`;
    // Animate count
    const countEl = $('#cartCount');
    countEl.style.transform = 'scale(1.5)';
    setTimeout(() => countEl.style.transform = '', 200);
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const countEl  = $('#cartCount');
  const itemsEl  = $('#cartItems');
  const footerEl = $('#cartFooter');
  const totalEl  = $('#cartTotal');

  countEl.textContent = cart.length;

  if (!cart.length) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'flex';
  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.title}" loading="lazy" />
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.title} from cart">✕</button>
      </div>`;
  }).join('');
  totalEl.textContent = '$' + total.toFixed(2);

  // Remove handlers
  $$('.cart-item-remove', itemsEl).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      cart = cart.filter(c => c.id !== id);
      saveCart();
      updateCartUI();
      // Un-add the card button in the grid
      const gridBtn = $(`[data-id="${id}"]`, $('#gamesGrid'));
      if (gridBtn) {
        gridBtn.classList.remove('added');
        const game = GAMES.find(g => g.id === id);
        if (game) {
          gridBtn.setAttribute('aria-label', 'Add ' + game.title + ' to cart');
          gridBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add to Cart`;
        }
      }
    });
  });
}

function initCart() {
  const btn     = $('#cartBtn');
  const drawer  = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  const close   = $('#closeCart');

  const openCart = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    close.focus();
  };
  const closeCart = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    btn.focus();
  };

  btn.addEventListener('click', openCart);
  close.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  updateCartUI();
}

/* ── TRENDING SLIDER ─────────────────────────────────────────── */
function renderTrending() {
  const track = $('#trendingTrack');
  const dots  = $('#trendingDots');

  track.innerHTML = TRENDING.map(t => `
    <div class="trending-banner">
      <img src="${t.img}" alt="${t.title} banner" loading="lazy" />
      <div class="trending-info">
        <p class="trending-tag">${t.tag}</p>
        <h3 class="trending-title">${t.title}</h3>
        <p class="trending-price">${t.price}</p>
        <a href="#games" class="btn btn-primary">Shop Now</a>
      </div>
    </div>
  `).join('');

  dots.innerHTML = TRENDING.map((_, i) =>
    `<button class="t-dot${i === 0 ? ' active' : ''}" data-i="${i}" role="tab" aria-label="Slide ${i+1}" aria-selected="${i===0}"></button>`
  ).join('');

  $$('.t-dot', dots).forEach(d => {
    d.addEventListener('click', () => goTrend(parseInt(d.dataset.i)));
  });

  startTrendAuto();
}

function goTrend(idx) {
  trendIdx = idx;
  const track = $('#trendingTrack');
  track.style.transform = `translateX(-${idx * 100}%)`;
  $$('.t-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
    d.setAttribute('aria-selected', i === idx);
  });
  clearInterval(trendTimer);
  startTrendAuto();
}

function startTrendAuto() {
  trendTimer = setInterval(() => {
    goTrend((trendIdx + 1) % TRENDING.length);
  }, 5000);
}

/* ── REVIEWS CAROUSEL ────────────────────────────────────────── */
function renderReviews() {
  const track = $('#reviewsTrack');
  const dots  = $('#reviewsDots');
  const prev  = $('#revPrev');
  const next  = $('#revNext');

  track.innerHTML = REVIEWS.map(r => `
    <div class="review-card" role="listitem">
      <div class="review-stars" aria-label="${r.stars} out of 5 stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="reviewer">
        <div class="reviewer-avatar" aria-hidden="true">${r.initials}</div>
        <div>
          <p class="reviewer-name">${r.name}</p>
          <p class="reviewer-game">${r.game}</p>
        </div>
      </div>
    </div>
  `).join('');

  const perPage = getReviewPerPage();
  const total   = Math.ceil(REVIEWS.length / perPage);

  dots.innerHTML = Array.from({ length: total }, (_, i) =>
    `<button class="t-dot${i===0?' active':''}" data-i="${i}" role="tab" aria-label="Review page ${i+1}" aria-selected="${i===0}"></button>`
  ).join('');

  $$('.t-dot', dots).forEach(d => {
    d.addEventListener('click', () => goReview(parseInt(d.dataset.i)));
  });

  prev.addEventListener('click', () => goReview((reviewIdx - 1 + total) % total));
  next.addEventListener('click', () => goReview((reviewIdx + 1) % total));
  window.addEventListener('resize', () => goReview(0));
}

function getReviewPerPage() {
  if (window.innerWidth < 500) return 1;
  if (window.innerWidth < 1025) return 2;
  return 3;
}

function goReview(idx) {
  reviewIdx = idx;
  const track   = $('#reviewsTrack');
  const perPage = getReviewPerPage();
  const cardW   = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 0;
  track.style.transform = `translateX(-${idx * perPage * cardW}px)`;
  $$('.t-dot', $('#reviewsDots')).forEach((d, i) => {
    d.classList.toggle('active', i === idx);
    d.setAttribute('aria-selected', i === idx);
  });
}

/* ── ANIMATED COUNTERS ───────────────────────────────────────── */
function animateCounters() {
  if (countersDone) return;
  countersDone = true;
  const nums = $$('.stat-num');
  nums.forEach(el => {
    const target  = parseInt(el.dataset.target, 10);
    const dur     = 1800;
    const step    = 16;
    const steps   = dur / step;
    const inc     = target / steps;
    let current   = 0;
    const timer   = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, step);
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────────── */
function observeReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => obs.observe(el));
}

function observeCounters() {
  const section = $('#about');
  if (!section) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(section);
}

/* ── BACK TO TOP ─────────────────────────────────────────────── */
function toggleBackTop() {
  $('#backTop').classList.toggle('show', window.scrollY > 400);
}
function initBackTop() {
  $('#backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── FORMS ───────────────────────────────────────────────────── */
function initNewsletter() {
  const form = $('#newsletterForm');
  const msg  = $('#nlMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    if (!isValidEmail(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className   = 'form-msg error';
      return;
    }
    msg.textContent = '🎮 You\'re in! Welcome to GameVerse.';
    msg.className   = 'form-msg success';
    form.reset();
    setTimeout(() => { msg.textContent = ''; msg.className = 'form-msg'; }, 4000);
  });
}

function initContact() {
  const form    = $('#contactForm');
  const success = $('#contactSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name  = $('#contactName');
    const email = $('#contactEmail');
    const msg   = $('#contactMsg');

    // Name
    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(name, '#nameErr', 'Please enter your name (at least 2 characters).');
      valid = false;
    } else clearError(name, '#nameErr');

    // Email
    if (!isValidEmail(email.value.trim())) {
      showError(email, '#emailErr', 'Please enter a valid email address.');
      valid = false;
    } else clearError(email, '#emailErr');

    // Message
    if (!msg.value.trim() || msg.value.trim().length < 10) {
      showError(msg, '#msgErr', 'Message must be at least 10 characters.');
      valid = false;
    } else clearError(msg, '#msgErr');

    if (!valid) return;

    form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'flex';
    }, 500);
  });

  // Live validation
  ['#contactName','#contactEmail','#contactMsg'].forEach(sel => {
    const el = $(sel);
    el.addEventListener('blur', () => el.dispatchEvent(new Event('validate')));
  });
}

function showError(field, errSel, msg) {
  field.classList.add('invalid');
  $(errSel).textContent = msg;
}
function clearError(field, errSel) {
  field.classList.remove('invalid');
  $(errSel).textContent = '';
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── YEAR ─────────────────────────────────────────────────────── */
function setYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── TOUCH SWIPE (Trending) ──────────────────────────────────── */
function initTouchSwipe(el, onLeft, onRight) {
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? onLeft() : onRight(); }
  }, { passive: true });
}

/* ── INIT ─────────────────────────────────────────────────────── */
function init() {
  initLoader();
  initParticles();
  initNavbar();
  initTheme();
  initSearch();
  renderGames(GAMES);
  renderTrending();
  renderReviews();
  initCart();
  initNewsletter();
  initContact();
  initBackTop();
  setYear();
  observeReveal();
  observeCounters();

  // Swipe on trending
  const tTrack = $('#trendingTrack');
  if (tTrack) {
    initTouchSwipe(
      tTrack,
      () => goTrend((trendIdx + 1) % TRENDING.length),
      () => goTrend((trendIdx - 1 + TRENDING.length) % TRENDING.length)
    );
  }

  // Mark about & newsletter sections for reveal
  $$('.about-copy, .about-stats, .newsletter-inner, .contact-form').forEach(el => {
    el.classList.add('reveal');
  });
  setTimeout(observeReveal, 200);
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
