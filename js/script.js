// 3D Effect on Hero Content
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xAxis = (clientX - innerWidth / 2) / 25;
    const yAxis = (clientY - innerHeight / 2) / 25;
    
    heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
});

// Reset transform on mouse leave
document.querySelector('.hero-section').addEventListener('mouseleave', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'rotateY(0) rotateX(0)';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Parallax effect for glass cards
document.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const scrollPosition = window.innerHeight;
        
        if (cardTop < scrollPosition) {
            const distance = scrollPosition - cardTop;
            const parallax = -(distance * 0.1);
            card.style.transform = `translateY(${parallax}px)`;
        }
    });
});

// Dynamic background gradient animation
const body = document.querySelector('body');
let gradientPos = 0;

function updateGradient() {
    gradientPos = (gradientPos + 1) % 360;
    body.style.backgroundImage = `linear-gradient(${gradientPos}deg, #4158d0, #c850c0, #ffcc70)`;
    requestAnimationFrame(updateGradient);
}

requestAnimationFrame(updateGradient);

// Hamburger menu animation
const hamburger = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Form validation and submission
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

// Portfolio item hover effect
const portfolioItems = document.querySelectorAll('.swiper-slide');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    typeWriter(heroTitle, heroTitle.textContent);
}

// Create floating dots animation
function createFloatingDots() {
    const container = document.getElementById('floating-dots');
    const dotCount = 20;

    for (let i = 0; i < dotCount; i++) {
        const dot = createDot();
        container.appendChild(dot);
    }
}

// Create and return a dot element
function createDot() {
    const dot = document.createElement('div');
    dot.className = 'dot';
    
    // Random size between 5 and 20px
    const size = Math.random() * 15 + 5;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    
    // Random position
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10 and 20 seconds
    const duration = Math.random() * 10 + 10;
    dot.style.animation = `floating ${duration}s infinite linear`;

    return dot;
}

// Add floating animation keyframes
function addFloatingKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0% { transform: translate(0, 0); }
            25% { transform: translate(10px, 10px); }
            50% { transform: translate(-10px, 20px); }
            75% { transform: translate(-20px, -10px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating dots
createFloatingDots();
addFloatingKeyframes();

// Newsletter form handling
function handleNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        if (input.value.trim()) {
            showSuccessMessage(newsletterForm);
            input.value = '';
        }
    });
}

// Show success message after newsletter submission
function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.textContent = 'Thank you for subscribing!';
    form.appendChild(successMessage);

    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Smooth scroll for footer links
function enableSmoothScroll() {
    document.querySelectorAll('.footer-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize all functionalities
handleNewsletterForm();
enableSmoothScroll();
