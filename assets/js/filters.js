/* ============================================
   Élanora Beauty Studio — Filters JS
   Service category filters & Stylist filters
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Service Category Filter ── */
    var serviceTabs = document.querySelectorAll('.eb-filter-btn[data-filter]');
    var serviceItems = document.querySelectorAll('[data-category]');

    if (serviceTabs.length && serviceItems.length) {
      serviceTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var filter = this.getAttribute('data-filter');

          // Active state
          serviceTabs.forEach(function (t) { t.classList.remove('active'); });
          this.classList.add('active');

          // Show/hide items with smooth transition
          serviceItems.forEach(function (item) {
            var cats = (item.getAttribute('data-category') || '').split(',').map(function (s) {
              return s.trim().toLowerCase();
            });

            if (filter === 'all' || cats.includes(filter.toLowerCase())) {
              item.style.display = '';
              item.style.opacity = '0';
              item.style.transform = 'translateY(12px)';
              item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              // Force repaint
              item.offsetHeight; // eslint-disable-line no-unused-expressions
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    /* ── Stylist Specialty Filter ── */
    var stylistTabs  = document.querySelectorAll('.eb-filter-btn[data-stylist-filter]');
    var stylistCards = document.querySelectorAll('[data-specialty]');

    if (stylistTabs.length && stylistCards.length) {
      stylistTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var filter = this.getAttribute('data-stylist-filter');

          stylistTabs.forEach(function (t) { t.classList.remove('active'); });
          this.classList.add('active');

          stylistCards.forEach(function (card) {
            var specialties = (card.getAttribute('data-specialty') || '').split(',').map(function (s) {
              return s.trim().toLowerCase();
            });

            if (filter === 'all' || specialties.includes(filter.toLowerCase())) {
              card.style.display = '';
              card.style.opacity = '0';
              card.style.transition = 'opacity 0.3s ease';
              card.offsetHeight; // eslint-disable-line no-unused-expressions
              card.style.opacity = '1';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

  });

})();
