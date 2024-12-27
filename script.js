document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevButton = document.querySelector("button.prev");
  const nextButton = document.querySelector("button.next");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;
  const slideDistance = 33.3;

  // Duplicate slides for seamless looping
  const numSlides = slides.length;
  sliderTrack.innerHTML += sliderTrack.innerHTML; // Append duplicate slides
  const allSlides = document.querySelectorAll(".slide"); // Update the slides list

  const updateSlider = () => {
      const offset = -currentSlide * slideDistance;
      sliderTrack.style.transform = `translateX(${offset}%)`;

      // Update active dot
      dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === (currentSlide % numSlides));
      });
  };

  const goToNextSlide = () => {
      currentSlide++;
      if (currentSlide >= allSlides.length / 2) {
          // When reaching the duplicated slides, instantly jump to the first slide (without animation)
          currentSlide = 0;
          sliderTrack.style.transition = ""; // Disable transition
          updateSlider();

          // Re-enable transition after a short delay
          setTimeout(() => {
              sliderTrack.style.transition = ""; // Re-enable transition
          }, 20); // Small delay to allow the browser to register the change
      } else {
          updateSlider();
      }
  };

  const goToPrevSlide = () => {
      currentSlide--;
      if (currentSlide < 0) {
          // When reaching the first slide, go to the last slide (without animation)
          currentSlide = allSlides.length / 2 - 1; // Loop to last slide in duplicated set
          sliderTrack.style.transition = ""; // Disable transition
          updateSlider();

          // Re-enable transition after a short delay
          setTimeout(() => {
              sliderTrack.style.transition = ""; // Re-enable transition
          }, 20); // Small delay
      } else {
          updateSlider();
      }
  };

  // Attach event listeners
  if (prevButton) prevButton.addEventListener("click", goToPrevSlide);
  if (nextButton) nextButton.addEventListener("click", goToNextSlide);
  dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
          currentSlide = index;
          updateSlider();
      });
  });

  // Initialize slider
  updateSlider();
});
