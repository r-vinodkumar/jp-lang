// header.js
document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const headerUrl = 'header.html'; // URL to your header HTML file

    fetch(headerUrl)
        .then(response => response.text())
        .then(html => {
            headerPlaceholder.innerHTML = html;
            // After loading the header, initialize any scripts related to the header
            initializeHeaderScripts();
        })
        .catch(error => console.error('Error fetching header:', error));
});

// Function to initialize any scripts related to the header (e.g., menu toggle)
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
