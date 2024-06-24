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

rightArrow.addEventListener('click', () => {
  carousel.classList.add('carousel--transition');

  prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % totalTestimonials;

  carousel.style.transform = `translateX(-${imageWidth}px)`;

  const test = testimonials[0].cloneNode(true);

  carousel.appendChild(test);
  setTimeout(() => {
    // testimonials[prevIndex].remove();
    testimonials[0].remove();
    console.log(prevIndex, testimonials);
    // test.remove();
    // carousel.appendChild(testimonials[prevIndex]);
    carousel.classList.remove('carousel--transition');
    carousel.style.transform = '';
  }, 500);
});
//! Doesn't work correctly if the number of shown slides = the number of all slides
//* Need to think of a workaround, for example, clone the element and then delete it 500ms later
//* Or take the approach that was advised by AI and add the first (and the last?) testimonials
//* to create an illusion of circular movement

//! Problem: stops to delete slides after 1 full loop through the slides
