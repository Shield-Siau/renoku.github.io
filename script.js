const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
} )

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints:{
    0:{
        slidesPerView: 1
    },
    768:{
        slidesPerView: 2
    },
    1024:{
        slidesPerView: 3
    }
  }
});

// Smooth scroll function with varying duration
function smoothScroll(targetId) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // Get the current scroll position
  const startPosition = window.pageYOffset;
  // Get the target position
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
  // Calculate the distance to scroll
  const distance = targetPosition - startPosition;
  
  // Calculate duration based on distance (absolute value)
  const baseDuration = 300; // 0.3s for minimal distance
  const duration = Math.min(baseDuration + Math.abs(distance) * 0.3, 1500); // Max 1.5s
  
  // Animation timing
  const startTime = performance.now();
  
  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOut = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startPosition + distance * easeInOut);
    
    if (elapsedTime < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  requestAnimationFrame(scrollAnimation);
}

// Update nav link click handlers to use smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    smoothScroll(targetId);
    menuOpenButton.click(); // Close mobile menu if open
  });
});

// Update existing menu close behavior to prevent default
menuCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  menuOpenButton.click();
});