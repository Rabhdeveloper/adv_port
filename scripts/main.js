/**
 * Saurabh's Portfolio - Main JavaScript
 * Professional, Modern, Interactive
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // Loading Animation
    // ==========================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // ==========================================
    // Typed.js - Dynamic Text Animation
    // ==========================================
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Full Stack Developer',
                'BCA Student',
                'Web Developer',
                'Python Enthusiast',
                'Problem Solver'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // ==========================================
    // Mobile Navigation
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // Smooth Scrolling
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Intersection Observer - Scroll Animations
    // ==========================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                
                // Add visible class for additional styling
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        if (element.classList.contains('fade-in-left')) {
            element.style.transform = 'translateX(-30px)';
        } else if (element.classList.contains('fade-in-right')) {
            element.style.transform = 'translateX(30px)';
        } else if (element.classList.contains('scale-in')) {
            element.style.transform = 'scale(0.9)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        animationObserver.observe(element);
    });

    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
    }

    // ==========================================
    // Navigation Active State on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run on load

    // ==========================================
    // Set Current Year
    // ==========================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Log submission (replace with actual API call)
            console.log('Contact Form Submitted:', data);
            
            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // ==========================================
    // Newsletter Form Handling
    // ==========================================
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Log subscription (replace with actual API call)
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // ==========================================
    // Notification System
    // ==========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            closeNotification(notification);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }

    function closeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }

    // ==========================================
    // Skill Cards Hover Effect
    // ==========================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ==========================================
    // Project Cards Tilt Effect
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // Parallax Effect for Hero Section
    // ==========================================
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    const floatingShapes = document.querySelectorAll('.shape');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                if (heroImage) {
                    heroImage.style.transform = `translateY(${rate * 0.5}px)`;
                }
                
                floatingShapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    shape.style.transform = `translateY(${rate * speed}px)`;
                });
            }
        });
    }

    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cThanks for checking out my portfolio code!', 'font-size: 14px; color: #8b5cf6;');
    console.log('%c📧 Contact: saurabhsk4u@gmail.com', 'font-size: 12px; color: #a1a1aa;');
});

// ==========================================
// Preload Critical Images
// ==========================================
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload hero image
preloadImages(['images/pro.jpeg']);