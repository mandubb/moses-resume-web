// Initialize AOS animations
AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});

// Typing effect for hero
const typed = new Typed('#typed', {
    strings: ['Research Specialist', 'AI Trainer', 'Translator', 'Content Creator'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    loop: true
});

// Anime.js for timeline stagger
document.addEventListener('DOMContentLoaded', () => {
    anime.timeline({ loop: false })
        .add({
            targets: '[data-anime="timeline"]',
            translateX: [-50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(200)
        });

    // Skill progress bars animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        const bar = card.querySelector('.progress-bar');
                        const progress = card.dataset.progress;
                        bar.style.width = progress + '%';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelector('#skills').addEventListener('aos:in', () => {
        observer.observe(document.querySelector('#skills'));
    });

    // Mobile menu toggle
    document.getElementById('mobile-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    // Contact form handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate send with animation
        anime({
            targets: this.querySelector('button'),
            scale: [1, 1.05, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
        alert('Thank you for your message! It has been sent. (Demo; integrate EmailJS for real functionality.)');
        this.reset();
    });

    // Icon animations on hover
    document.querySelectorAll('i').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            anime({
                targets: icon,
                scale: 1.2,
                rotate: '+=360',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        });
    });
});