


// Slider JavaScript
const slides = document.querySelector('.slides');
const slideCards = document.querySelectorAll('.book-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;
let slidesToShow = 4;
let autoSlideInterval;

function updateSlidesToShow() {
  if (window.innerWidth <= 480) {
    slidesToShow = 1;
  } else if (window.innerWidth <= 768) {
    slidesToShow = 2;
  } else {
    slidesToShow = 4;
  }
}

function createDots() {
  dotsContainer.innerHTML = '';
  const totalSlides = Math.ceil(slideCards.length / slidesToShow);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
      stopAutoSlide();
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  const slideWidth = slideCards[0].offsetWidth;
  slides.style.transform = `translateX(-${currentIndex * slideWidth * slidesToShow}px)`;
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % Math.ceil(slideCards.length / slidesToShow);
    updateSlider();
  }, 5000); // Adjust this value (in milliseconds) to change slide speed
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Button navigation
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = (currentIndex + 1) % Math.ceil(slideCards.length / slidesToShow);
  updateSlider();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = (currentIndex - 1 + Math.ceil(slideCards.length / slidesToShow)) % Math.ceil(slideCards.length / slidesToShow);
  updateSlider();
  startAutoSlide();
});

// Initialize slider
updateSlidesToShow();
createDots();
startAutoSlide();

// Handle window resize
window.addEventListener('resize', () => {
  updateSlidesToShow();
  createDots();
  updateSlider();
});

// Pause auto-slide on hover, resume on leave
slides.addEventListener('mouseenter', stopAutoSlide);
slides.addEventListener('mouseleave', startAutoSlide);