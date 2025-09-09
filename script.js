// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".service-card, .audience-card, .additional-item, .feature"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// WhatsApp click tracking
function trackWhatsAppClick(source) {
  // You can integrate with Google Analytics or other tracking tools here
  console.log(`WhatsApp clicked from: ${source}`);

  // Example: Send to Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: source,
    });
  }
}

// Add click tracking to WhatsApp buttons
document.addEventListener("DOMContentLoaded", function () {
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const source = this.textContent.trim() || "unknown";
      trackWhatsAppClick(source);
    });
  });
});

// Form validation (if you add forms later)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      input.style.borderColor = "#d1d5db";
    }
  });

  return isValid;
}

// Price calculator (optional feature)
function calculatePrice(package, extras = []) {
  const basePrices = {
    visual: 190,
    complete: 690,
  };

  const extraPrices = {
    photos: 10,
    logo: 40,
    social: 60,
  };

  let total = basePrices[package] || 0;

  extras.forEach((extra) => {
    total += extraPrices[extra] || 0;
  });

  return total;
}

// Lazy loading for images (if you add real images later)
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Service card hover effects
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = counter.textContent;
    const isNumber = !isNaN(parseInt(target));

    if (isNumber) {
      const finalNumber = parseInt(target);
      let currentNumber = 0;
      const increment = finalNumber / 50;

      const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(currentNumber);
        }
      }, 30);
    }
  });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
});

// Add loading state to buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.textContent;
  button.textContent = text;
  button.disabled = true;
  button.style.opacity = "0.7";

  return function removeLoadingState() {
    button.textContent = originalText;
    button.disabled = false;
    button.style.opacity = "1";
  };
}

// Handle service package selection
function selectPackage(packageName) {
  const packages = {
    visual: "Visual Identity",
    complete: "Complete Solution",
  };

  const message = `Hello! I would like to know more about the ${packages[packageName]} package.`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
}

// Add package selection handlers
document.addEventListener("DOMContentLoaded", function () {
  const serviceButtons = document.querySelectorAll(".btn-service");

  serviceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add loading state
      const removeLoading = addLoadingState(this, "Redirecting...");

      // Simulate loading and redirect
      setTimeout(() => {
        removeLoading();
        window.open(this.href, "_blank");
      }, 500);
    });
  });
});

// Scroll to top functionality
function createScrollToTopButton() {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(button);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
    }
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Your scroll handling code here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
