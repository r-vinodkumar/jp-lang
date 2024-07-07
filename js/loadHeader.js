document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById('header-container');
  
    fetch('header/header.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
  
        // Ensure the menu toggle functionality is available after loading header
        const script = document.createElement('script');
        script.src = 'js/script.js';
        document.body.appendChild(script);
      })
      .catch(error => console.error('Error loading header:', error));
  });
  