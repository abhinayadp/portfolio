document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (!nav || !navLinks) return;

    // Parameters for the effect (subtle for top nav)
    const MAX_SCALE = 1.25;
    const MAX_DISTANCE = 100;

    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        links.forEach(link => {
            const rect = link.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

            // Calculate scale based on distance
            let scale = 1;
            if (distance < MAX_DISTANCE) {
                scale = 1 + (MAX_SCALE - 1) * (1 - distance / MAX_DISTANCE);
            }

            // Apply transformation
            link.style.transform = `scale(${scale})`;

            // Add some margin adjust to prevent items from overlapping too harshly 
            // but the dock usually expands the whole container
            const margin = (scale - 1) * 15;
            link.style.margin = `0 ${margin}px`;
        });
    }

    function handleMouseLeave() {
        links.forEach(link => {
            link.style.transform = 'scale(1)';
            link.style.margin = '0';
        });
    }

    navLinks.addEventListener('mousemove', handleMouseMove);
    navLinks.addEventListener('mouseleave', handleMouseLeave);
});
