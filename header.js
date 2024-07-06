function initializeHeaderScripts() {
    // Function to toggle menu
    function toggleMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('show');
    }

    // Add event listeners for menu icons
    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
    document.querySelector('.close-icon').addEventListener('click', toggleMenu);

    // Add event listeners to navigation links to handle page transitions
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMenu();
            const href = link.getAttribute('href');
            // Perform page navigation
            window.location.href = href;
        });
    });
}