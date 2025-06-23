const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const dropdown = document.querySelector('.dropdown > a');
const dropdownMenu = document.querySelector('.dropdown-menu');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navbar.classList.remove('active');
    }
  });
});

dropdown.addEventListener('click', (e) => {
  e.preventDefault();
  dropdownMenu.classList.toggle('active');
});