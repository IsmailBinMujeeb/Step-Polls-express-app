document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
  
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('show');
    });
  });
  