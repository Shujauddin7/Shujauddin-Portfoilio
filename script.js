document.addEventListener('DOMContentLoaded', function () {
  // Select all sections and nav links
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Set up Intersection Observer to track sections and update active nav links
  const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
          // Check if the section is in view
          if (entry.isIntersecting) {
              // Remove the 'active' class from all nav links
              navLinks.forEach(link => {
                  link.classList.remove('active');
              });
              // Add 'active' class to the nav link corresponding to the visible section
              const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          }
      });
  }, { threshold: 0.5 }); // Intersection threshold at 50% visibility

  // Start observing each section for intersection
  sections.forEach(section => observer.observe(section));

  // Manual scroll for navigation links (removes smooth scrolling)
  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          
          // Get the target section ID from the link's href attribute
          const targetId = link.getAttribute('href').substring(1); // Remove the '#' from href
          const targetSection = document.getElementById(targetId);
          
          // Scroll to the target section manually (no smooth scroll)
          window.scrollTo({
              top: targetSection.offsetTop - 50, // Adjust for fixed navbar height
              behavior: 'auto' // No smooth scroll
          });
      });
  });
  
  // Optionally, you can still listen for manual scroll events to highlight active links:
  window.addEventListener('scroll', function () {
      let currentPosition = window.scrollY;

      // Check each section's position on the screen and highlight the correct link
      sections.forEach(section => {
          if (currentPosition >= section.offsetTop - 50 && currentPosition < section.offsetTop + section.offsetHeight - 50) {
              const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
              // Remove 'active' class from all links
              navLinks.forEach(link => link.classList.remove('active'));
              // Add 'active' class to the link corresponding to the section
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          }
      });
  });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;

  // Send form data using EmailJS
  emailjs.sendForm('service_xxxxx', 'template_xxxxx', form, 'user_id')
      .then(function(response) {
          document.getElementById('success-message').style.display = 'block';
          document.getElementById('error-message').style.display = 'none';
      }, function(error) {
          document.getElementById('error-message').style.display = 'block';
          document.getElementById('success-message').style.display = 'none';
      });
});