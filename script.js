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

// Background Canvas Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

    // Download CV handler
    document.querySelector('a[href="#download"]').addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'Moses_Kamanu_Mathu_CV.pdf'; // Replace with actual CV file path
        link.download = 'Moses_Kamanu_Mathu_CV.pdf';
        link.click();
    });
});