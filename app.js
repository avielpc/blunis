/* ==========================================
   BLUNIS Bot Guide - Front-End Logic
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  bindAnimateOnScroll();
  initNavigation();
  document.getElementById("year").textContent = new Date().getFullYear();
});

// === Theme (Light default, toggle to Dark) ===
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("blunis-theme");
  if (saved === "dark") {
    root.classList.remove("light");
  }
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const isLight = root.classList.contains("light");
    if (isLight) root.classList.remove("light"); else root.classList.add("light");
    localStorage.setItem("blunis-theme", isLight ? "dark" : "light");
  });
}

// === Animate on scroll ===
function bindAnimateOnScroll() {
  const els = document.querySelectorAll("[data-animate]");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// === Navigation ===
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Smooth scroll and active state
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // If it's a hash link on the same page, handle smooth scroll
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else if (href.includes("#")) {
        // Link to another page with hash - let it navigate normally
        // Close mobile menu
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          menuToggle.classList.remove("active");
        }
        return; // Let browser handle navigation
      }

      // Close mobile menu
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });

  // Update active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Handle home section
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove("active"));
        homeLink.classList.add("active");
      }
    });
  }
}
