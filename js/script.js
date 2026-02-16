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

    // 3. Initialize ScrollStack for Technical Skills
    const skillsContainer = document.querySelector('.scroll-stack-container');
    if (skillsContainer && window.innerWidth > 768) {
        new ScrollStack(skillsContainer, {
            itemStackDistance: 40,
            itemScale: 0.05,
            baseScale: 0.9,
            stackPosition: '15%',
            useWindowScroll: true
        });
    }

    // 5. Project Gallery Navigation
    const gallery = document.getElementById('projectsGallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (gallery && prevBtn && nextBtn) {
        const scrollAmount = 432; // card width (400) + gap (32)

        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide/Show arrows based on scroll position
        gallery.addEventListener('scroll', () => {
            const isAtStart = gallery.scrollLeft <= 0;
            const isAtEnd = gallery.scrollLeft + gallery.offsetWidth >= gallery.scrollWidth - 10;

            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    }

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
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.75)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        }
    });


});
