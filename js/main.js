/* ============================================================
   PORTFOLIO - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ---------- DOM Elements ----------
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const typingEl = document.getElementById('typingText');

  // ---------- Sticky Navigation ----------
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Mobile Navigation ----------
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Typing Effect ----------
  var typingPhrases = [
    'AI-powered systems that work',
    'production web applications',
    'autonomous AI agents',
    'LLM-integrated platforms',
    'scalable system architectures'
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 80;

  function typeText() {
    var currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // ---------- Scroll Reveal ----------
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---------- Staggered Reveal for Grids ----------
  var gridContainers = document.querySelectorAll('.services, .tech__grid, .projects__grid, .credentials__cards');

  gridContainers.forEach(function (container) {
    var children = container.querySelectorAll('.reveal');
    children.forEach(function (child, index) {
      child.style.transitionDelay = (index * 0.1) + 's';
    });
  });

  // ---------- Counter Animation ----------
  var counterElements = document.querySelectorAll('.proof__number[data-target]');

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var startTime = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = easeOutQuart(progress);
      var current = Math.floor(easedProgress * target);

      if (target >= 1000) {
        el.textContent = current.toLocaleString();
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (target >= 1000) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = target;
        }
      }
    }

    requestAnimationFrame(step);
  }

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Floating Upwork Badge ----------
  var upworkFloat = document.getElementById('upworkFloat');
  if (upworkFloat) {
    setTimeout(function () {
      upworkFloat.classList.add('visible');
    }, 1500);
  }

  // ---------- Active Nav Link on Scroll ----------
  var sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
})();
