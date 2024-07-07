document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainLinks = document.querySelectorAll('.main-link');
    const content = document.getElementById('content');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
  
    // Debugging: Check if elements are selected correctly
    console.log(navLinks, mainLinks, content, navMenu, menuIcon, closeIcon);
  
    // Function to load content dynamically
    function loadContent(url) {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          // Create a temporary element to hold the fetched content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;
  
          // Extract the <main> content from the fetched HTML
          const newContent = tempDiv.querySelector('main').innerHTML;
  
          // Replace the content of the current <main> element
          content.innerHTML = newContent;
  
          // Hide the menu if on mobile view
          if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
          }
        })
        .catch(error => console.error('Error loading content:', error));
    }
  
    // Add event listeners for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();  // Prevent default link behavior
        const url = this.href;
        loadContent(url);
      });
    });
  
    // Add event listeners for main content links
    mainLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();  // Prevent default link behavior
        const url = this.href;
        loadContent(url);
      });
    });
  
    // Menu toggle for mobile view
    menuIcon.addEventListener('click', function() {
      console.log('Menu icon clicked');
      navMenu.classList.toggle('show');
    });
  
    closeIcon.addEventListener('click', function() {
      console.log('Close icon clicked');
      navMenu.classList.remove('show');
    });
  });
  