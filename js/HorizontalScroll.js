document.addEventListener('DOMContentLoaded', () => {
    const horizontalSection = document.querySelector('.horizontal-scroll-section');
    const stickyWrapper = document.querySelector('.sticky-wrapper');
    const rail = document.querySelector('.horizontal-rail');

    if (!horizontalSection || !stickyWrapper || !rail) return;

    function updateScroll() {
        const sectionRect = horizontalSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress (0 to 1) based on how much of the section has passed the top of the viewport
        // We start when the section top hits 0 and end when the section bottom hits the bottom of viewport
        let progress = -sectionTop / (sectionHeight - viewportHeight);

        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Calculate the translation range
        const railWidth = rail.scrollWidth;
        const viewportWidth = window.innerWidth;

        // The total distance to scroll is the total width of the rail minus the viewport width
        // We add a small buffer (10% of viewport) to ensure the last card is fully revealed with some breathing room
        const maxDelta = Math.max(0, railWidth - viewportWidth + (viewportWidth * 0.1));

        const xTranslation = -progress * maxDelta;

        // Apply transform with high performance properties
        rail.style.transform = `translateX(${xTranslation}px)`;
    }

    // Only run on non-mobile devices (matches CSS media query)
    function handleScroll() {
        if (window.innerWidth > 768) {
            updateScroll();
        } else {
            rail.style.transform = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial call
    handleScroll();
});
