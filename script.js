// Optional: Add some smooth scroll functionality
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

// Highlight Active Link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});
// JavaScript for highlighting active link and animating the section
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");
  
  window.addEventListener("scroll", () => {
      let currentSection = "";
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= sectionTop - sectionHeight / 3) {
              currentSection = section.getAttribute("id");
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove("active"); // Remove active class from all links
          if (link.getAttribute("href").includes(currentSection)) {
              link.classList.add("active"); // Add active class to the current page
          }
      });
  });
});


