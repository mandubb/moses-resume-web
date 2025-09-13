// Enhanced Portfolio JavaScript - Grok's Optimized Version
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeTypedText();
    initializeScrollProgress();
    initializeNavigation();
    initializeSkillBars();
    initializeLanguageBars();
    initializeBackToTop();
    initializeCounterAnimations();
    initializeIntersectionObserver();
    respectMotionPreferences();
    preloadCriticalResources();
    initializePerformanceMonitoring();
    
    console.log('✨ Portfolio initialized - Grok style!');
});

// AOS Initialization
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }
}

// Typed Text
function initializeTypedText() {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-text', {
            strings: ['AI Trainer', 'Content Creator', 'Cultural Bridge', 'Language Expert', 'Tech Innovator', 'Research Specialist'],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll Progress
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    const updateProgress = throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }, 16);
    
    window.addEventListener('scroll', updateProgress);
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (!navbar || !mobileToggle || !mobileMenu) return;
    
    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavigation();
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && mobileMenu.style.transform === 'translateX(0%)') {
            closeMobileMenu();
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMobileMenu();
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-toggle i');
    const isOpen = mobileMenu.style.transform === 'translateX(0%)';
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        mobileMenu.style.transform = 'translateX(0%)';
        icon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-toggle i');
    mobileMenu.style.transform = 'translateX(100%)';
    icon.classList.replace('fa-times', 'fa-bars');
    document.body.style.overflow = '';
}

function handleNavLinkClick(e) {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            closeMobileMenu();
            smoothScrollTo(target.offsetTop - 80);
            updateActiveLink(href);
        }
    }
}

function smoothScrollTo(target) {
    const start = window.pageYOffset;
    const distance = target - start;
    const duration = 800;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    requestAnimationFrame(animation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

function updateActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === href);
    });
}

// Skill Bars
function initializeSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                const text = entry.target.querySelector('.progress-text');
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                    if (text) animateProgressNumber(text, parseInt(width));
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => observer.observe(card));
}

function animateProgressNumber(el, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '%';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + '%';
        }
    }, 30);
}

// Language Bars
function initializeLanguageBars() {
    const languageCards = document.querySelectorAll('.language-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.language-bar');
                if (bar) {
                    const width = bar.dataset.width;
                    setTimeout(() => bar.style.width = width + '%', 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    languageCards.forEach(card => observer.observe(card));
}

// Back to Top
function initializeBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    const handleScroll = throttle(() => {
        btn.classList.toggle('show', window.scrollY > 500);
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    btn.addEventListener('click', () => smoothScrollTo(0));
}

// Counters
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-card .text-3xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetText = entry.target.textContent.trim();
                animateCounter(entry.target, targetText);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter.parentElement));
}

function animateCounter(el, target) {
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    let current = 0;
    const increment = num / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + (target.includes('K+') ? 'K+' : '');
        }
    }, 30);
}

// Intersection Observer
function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// Utilities
function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Motion Preferences
function respectMotionPreferences() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-base', 'none');
        if (typeof AOS !== 'undefined') AOS.init({ disable: true });
    }
}

// Preload
function preloadCriticalResources() {
    const links = [
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap' }
    ];
    links.forEach(link => {
        const el = document.createElement('link');
        Object.assign(el, link);
        document.head.appendChild(el);
    });
}

// Performance
function initializePerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            console.log('LCP:', Math.round(entries[entries.length - 1].startTime) + 'ms');
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});

// Load Events
window.addEventListener('load', initializeIntersectionObserver);