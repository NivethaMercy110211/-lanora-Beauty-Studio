/* ============================================
   Élanora Beauty Studio — Header Active Nav
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Page → nav link mapping
    var pageMap = {
      'index.html':           'home1',
      '':                     'home1',
      'home2.html':           'home2',
      'about.html':           'about',
      'services.html':        'services',
      'stylists.html':        'stylists',
      'pricing.html':         'pricing',
      'offers.html':          'offers',
      'contact.html':         'contact'
    };

    var activePage = pageMap[currentPage];

    if (activePage) {
      document.querySelectorAll('.eb-nav-link').forEach(function (link) {
        var href = link.getAttribute('href') || '';
        var linkPage = href.split('/').pop();
        var linkKey  = pageMap[linkPage];

        if (linkKey === activePage) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
})();
