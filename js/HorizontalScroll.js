document.addEventListener('DOMContentLoaded', () => {
    const scrollSections = document.querySelectorAll('.horizontal-scroll-section');

    function updateAllScrolls() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (viewportWidth <= 768) {
            scrollSections.forEach(section => {
                const rail = section.querySelector('.horizontal-rail');
                if (rail) rail.style.transform = 'none';
            });
            return;
        }

        scrollSections.forEach(section => {
            const stickyWrapper = section.querySelector('.sticky-wrapper');
            const rail = section.querySelector('.horizontal-rail');
            if (!stickyWrapper || !rail) return;

            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;

            // Calculate progress (0 to 1) based on how much of the section has passed the top
            let progress = -sectionTop / (sectionHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));

            // Calculate translation
            const railWidth = rail.scrollWidth;
            const maxDelta = Math.max(0, railWidth - viewportWidth + (viewportWidth * 0.15));

            const xTranslation = -progress * maxDelta;
            rail.style.transform = `translateX(${xTranslation}px)`;
        });
    }

    // Set height dynamically based on rail content to ensure good scroll feel
    function setSectionHeights() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 768) return;

        scrollSections.forEach(section => {
            const rail = section.querySelector('.horizontal-rail');
            if (rail) {
                const railWidth = rail.scrollWidth;
                // Height = rail width + some padding to feel smooth
                const calculatedHeight = railWidth + window.innerHeight;
                section.style.height = `${calculatedHeight}px`;
            }
        });
    }

    window.addEventListener('scroll', updateAllScrolls, { passive: true });
    window.addEventListener('resize', () => {
        setSectionHeights();
        updateAllScrolls();
    });

    // Initial setup
    setSectionHeights();
    updateAllScrolls();

    // Recalculate after a short delay to account for image/video loading
    setTimeout(() => {
        setSectionHeights();
        updateAllScrolls();
    }, 1000);
});
