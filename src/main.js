import './style.css';

/* ============================================
   MOTION — Main JavaScript
   All interactive effects & animations
   ============================================ */

// === UTILITY FUNCTIONS ===
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursorFollower');
let cursorX = -100, cursorY = -100;
let currentX = -100, currentY = -100;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

function animateCursor() {
  currentX = lerp(currentX, cursorX, 0.15);
  currentY = lerp(currentY, cursorY, 0.15);
  cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll(
  'a, button, .btn, .easing-card, .morph-card, .tilt-card, .showcase-card, .mask-item, .nav-link'
);

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.background = 'rgba(99, 102, 241, 0.15)';
    cursor.style.borderWidth = '2px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'rgba(99, 102, 241, 0.3)';
    cursor.style.borderWidth = '1px';
  });
});

// === SCROLL REVEAL (Intersection Observer) ===
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // If it's a mask item, trigger clip-path animation
          const maskItem = entry.target.closest('.mask-item');
          if (maskItem) {
            maskItem.classList.add('visible');
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('[data-scroll], [data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
initScrollReveal();

// === NAVIGATION ===
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileBtn.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach((section) => {
    const top = section.offsetTop - 200;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id') || 'hero';
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav);

// === PARALLAX EFFECT ===
function initParallax() {
  const stage = document.querySelector('.parallax-stage');
  if (!stage) return;

  const layers = stage.querySelectorAll('.parallax-layer');
  let scrollProgress = 0;

  window.addEventListener('scroll', () => {
    const rect = stage.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the section is through the viewport
    const sectionProgress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height);
    scrollProgress = clamp(sectionProgress, 0, 1);

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.3;
      const offset = (scrollProgress - 0.5) * speed * 200;
      layer.style.transform = `translateY(${offset}px)`;
    });
  });
}
initParallax();

// === 3D TILT EFFECT ===
function initTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach((card) => {
    const shine = card.querySelector('.tilt-shine');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      if (shine) {
        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;
        shine.style.setProperty('--mouse-x', `${mouseX}%`);
        shine.style.setProperty('--mouse-y', `${mouseY}%`);
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
initTilt();

// === EASING CARDS MOUSE TRACKING ===
const easingCards = document.querySelectorAll('.easing-card');
easingCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// === EASING BALL ANIMATIONS ===
function initEasingBalls() {
  const easingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ball = entry.target.querySelector('.easing-ball');
          if (ball) {
            ball.classList.add('animating');
          }
        } else {
          const ball = entry.target.querySelector('.easing-ball');
          if (ball) {
            ball.classList.remove('animating');
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.easing-card').forEach((card) => {
    easingObserver.observe(card);
  });
}
initEasingBalls();

// === MORPH SHAPES ===
function initMorphShapes() {
  const morphShapes = document.querySelectorAll('[data-morph]');
  if (!morphShapes.length) return;
  
  let morphInterval = null;
  
  const morphObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start morphing when visible
          if (!morphInterval) {
            morphInterval = setInterval(() => {
              morphShapes.forEach((shape) => {
                shape.classList.toggle('morphed');
              });
            }, 2500);
          }
        } else {
          // Stop morphing when not visible
          if (morphInterval) {
            clearInterval(morphInterval);
            morphInterval = null;
          }
        }
      });
    },
    { threshold: 0.2 }
  );
  
  // Observe the parent section or a nearby element
  const morphSection = document.querySelector('#transform .morph-grid');
  if (morphSection) {
    morphObserver.observe(morphSection);
  }
}
initMorphShapes();

// === COUNTER ANIMATIONS ===
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();
          
          function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            el.textContent = current + suffix;
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}
initCounters();

// === HERO PARTICLES ===
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = Math.min(Math.floor(window.innerWidth / 8), 100);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * duration;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(particle);
  }
}
initParticles();

// === SMOOTH ANCHOR SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// === CARDS INTERSECTION OBSERVER FOR EASING CARDS ===
// (Separated from the main reveal for stagger timing)
function initCardReveal() {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.easing-card, .morph-card, .tilt-card, .showcase-card, .mask-item').forEach((card) => {
    if (!card.hasAttribute('data-reveal') && !card.hasAttribute('data-scroll')) {
      cardObserver.observe(card);
    }
  });
}
initCardReveal();

// === SCROLL PROGRESS BAR (if you want to add one) ===
function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
    z-index: 1001;
    width: 0%;
    transition: width 0.1s linear;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrollPercent + '%';
  });
}
initProgressBar();

// === LOG ===
console.log('✦ Motion — Animation Showcase loaded');
console.log('Crafted with care, animated with purpose.');
