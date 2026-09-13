/* ============================================
   GlucoPril — Main JavaScript
   Version: 3.0 | 2026
   - Affiliate links managed 100% in JS (no URLs in HTML)
   - FAQ accordion, smooth scroll, mobile nav
   - Scroll reveal + evidence-bar animation
   - Back-to-top, footer year, social-proof popup
============================================ */

document.addEventListener('DOMContentLoaded', function () {

 /* =====================================================
   1) AFFILIATE LINK MANAGER (URLs live ONLY in this file)
   ===================================================== */
var affiliateLinks = {
  'main':     'https://hop.clickbank.net/?affiliate=shyreya786&vendor=glucotonic&pid=pre1&tid=gpril',
  '1-bottle': 'https://hop.clickbank.net/?affiliate=shyreya786&vendor=glucotonic&pid=pre1&tid=gpril_1bot',
  '3-bottle': 'https://hop.clickbank.net/?affiliate=shyreya786&vendor=glucotonic&pid=pre1&tid=gpril_3bot',
  '6-bottle': 'https://hop.clickbank.net/?affiliate=shyreya786&vendor=glucotonic&pid=pre1&tid=gpril_6bot'
};

/* Catch: .order-btn (any tag), or any <a href="#"> that looks like a CTA button */
var orderButtons = document.querySelectorAll(
  '.order-btn, a[data-tier], button[data-tier], a[href="#"].btn, a[href="#"].nav-cta'
);

console.log('[Order buttons wired: ' + orderButtons.length + ']'); // debug line

orderButtons.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();               // stops the "reload index.html" behaviour
    e.stopPropagation();
    var tier = this.getAttribute('data-tier') || 'main';
    var url  = affiliateLinks[tier] || affiliateLinks['main'];
    if (url) window.open(url, '_blank', 'noopener');
  });
});

  /* =====================================================
     2) FAQ ACCORDION
     ===================================================== */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      document.querySelectorAll('.faq-item').forEach(function (i) {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  /* =====================================================
     3) SMOOTH SCROLL (order buttons are skipped automatically
        because their href is "#")
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  /* =====================================================
     4) NAV SCROLL EFFECT
     ===================================================== */
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  /* =====================================================
     5) MOBILE NAV TOGGLE
     ===================================================== */
  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  /* =====================================================
     6) SCROLL REVEAL ANIMATION
     ===================================================== */
  var reveals = document.querySelectorAll('.mech-card, .ing-card, .review-card, .price-card, .how-summary, .guarantee-box, .evidence-bar');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* =====================================================
     7) EVIDENCE BAR ANIMATION
     ===================================================== */
  var evidenceBar = document.querySelector('.evidence-bar');
  if (evidenceBar && 'IntersectionObserver' in window) {
    var evObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fills = evidenceBar.querySelectorAll('.ev-fill');
          fills.forEach(function (fill, i) {
            var pct = fill.getAttribute('data-pct');
            fill.style.setProperty('--pct', pct);
            setTimeout(function () { fill.classList.add('on'); }, 150 * i);
          });
          evObserver.unobserve(evidenceBar);
        }
      });
    }, { threshold: 0.3 });
    evObserver.observe(evidenceBar);
  }

  /* =====================================================
     8) BACK TO TOP BUTTON
     ===================================================== */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     9) CURRENT YEAR IN FOOTER
     ===================================================== */
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================================================
     10) PURCHASE POPUP (social proof)
     ===================================================== */
  var names = [
    'James', 'Andrew B.', 'Harper Lewis', 'Robert L.', 'Michael R.',
    'William Harris', 'Daniel Carter', 'Brian', 'Mark Brooks',
    'Devid Johnson', 'Jacob Reed', 'Sarah M.', 'Jennifer P.'
  ];

  var cities = [
    'Austin, TX', 'Miami, FL', 'Seattle, WA', 'Denver, CO', 'Phoenix, AZ',
    'Chicago, IL', 'New York, NY', 'Los Angeles, CA', 'Atlanta, GA',
    'Nashville, TN', 'Portland, OR', 'Dallas, TX', 'Boston, MA', 'San Diego, CA'
  ];

  function showPurchasePopup() {
    var popup = document.getElementById('purchasePopup');
    var nameEl = document.getElementById('popupName');
    var loc = document.getElementById('popupLocation');
    if (!popup || !nameEl || !loc) return;
    nameEl.textContent = names[Math.floor(Math.random() * names.length)];
    loc.textContent = cities[Math.floor(Math.random() * cities.length)];
    popup.classList.add('show');
    setTimeout(function () {
      popup.classList.remove('show');
    }, 5000);
  }

  setTimeout(showPurchasePopup, 4000 + Math.random() * 1000);
  setInterval(showPurchasePopup, 30000 + Math.random() * 15000);
});