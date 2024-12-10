// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Typing Text Animation
const texts = [
    "High performance gameservers, ready for you",
    "Optimal performance for your gameserver",
    "The future of gameserver hosting",
    "Your partner for gameserver hosting"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

const typingText = document.querySelector('.typing-text');

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

// Start the typing animation
typeWriter();

// Animate Statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Stats Animation
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);
