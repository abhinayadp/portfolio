document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Set initial theme
    htmlElement.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'dark') {
        themeToggle.checked = true;
    }

    // Handle theme toggle
    themeToggle.addEventListener('change', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Dispatch custom event if needed
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
});
