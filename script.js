let currentIndex = 0; // Current slide index
const slides = document.querySelectorAll('.slide');
const sliderTrack = document.querySelector('.slider-track');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Clone first and last few slides for seamless looping
const firstSlides = [...slides].slice(0, 3).map(slide => slide.cloneNode(true));
const lastSlides = [...slides].slice(-3).map(slide => slide.cloneNode(true));

// Append cloned slides
firstSlides.forEach(slide => sliderTrack.appendChild(slide));
lastSlides.reverse().forEach(slide => sliderTrack.insertBefore(slide, sliderTrack.firstChild));

// Adjust the track to start at the correct slide
sliderTrack.style.transform = `translateX(-${100 / 3}%)`;

// Update slider with seamless looping
function updateSlider() {
  sliderTrack.style.transition = 'transform 0.5s ease-in-out';
  sliderTrack.style.transform = `translateX(-${(currentIndex + 3) * 33.33}%)`;

  updateDots();

  // Seamless looping logic
  setTimeout(() => {
    if (currentIndex === -1) {
      sliderTrack.style.transition = 'none';
      currentIndex = totalSlides - 1;
      sliderTrack.style.transform = `translateX(-${(currentIndex + 3) * 33.33}%)`;
    } else if (currentIndex === totalSlides) {
      sliderTrack.style.transition = 'none';
      currentIndex = 0;
      sliderTrack.style.transform = `translateX(-${(currentIndex + 3) * 33.33}%)`;
    }
  }, 500);
}

// Function to update dots
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Move slides with direction (1 for next, -1 for previous)
function moveSlide(direction) {
  currentIndex += direction;
  updateSlider();
}

// Set slide directly
function setSlide(index) {
  currentIndex = index;
  updateSlider();
}

// Select the elements
const certificate = document.getElementById('certificate');
const certificate2 = document.getElementById('certificate2');

// Function to apply the rotation effect
function rotateCard(event, element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;

  const rotateX = (deltaY / height) * 20;  // Adjust the intensity of the rotation (up-down movement)
  const rotateY = (deltaX / width) * 20;  // Adjust the intensity of the rotation (left-right movement)

  // Apply the rotation to the element
  element.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
}

// Add event listeners for mouse movement on the certificates
document.querySelector('.contact-right').addEventListener('mousemove', (e) => {
  rotateCard(e, certificate);
  rotateCard(e, certificate2);
});

// Reset the transformation when mouse leaves
document.querySelector('.contact-right').addEventListener('mouseleave', () => {
  certificate.style.transform = 'rotateX(0deg) rotateY(0deg)';
  certificate2.style.transform = 'rotateX(0deg) rotateY(0deg)';
});