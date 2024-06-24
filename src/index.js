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

// TODO make the following function universal so it can be easliy used with any '.carousel' block
//* CAROUSEL *//
const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.arrow-button--left');
const rightArrow = document.querySelector('.arrow-button--right');

//* IMPORTANT: live representation of the DOM
const testimonials = carousel.children;

// const imageWidth = images[1].getBoundingClientRect().x;
const slideWidth = 406;

leftArrow.addEventListener('click', (e) => {
  const btn = e.target;
  const lastSlide = testimonials[testimonials.length - 1];
  const lastSlideClone = lastSlide.cloneNode(true);

  // Prevent the button from being clicked for the duration of the transition
  btn.disabled = true;

  // Move Carousel to the left by one slide (it's the position where the transition begins from)
  // and insert the last slide at the beginning of Carousel's DOM
  carousel.style.transform = `translateX(-${slideWidth}px)`;
  carousel.insertBefore(
    testimonials[testimonials.length - 1],
    carousel.firstChild
  );

  // Insert a copy of the last slide at the end of the Carousel's DOM.
  // This is necessary when the number of visible slides = the total number of slides,
  // to create the effect of a slide moving behind the end of the Carousel and simultaneously appearing
  // at its beggining. Otherwise, there would be an empty area at the end of the Carousel while
  // the transition is happening
  carousel.appendChild(lastSlideClone);

  setTimeout(() => {
    carousel.classList.add('carousel--transition');
    carousel.style.transform = '';
  }, 0);

  setTimeout(() => {
    btn.disabled = false;

    // Remove the copy of the last slide because the transition has ended, and it is no longer needed
    lastSlideClone.remove();

    carousel.classList.remove('carousel--transition');
  }, 500);
});

rightArrow.addEventListener('click', (e) => {
  const btn = e.target;
  const firstSlide = testimonials[0];
  const firstSlideClone = firstSlide.cloneNode(true);

  // Prevent the button from being clicked for the duration of the transition
  btn.disabled = true;

  // Start transition
  carousel.classList.add('carousel--transition');

  // Move Carousel to the left by one slide (it's the position where the transition begins from)
  // and insert the first slide at the end of carousel's DOM
  carousel.style.transform = `translateX(-${slideWidth}px)`;

  // Insert a copy of the first slide at the beggining of the Carousel's DOM.
  // This is necessary when the number of visible slides = the total number of slides,
  // to create the effect of a slide moving behind the beggining of the Carousel and simultaneously appearing
  // at its end. Otherwise, there would be an empty area at the beggining of the Carousel while
  // the transition is happening
  carousel.appendChild(firstSlideClone);

  setTimeout(() => {
    btn.disabled = false;

    // Remove the first slide because the transition has ended, and it is no longer needed
    firstSlide.remove();

    carousel.classList.remove('carousel--transition');
    carousel.style.transform = '';
  }, 500);
});
