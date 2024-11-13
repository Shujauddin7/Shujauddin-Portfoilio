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

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          
          // Get the target section ID from the link's href attribute
          const targetId = link.getAttribute('href').substring(1); // Remove the '#' from href
          const targetSection = document.getElementById(targetId);
          
          // Scroll to the target section with smooth animation
          window.scrollTo({
              top: targetSection.offsetTop - 50, // Adjust for fixed navbar height
              behavior: 'smooth'
          });
      });
  });

  // Add event listener for the scroll event to highlight active links
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

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();  // Prevent the default form submission
  const emailParams = {
    from_name: formData.get('from_name'),
    email_id: formData.get('email_id'),
    message: formData.get('message')
};


  const formData = new FormData(this);  // Collect the form data
  
  // Send the form data using Fetch API (AJAX)
  fetch('process-form.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())  // Expect JSON response from the server
  .then(data => {
      // Show success message if form is submitted successfully
      if (data.success) {
          document.getElementById('form-message').innerText = 'Message sent successfully!';
          document.getElementById('form-message').style.color = 'green';
      } else {
          document.getElementById('form-message').innerText = 'There was an error sending your message. Please try again.';
          document.getElementById('form-message').style.color = 'red';
      }
  })
  .catch(error => {
      // Handle errors if AJAX fails
      document.getElementById('form-message').innerText = 'An error occurred. Please try again later.';
      document.getElementById('form-message').style.color = 'red';
  });
});
emailjs.init('M36ZVEs87P17_TZLG');

