// Clean Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAOS();
    initializeTypedText();
    initializeScrollProgress();
    initializeNavigation();
    initializeSkillBars();
    initializeLanguageBars();
    initializeBackToTop();
    initializeCounterAnimations();
    initializeIntersectionObserver();
    
    console.log('✨ Portfolio initialized successfully!');
});

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
    }
}

// Initialize Typed Text Effect
function initializeTypedText() {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-text', {
            strings: [
                'AI Trainer',
                'Content Creator',
                'Cultural Bridge',
                'Language Expert',
                'Tech Innovator',
                'Research Specialist'
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true,
            fadeOut: false,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500
        });
    }
}

// Scroll Progress Bar
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (!progressBar) return;
    
    const updateProgress = throttle(() => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / documentHeight) * 100, 100);
        
        progressBar.style.width = scrollPercent + '%';
    }, 16); // ~60fps
    
    window.addEventListener('scroll', updateProgress);
}

// Enhanced Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (!navbar || !mobileToggle || !mobileMenu) return;
    
    // Navbar scroll effect
    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavigation();
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling and active link management
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && mobileMenu.style.transform === 'translateX(0%)') {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    const icon = mobileToggle.querySelector('i');
    
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
    const mobileToggle = document.getElementById('mobile-toggle');
    const icon = mobileToggle.querySelector('i');
    
    mobileMenu.style.transform = 'translateX(100%)';
    icon.classList.replace('fa-times', 'fa-bars');
    document.body.style.overflow = '';
}

function handleNavLinkClick(e) {
    const href = e.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            // Close mobile menu
            closeMobileMenu();
            
            // Smooth scroll to target
            const headerHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveLink(href);
        }
    }
}

// Update active navigation link based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= headerHeight && sectionTop + sectionHeight > headerHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active link helper
function updateActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Animated Skill Progress Bars
function initializeSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-50px'
    });
    
    skillCards.forEach(card => observer.observe(card));
}

// Animated Language Progress Bars
function initializeLanguageBars() {
    const languageCards = document.querySelectorAll('.language-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const languageBar = entry.target.querySelector('.language-bar');
                if (languageBar) {
                    const width = languageBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        languageBar.style.width = width + '%';
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-50px'
    });
    
    languageCards.forEach(card => observer.observe(card));
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    const handleScroll = throttle(() => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter Animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const countElement = counter.querySelector('.text-3xl');
                const targetText = countElement.textContent.trim();
                
                if (countElement && targetText) {
                    animateCounter(countElement, targetText);
                    observer.unobserve(counter);
                }
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-100px'
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Animate counter numbers
function animateCounter(element, targetText) {
    const isKFormat = targetText.includes('K+');
    const isPlusFormat = targetText.includes('+') && !isKFormat;
    
    let targetNumber;
    let suffix = '';
    
    if (isKFormat) {
        targetNumber = parseInt(targetText.replace('K+', ''));
        suffix = 'K+';
    } else if (isPlusFormat) {
        targetNumber = parseInt(targetText.replace('+', ''));
        suffix = '+';
    } else {
        targetNumber = parseInt(targetText) || 0;
    }
    
    if (targetNumber === 0) {
        return;
    }
    
    let current = 0;
    const increment = targetNumber / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            element.textContent = targetNumber + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Enhanced Intersection Observer for animations
function initializeIntersectionObserver() {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger custom animations based on data attributes
                const animationType = entry.target.getAttribute('data-animate');
                if (animationType && typeof anime !== 'undefined') {
                    triggerCustomAnimation(entry.target, animationType);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-aos], [data-animate]');
    animatedElements.forEach(el => observer.observe(el));
}

// Custom animation triggers
function triggerCustomAnimation(element, type) {
    const animations = {
        fadeInUp: {
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        },
        scaleIn: {
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutBack'
        },
        slideInLeft: {
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 700,
            easing: 'easeOutCubic'
        },
        rotateIn: {
            rotate: [180, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        }
    };
    
    const animationConfig = animations[type];
    if (animationConfig) {
        anime({
            targets: element,
            ...animationConfig
        });
    }
}

// Utility Functions

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element helper
function smoothScrollTo(target, offset = 80) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Add loading states and error handling
function addLoadingState(element, isLoading) {
    if (!element) return;
    
    if (isLoading) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
        element.setAttribute('aria-busy', 'true');
    } else {
        element.style.opacity = '';
        element.style.pointerEvents = '';
        element.removeAttribute('aria-busy');
    }
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        // Ensure proper tab order
        focusableElements.forEach((el, index) => {
            el.setAttribute('tabindex', index);
        });
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.style.transform === 'translateX(0%)') {
            closeMobileMenu();
        }
    }
    
    // Navigate sections with arrow keys when focused on nav
    if (e.target.classList.contains('nav-link')) {
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(e.target);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
            navLinks[prevIndex].focus();
        }
    }
});

// Preload critical images and resources
function preloadCriticalResources() {
    const criticalImages = document.querySelectorAll('img[data-critical]');
    
    criticalImages.forEach(img => {
        const imageUrl = img.getAttribute('data-src') || img.src;
        if (imageUrl) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = imageUrl;
            document.head.appendChild(preloadLink);
        }
    });
}

// Handle reduced motion preferences
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable CSS animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
        
        // Disable AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({ disable: true });
        }
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Performance:', {
                    DOMContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    LoadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    TotalTime: perfData.loadEventEnd - perfData.navigationStart
                });
            }
        }, 0);
    });
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('Largest Contentful Paint:', lastEntry.startTime);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
}

// Error handling and logging
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        error: e.error
    });
    
    // Could send error reports to analytics service here
    // sendErrorReport(e);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
    
    // Could send error reports to analytics service here
    // sendErrorReport(e);
});

// Initialize additional features on load
window.addEventListener('load', () => {
    respectMotionPreferences();
    preloadCriticalResources();
    initializePerformanceMonitoring();
});

// Clean up resources on page unload
window.addEventListener('beforeunload', () => {
    // Cancel any ongoing animations
    if (typeof anime !== 'undefined') {
        anime.remove('*');
    }
    
    // Clear any running intervals or timeouts
    // This is handled automatically by the browser, but good practice for complex apps
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isElementInViewport,
        smoothScrollTo,
        addLoadingState
    };
}