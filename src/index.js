import './sass/main.scss';

const toggleWithButtons = document.querySelector('.toggle-with-buttons');
const toggleSwitch = document.querySelector('.toggle-switch');

toggleWithButtons.addEventListener('input', function (e) {
  const toggle = e.currentTarget;
  const [label] = e.target.labels;

  toggle
    .querySelectorAll('.toggle-button')
    .forEach((button) => button.classList.remove('toggle-button--active'));

  label.classList.add('toggle-button--active');
});

toggleSwitch.addEventListener('click', function (e) {
  e.target.classList.toggle('toggle-switch--right');
});

//* CAROUSEL *//
const carousel = document.querySelector('.carousel');

const leftArrow = document.querySelector('.arrow-button--left');
const rightArrow = document.querySelector('.arrow-button--right');

let currentIndex = 0;
let prevIndex;
// const testimonials = carousel.querySelectorAll('.testimonial');
const testimonials = carousel.children;

const totalTestimonials = Object.keys(testimonials).length;

// const imageWidth = images[1].getBoundingClientRect().x;
const imageWidth = 406;

leftArrow.addEventListener('click', () => {
  prevIndex = currentIndex;
  currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;

  // Move Carousel to the left by one image, and insert the image at currentIndex at the beginning of carousel's DOM
  carousel.style.transform = `translateX(-${imageWidth}px)`;
  carousel.insertBefore(
    testimonials[totalTestimonials - 1],
    carousel.firstChild
  );

  // Now, let's start the transition effect, from -520 px to 0 px.
  setTimeout(() => {
    carousel.style.transform = '';
    carousel.classList.add('carousel--transition');
  }, 10);

  setTimeout(() => {
    // By removing the transition class, we ensure that the transition only occurs when we want it to and that we have full control over the carousel's movement.
    carousel.classList.remove('carousel--transition');
  }, 490);
});

rightArrow.addEventListener('click', (e) => {
  const btn = e.target;
  const prevSlide = testimonials[0].cloneNode(true);

  btn.disabled = true;

  carousel.classList.add('carousel--transition');
  carousel.style.transform = `translateX(-${imageWidth}px)`;
  carousel.appendChild(prevSlide);

  setTimeout(() => {
    btn.disabled = false;

    testimonials[0].remove();

    carousel.classList.remove('carousel--transition');
    carousel.style.transform = '';
  }, 500);
});
//! Doesn't work correctly if the number of shown slides = the number of all slides
//* Need to think of a workaround, for example, clone the element and then delete it 500ms later
//* Or take the approach that was advised by AI and add the first (and the last?) testimonials
//* to create an illusion of circular movement

//! Problem: stops to delete slides after 1 full loop through the slides
//! Problem: when the user clicks the button more often than 500ms there's a bug
//! the previous slide is duplicated and also the original of the privous slide remains
//* Solution 1: prevent the button from being clicked more than once in 500ms
