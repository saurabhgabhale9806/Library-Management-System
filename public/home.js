
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

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

  // Dropdown toggle on click
  const dropdown = document.querySelector('.dropdown > a');
  dropdown.addEventListener('click', (e) => {
    e.preventDefault(); // prevent "#" from jumping
    const parentLi = dropdown.parentElement;
    parentLi.classList.toggle('open');
  });
