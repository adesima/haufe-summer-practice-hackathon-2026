/**
 * Load the navbar component and inject it into the page
 * Also highlights the active link based on current URL
 */
function loadNavbar() {
  const navContainer = document.getElementById('navbar-container');
  
  if (!navContainer) {
    console.warn('No element with id="navbar-container" found on this page');
    return;
  }

  // Fetch the navbar HTML
  fetch('./components/navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load navbar');
      }
      return response.text();
    })
    .then(html => {
      // Inject the navbar HTML
      navContainer.innerHTML = html;

      // Highlight the active link based on current page
      highlightActiveLink();

      // Add event listeners for hover and click effects
      attachNavbarListeners();
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      navContainer.innerHTML = '<p>Failed to load navigation</p>';
    });
}

/**
 * Highlight the active link based on the current page URL
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    // Get the href attribute
    const href = link.getAttribute('href');
    
    // Check if current path contains the link's href
    if (currentPath.includes(href)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Attach event listeners to navbar links for better UX
 */
function attachNavbarListeners() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
}

// Load navbar when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
});
