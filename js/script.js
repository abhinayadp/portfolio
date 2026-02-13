// LiquidEther class is loaded via LiquidEther.js script tag in index.html

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader dismissal (Immediate + Fallback)
    const hideLoader = () => {
        const loader = document.getElementById('loader-wrapper');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 600);
        }
    };

    // Hide when everything is loaded
    window.addEventListener('load', hideLoader);

    // Safety Fallback: Hide after 3 seconds anyway
    setTimeout(hideLoader, 3000);

    // 2. Initialize LiquidEther Background
    const bgContainer = document.getElementById('liquid-ether-bg');
    if (bgContainer) {
        try {
            new LiquidEther(bgContainer, {
                colors: ['#191970', '#2563eb', '#60a5fa'],
                mouseForce: 20,
                cursorSize: 100,
                isViscous: true,
                viscous: 30,
                iterationsViscous: 32,
                iterationsPoisson: 32,
                resolution: 0.5,
                isBounce: false,
                autoDemo: false,
                autoSpeed: 0,
                autoIntensity: 0,
                takeoverDuration: 0,
                autoResumeDelay: 999999,
                autoRampDuration: 0,
                dissipation: 0.94
            });
        } catch (error) {
            console.warn('Background effect failed to load, continuing with standard theme.', error);
        }
    }


    // Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .glass-card, .section-title');

    // Add base class to cards and titles if not present for consistent animation
    document.querySelectorAll('.glass-card, .section-title').forEach(el => {
        el.classList.add('fade-in-up');
    });

    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Navigation Links
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
        });
    });

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.75)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        }
    });


});
