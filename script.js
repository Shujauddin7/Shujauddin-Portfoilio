document.addEventListener("DOMContentLoaded", function () {
  // Create particle system
  createParticleSystem();

  // Add 3D tilt effect to sections
  add3DTiltEffect();

  // Select all sections and nav links
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Set up Intersection Observer to track sections and update active nav links
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        // Check if the section is in view
        if (entry.isIntersecting) {
          // Remove the 'active' class from all nav links
          navLinks.forEach((link) => {
            link.classList.remove("active");
          });
          // Add 'active' class to the nav link corresponding to the visible section
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.5 }
  ); // Intersection threshold at 50% visibility

  // Start observing each section for intersection
  sections.forEach((section) => observer.observe(section));

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Get the target section ID from the link's href attribute
      const targetId = link.getAttribute("href").substring(1); // Remove the '#' from href
      const targetSection = document.getElementById(targetId);

      // Scroll to the target section with smooth animation
      window.scrollTo({
        top: targetSection.offsetTop - 50, // Adjust for fixed navbar height
        behavior: "smooth",
      });
    });
  });

  // Add event listener for the scroll event to highlight active links
  window.addEventListener("scroll", function () {
    let currentPosition = window.scrollY;

    // Check each section's position on the screen and highlight the correct link
    sections.forEach((section) => {
      if (
        currentPosition >= section.offsetTop - 50 &&
        currentPosition < section.offsetTop + section.offsetHeight - 50
      ) {
        const activeLink = document.querySelector(
          `.nav-link[href="#${section.id}"]`
        );
        // Remove 'active' class from all links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add 'active' class to the link corresponding to the section
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    const emailParams = {
      from_name: formData.get("from_name"),
      email_id: formData.get("email_id"),
      message: formData.get("message"),
    };

    const formData = new FormData(this); // Collect the form data

    // Send the form data using Fetch API (AJAX)
    fetch("process-form.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response from the server
      .then((data) => {
        // Show success message if form is submitted successfully
        if (data.success) {
          document.getElementById("form-message").innerText =
            "Message sent successfully!";
          document.getElementById("form-message").style.color = "green";
        } else {
          document.getElementById("form-message").innerText =
            "There was an error sending your message. Please try again.";
          document.getElementById("form-message").style.color = "red";
        }
      })
      .catch((error) => {
        // Handle errors if AJAX fails
        document.getElementById("form-message").innerText =
          "An error occurred. Please try again later.";
        document.getElementById("form-message").style.color = "red";
      });
  });
emailjs.init("M36ZVEs87P17_TZLG");

// Particle System
function createParticleSystem() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random positioning and animation delay
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";

    // Random size variation
    const size = Math.random() * 3 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particlesContainer.appendChild(particle);
  }
}

// 3D Tilt Effect for Interactive Elements
function add3DTiltEffect() {
  const tiltElements = document.querySelectorAll(
    ".skill-card, .project-card, .contact-item"
  );

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });
}

// Smooth reveal animation for sections
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform =
          "perspective(1200px) rotateX(0deg) translateY(0px)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform =
      "perspective(1200px) rotateX(15deg) translateY(50px)";
    section.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(section);
  });
}

// Enhanced typing effect with cursor
function enhanceTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = "";
    typingElement.style.borderRight = "2px solid gold";
    typingElement.style.animation = "none";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Blinking cursor effect
        setInterval(() => {
          typingElement.style.borderRight =
            typingElement.style.borderRight === "2px solid gold"
              ? "2px solid transparent"
              : "2px solid gold";
        }, 500);
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

// Initialize all enhancements
document.addEventListener("DOMContentLoaded", function () {
  addScrollAnimations();
  enhanceTypingEffect();
});

// Add parallax effect to Spline iframes
function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const splineElements = document.querySelectorAll('iframe[src*="spline"]');

    splineElements.forEach((element, index) => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Initialize parallax effect
addParallaxEffect();

// Add glow effect on hover for buttons and links
document.addEventListener("DOMContentLoaded", function () {
  const glowElements = document.querySelectorAll(
    ".submit-btn, .nav-link, .tech-tag"
  );

  glowElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });
  });
});

// Enhanced 3D Interactive Particle System
function createInteractiveParticles() {
  const particleContainer = document.getElementById("particles");
  if (!particleContainer) return;

  // Create floating 3D orbs
  for (let i = 0; i < 15; i++) {
    const orb = document.createElement("div");
    orb.className = "interactive-orb";
    orb.style.cssText = `
      position: absolute;
      width: ${Math.random() * 20 + 10}px;
      height: ${Math.random() * 20 + 10}px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 215, 0, 0.2));
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float3D ${Math.random() * 10 + 15}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
      filter: blur(${Math.random() * 2}px);
      box-shadow: 0 0 ${Math.random() * 30 + 20}px rgba(255, 215, 0, 0.5);
    `;
    particleContainer.appendChild(orb);
  }
}

// Mouse interaction effects
function initializeMouseEffects() {
  let mouseX = 0,
    mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    // Update floating orbs based on mouse position
    const orbs = document.querySelectorAll(".floating-orb, .interactive-orb");
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.02;
      const x = (mouseX - 0.5) * speed * 100;
      const y = (mouseY - 0.5) * speed * 100;

      orb.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
    });

    // Create trailing particles on mouse move
    if (Math.random() > 0.8) {
      createTrailParticle(e.clientX, e.clientY);
    }
  });
}

// Create trailing particles that follow mouse
function createTrailParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(255, 215, 0, 1), rgba(255, 215, 0, 0));
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    animation: fadeOut 1s ease-out forwards;
  `;

  document.body.appendChild(particle);

  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 1000);
}

// Enhanced scroll animations
function enhanceScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform =
            "perspective(1000px) rotateX(0deg) scale(1)";
          entry.target.style.opacity = "1";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section").forEach((section) => {
    section.style.transform = "perspective(1000px) rotateX(20deg) scale(0.9)";
    section.style.opacity = "0.7";
    section.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(section);
  });
}

// Initialize enhanced effects
enhanceScrollAnimations();

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes float3D {
    0%, 100% { 
      transform: translate3d(0, 0, 0) rotateY(0deg); 
    }
    25% { 
      transform: translate3d(20px, -30px, 10px) rotateY(90deg); 
    }
    50% { 
      transform: translate3d(-15px, -60px, -5px) rotateY(180deg); 
    }
    75% { 
      transform: translate3d(-25px, -30px, 15px) rotateY(270deg); 
    }
  }
  
  @keyframes fadeOut {
    0% { 
      opacity: 1; 
      transform: scale(1); 
    }
    100% { 
      opacity: 0; 
      transform: scale(0) translateY(-20px); 
    }
  }
  
  .interactive-orb:hover {
    transform: scale(1.5) !important;
    filter: brightness(1.5) !important;
  }
`;
document.head.appendChild(style);
