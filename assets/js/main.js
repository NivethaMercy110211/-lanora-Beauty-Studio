/* ============================================
   Élanora Beauty Studio — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ── Theme Toggle ── */
  const THEME_KEY = 'eb-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateLogos(theme) {
    var isDark = theme === 'dark';
    var logoSrc = isDark ? 'assets/images/common/dark_theme_logo.png' : 'assets/images/common/logo.png';

    var logoImgs = document.querySelectorAll(
      '.eb-brand-logo-badge img, .eb-footer-brand-badge img, .eb-auth-brand-badge img, img.eb-brand-logo-img, img.eb-footer-logo-img, img.eb-auth-logo-img'
    );
    logoImgs.forEach(function (img) {
      img.src = logoSrc;
    });

    var favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = logoSrc;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll('.theme-toggle-icon').forEach(function (icon) {
      if (theme === 'dark') {
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-sun');
      } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon');
      }
    });
    updateLogos(theme);
  }

  function preserveMobileNavState() {
    var mobileNav = document.getElementById('mobileNav');
    var menuToggle = document.getElementById('menuToggle');
    if (mobileNav && mobileNav.classList.contains('show')) {
      mobileNav.classList.add('show');
      if (menuToggle) menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function toggleTheme(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
    preserveMobileNavState();
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    updateLogos(document.documentElement.getAttribute('data-theme') || getPreferredTheme());
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
  });

  window.ebToggleTheme = toggleTheme;

  /* ── RTL/LTR Toggle ── */
  const DIR_KEY = 'eb-dir';

  function getPreferredDir() {
    return localStorage.getItem(DIR_KEY) || 'ltr';
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);
    document.querySelectorAll('.rtl-toggle-label').forEach(function (label) {
      label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  function toggleDir(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    var current = document.documentElement.getAttribute('dir') || 'ltr';
    applyDir(current === 'rtl' ? 'ltr' : 'rtl');
    preserveMobileNavState();
  }

  applyDir(getPreferredDir());

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-action="toggle-dir"]').forEach(function (btn) {
      btn.addEventListener('click', toggleDir);
    });
  });

  window.ebToggleDir = toggleDir;

  /* ── Safe Scroll Animations ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.eb-card, .eb-bento-card, .eb-package-card, .eb-pricing-card, .eb-offer-card, .eb-stylist-card, .eb-contact-info-card, .eb-service-card, .eb-section-header, .eb-split, .eb-studio-brief-grid, .eb-ba-wrapper').forEach(function (el) {
      if (!el.classList.contains('anim') && !el.classList.contains('anim-fade-up') && !el.classList.contains('anim-slide-left') && !el.classList.contains('anim-slide-right') && !el.classList.contains('anim-scale')) {
        el.classList.add('eb-auto-motion');
      }
    });

    var animElements = document.querySelectorAll('.anim, .anim-fade-up, .anim-fade, .anim-slide-left, .anim-slide-right, .anim-scale, .anim-blur-in, .anim-clip-reveal, .anim-split-up, .eb-auto-motion');
    document.documentElement.classList.add('eb-motion-ready');

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('anim-visible');
          revealObserver.unobserve(entry.target);
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      });

      animElements.forEach(function (el, index) {
        el.style.transitionDelay = Math.min(index % 6, 5) * 70 + 'ms';
        revealObserver.observe(el);
      });
    } else {
      animElements.forEach(function (el) { el.classList.add('anim-visible'); });
    }

    var hero = document.querySelector('.eb-hero');
    if (hero) {
      hero.classList.add('loaded');
    }
  });

  /* ── Sticky Header ── */
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  });

  /* ── Mobile Menu ── */
  document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menuToggle');
    var mobileNav = document.getElementById('mobileNav');
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('show');
      menuToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    mobileNav.querySelectorAll('.eb-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('show');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  });

  /* ── FAQ Accordion ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.eb-faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = this.closest('.eb-faq-item');
        var isActive = item.classList.contains('active');
        item.closest('.eb-faq-list').querySelectorAll('.eb-faq-item').forEach(function (faq) {
          faq.classList.remove('active');
        });
        if (!isActive) item.classList.add('active');
      });
    });
  });

  /* ── Smooth Scroll ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      });
    });
  });

  /* ── Scroll to Top ── */
  document.addEventListener('DOMContentLoaded', function () {
    var scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  });

  /* ── Animated Stats Counter (Scroll-Triggered Count Up) ── */
  function animateCounter(el) {
    if (el.getAttribute('data-animated') === 'true') return;
    el.setAttribute('data-animated', 'true');

    var rawText = el.textContent.trim();
    var dataCount = el.getAttribute('data-count');
    var targetNum = parseFloat(dataCount || rawText.replace(/[^0-9.]/g, ''));
    if (isNaN(targetNum)) return;

    // Detect prefix and suffix (e.g. "+", "%")
    var suffix = el.getAttribute('data-suffix') || rawText.replace(/^[0-9.,\s]+/, '') || '';
    var prefix = el.getAttribute('data-prefix') || rawText.replace(/[0-9.,\s]+$/, '') || '';
    if (prefix === rawText) prefix = '';

    var duration = 1800;
    var startTime = null;
    var isFloat = targetNum % 1 !== 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeProgress = 1 - Math.pow(1 - progress, 3);
      var current = isFloat 
        ? (easeProgress * targetNum).toFixed(1)
        : Math.floor(easeProgress * targetNum);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + (isFloat ? targetNum.toFixed(1) : targetNum) + suffix;
        el.classList.add('animated');
      }
    }

    requestAnimationFrame(step);
  }

  function initStatsCounters() {
    var statElements = document.querySelectorAll('.eb-stat-number, .eb-split-badge-number, .eb-artists-stat-number, [data-count]');
    if (!statElements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      statElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      statElements.forEach(function (el) {
        animateCounter(el);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initStatsCounters);

  /* ── Service / Category Filter ── */
  document.addEventListener('DOMContentLoaded', function () {
    var filterBtns = document.querySelectorAll('.eb-filter-btn[data-filter]');
    var filterItems = document.querySelectorAll('[data-category]');

    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Filter items
        filterItems.forEach(function (item) {
          if (filter === 'all') {
            item.style.display = '';
            item.classList.add('anim-visible');
          } else {
            var cats = item.getAttribute('data-category') || '';
            if (cats.split(',').map(function (s) { return s.trim(); }).includes(filter)) {
              item.style.display = '';
              item.classList.add('anim-visible');
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  });

  /* ── Testimonial Carousel ── */
  window.ebTestimonialCarousel = function (sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var items = section.querySelectorAll('.eb-testimonial-item');
    var dots = section.querySelectorAll('.eb-testimonial-dot');
    var currentIndex = 0;

    function showSlide(index) {
      items.forEach(function (item) { item.classList.remove('active'); });
      dots.forEach(function (dot) { dot.classList.remove('active'); });
      currentIndex = index;
      if (currentIndex >= items.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = items.length - 1;
      items[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showSlide(i); });
    });

    showSlide(0);
  };

  /* ── Horizontal Showcase Scroll ── */
  function ebScrollShowcase(direction, containerId) {
    var container = containerId
      ? document.getElementById(containerId)
      : document.querySelector('.eb-h-showcase');
    if (!container) return;
    var scrollAmount = 320;
    var maxScroll = container.scrollWidth - container.clientWidth;
    if (direction === 1) {
      if (container.scrollLeft + scrollAmount >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'auto' });
      }
    } else if (direction === -1) {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: maxScroll, behavior: 'auto' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'auto' });
      }
    }
  }

  window.ebScrollShowcase = ebScrollShowcase;

  /* ── Appointment Form Validation ── */
  document.addEventListener('DOMContentLoaded', function () {
    var appointmentForm = document.getElementById('appointmentForm');
    if (!appointmentForm) return;

    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Validate required fields
      appointmentForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        }
      });

      // Validate email
      var emailField = appointmentForm.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.classList.add('is-invalid');
          emailField.classList.remove('is-valid');
          valid = false;
        }
      }

      if (valid) {
        var successMsg = appointmentForm.querySelector('.eb-form-success') ||
          document.getElementById('appointmentSuccess');
        if (successMsg) {
          appointmentForm.querySelector('.eb-form-fields').style.display = 'none';
          successMsg.classList.add('show');
        }
      }
    });

    // Remove invalid on input
    appointmentForm.querySelectorAll('.eb-form-control').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  });

  /* ── Newsletter Form ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.eb-newsletter-form, .eb-footer-newsletter-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input) return;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value.trim() && emailRegex.test(input.value)) {
          var btn = form.querySelector('button, .eb-btn');
          var originalText = btn ? btn.innerHTML : '';
          if (btn) {
            btn.innerHTML = '<i class="bi bi-check2"></i>';
            btn.disabled = true;
            setTimeout(function () {
              btn.innerHTML = originalText;
              btn.disabled = false;
              input.value = '';
            }, 2500);
          }
        } else {
          input.classList.add('is-invalid');
          setTimeout(function () { input.classList.remove('is-invalid'); }, 2000);
        }
      });
    });
  });

  /* ── Auth: Login Form ── */
  document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      loginForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (valid) {
        var btn = loginForm.querySelector('[type="submit"]');
        if (btn) {
          btn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Signing In…';
          btn.disabled = true;
          setTimeout(function () {
            btn.innerHTML = 'Sign In';
            btn.disabled = false;
          }, 2000);
        }
      }
    });

    loginForm.querySelectorAll('.eb-form-control').forEach(function (f) {
      f.addEventListener('input', function () { this.classList.remove('is-invalid'); });
    });
  });

  /* ── Auth: Signup Form ── */
  document.addEventListener('DOMContentLoaded', function () {
    var signupForm = document.getElementById('signupForm');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      signupForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      // Password match
      var pass1 = signupForm.querySelector('#signupPassword');
      var pass2 = signupForm.querySelector('#signupConfirmPassword');
      if (pass1 && pass2 && pass1.value !== pass2.value) {
        pass2.classList.add('is-invalid');
        valid = false;
      }
      if (valid) {
        var btn = signupForm.querySelector('[type="submit"]');
        if (btn) {
          btn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Creating Account…';
          btn.disabled = true;
          setTimeout(function () {
            btn.innerHTML = 'Create Account';
            btn.disabled = false;
          }, 2000);
        }
      }
    });

    signupForm.querySelectorAll('.eb-form-control').forEach(function (f) {
      f.addEventListener('input', function () { this.classList.remove('is-invalid'); });
    });
  });

  /* ── Auth: Forgot Password Form ── */
  document.addEventListener('DOMContentLoaded', function () {
    var forgotForm = document.getElementById('forgotForm');
    if (!forgotForm) return;

    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailField = forgotForm.querySelector('[type="email"]');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && emailRegex.test(emailField.value.trim())) {
        var formWrap = forgotForm.querySelector('.eb-auth-form-content');
        var successWrap = forgotForm.querySelector('.eb-auth-success') || document.getElementById('forgotSuccess');
        if (formWrap) formWrap.style.display = 'none';
        if (successWrap) successWrap.style.display = 'block';
      } else {
        if (emailField) emailField.classList.add('is-invalid');
      }
    });
  });

  /* ── Password Toggle ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.eb-password-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var field = this.previousElementSibling;
        if (!field) {
          field = this.closest('.eb-password-field').querySelector('.eb-form-control');
        }
        if (field) {
          if (field.type === 'password') {
            field.type = 'text';
            this.innerHTML = '<i class="bi bi-eye-slash"></i>';
          } else {
            field.type = 'password';
            this.innerHTML = '<i class="bi bi-eye"></i>';
          }
        }
      });
    });
  });

  /* ── Auth utils mobile scroll behavior ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('auth-page')) return;
    var authCard = document.querySelector('.eb-auth-card');
    var authUtils = document.querySelector('.eb-auth-utils');
    if (!authCard || !authUtils) return;
    var mobileAuthQuery = window.matchMedia('(max-width: 767.98px)');
    var authScrollTimer;

    function showAuthUtils() {
      document.body.classList.remove('auth-utils-hidden');
      authUtils.style.opacity = '';
      authUtils.style.pointerEvents = '';
      authUtils.style.transform = '';
    }

    function hideAuthUtils() {
      document.body.classList.add('auth-utils-hidden');
      authUtils.style.opacity = '0';
      authUtils.style.pointerEvents = 'none';
      authUtils.style.transform = 'translateY(-10px)';
    }

    function updateAuthUtilsForScroll() {
      if (!mobileAuthQuery.matches) {
        showAuthUtils();
        return;
      }

      if (window.scrollY > 8) {
        hideAuthUtils();
        return;
      }

      showAuthUtils();
    }

    window.addEventListener('scroll', function () {
      if (!mobileAuthQuery.matches) return;
      if (window.scrollY > 8) {
        hideAuthUtils();
      } else {
        showAuthUtils();
      }
      window.clearTimeout(authScrollTimer);
      authScrollTimer = window.setTimeout(updateAuthUtilsForScroll, 160);
    }, { passive: true });

    window.addEventListener('resize', updateAuthUtilsForScroll);
    updateAuthUtilsForScroll();
  });

  /* ── Interactive Before & After Slider Handler ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.eb-ba-wrapper').forEach(function (wrapper) {
      var sliderInput = wrapper.querySelector('.eb-ba-slider-input');
      var beforeLayer = wrapper.querySelector('.eb-ba-before-layer');
      var beforeImg = wrapper.querySelector('.eb-ba-before-img');
      var handle = wrapper.querySelector('.eb-ba-handle');

      if (!sliderInput || !beforeLayer || !handle) return;

      function updateSlider(val) {
        beforeLayer.style.width = val + '%';
        handle.style.left = val + '%';
        if (beforeImg) {
          beforeImg.style.width = wrapper.offsetWidth + 'px';
        }
      }

      sliderInput.addEventListener('input', function (e) {
        updateSlider(e.target.value);
      });

      window.addEventListener('resize', function () {
        if (beforeImg) {
          beforeImg.style.width = wrapper.offsetWidth + 'px';
        }
      });

      updateSlider(sliderInput.value || 50);
    });
  });

})();

/* ── Spin animation (inline) ── */
var style = document.createElement('style');
style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } .spin { display: inline-block; animation: spin 0.8s linear infinite; }';
document.head.appendChild(style);
