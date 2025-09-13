document.addEventListener('DOMContentLoaded', () => {
    initializeAOS();
    initializeTypedText();
    initializeScrollProgress();
    initializeNavigation();
    initializeSkillBars();
    initializeLanguageBars();
    initializeBackToTop();
    initializeCounterAnimations();
});

// AOS Initialization
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            easing: 'ease-out-quad'
        });
    }
}

// Typed Text
function initializeTypedText() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['AI Trainer', 'Content Specialist', 'Translator', 'Cultural Consultant'],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }
}

// Scroll Progress
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
    }, 16));
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    window.addEventListener('scroll', throttle(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavigation();
    }, 16));
    
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.style.transform === 'translateX(0%)';
        mobileMenu.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0%)';
        mobileToggle.querySelector('i').classList.toggle('fa-bars', isOpen);
        mobileToggle.querySelector('i').classList.toggle('fa-times', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        const href = e.target.closest('a').getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            smoothScrollTo(target.offsetTop - 80);
            mobileMenu.style.transform = 'translateX(100%)';
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            document.body.style.overflow = '';
        }
    }));
}

function smoothScrollTo(target) {
    window.scrollTo({
        top: target,
        behavior: 'smooth'
    });
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

// Skill Bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const text = bar.nextElementSibling;
                bar.style.width = bar.dataset.width + '%';
                animateProgressNumber(text, parseInt(bar.dataset.width));
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateProgressNumber(el, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        el.textContent = Math.floor(current) + '%';
        if (current >= target) clearInterval(timer);
    }, 20);
}

// Language Bars
function initializeLanguageBars() {
    const languageBars = document.querySelectorAll('.language-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    languageBars.forEach(bar => observer.observe(bar));
}

// Back to Top
function initializeBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', throttle(() => {
        btn.classList.toggle('show', window.scrollY > 500);
    }, 100));
    
    btn.addEventListener('click', () => smoothScrollTo(0));
}

// Counter Animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-card .text-2xl, .stat-card .text-3xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, entry.target.textContent);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    let current = 0;
    const increment = num / 50;
    const timer = setInterval(() => {
        current += increment;
        el.textContent = Math.floor(current) + (target.includes('K+') ? 'K+' : '');
        if (current >= num) clearInterval(timer);
    }, 20);
}

// Throttle Utility
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