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

    // 3. Initialize ScrollStack for Technical Skills & Education
    const initScrollStack = (selector, options) => {
        try {
            const container = document.querySelector(selector);
            if (container && window.innerWidth > 768 && typeof ScrollStack !== 'undefined') {
                new ScrollStack(container, options);
            }
        } catch (e) {
            console.warn(`ScrollStack initialization failed for ${selector}:`, e);
        }
    };

    initScrollStack('#skills .scroll-stack-container', {
        itemStackDistance: 40,
        itemScale: 0.05,
        baseScale: 0.9,
        stackPosition: '15%',
        useWindowScroll: true
    });

    // 4. Academic Journey Spiral Animation
    const journeyPath = document.getElementById('journeyPath');
    const journeyArrow = document.getElementById('journeyArrow');

    if (journeyPath) {
        const pathLength = journeyPath.getTotalLength();
        journeyPath.style.strokeDasharray = pathLength;
        journeyPath.style.strokeDashoffset = pathLength;

        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    journeyPath.style.transition = 'stroke-dashoffset 2.5s ease-in-out';
                    journeyPath.style.strokeDashoffset = '0';
                    if (journeyArrow) {
                        setTimeout(() => {
                            journeyArrow.style.transition = 'opacity 0.5s ease';
                            journeyArrow.style.opacity = '1';
                        }, 2300);
                    }
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        journeyObserver.observe(document.querySelector('.edu-journey-section'));
    }

    // 5. Flip Card Interactions (Handled via CSS)
    // No JS needed for hover-flip usually, but can be added for touch support if needed.

    // 6. Update Navigation to use Lenis for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (window.globalLenis) {
                window.globalLenis.scrollTo(targetId, {
                    offset: -100,
                    lerp: 0.08
                });
            } else {
                const target = document.querySelector(targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });


});
