import './sass/main.scss';
import SuccessImageUp from './img/success_story--up.svg';
import SuccessImageDown from './img/success_story--down.svg';

const CAROUSEL_TRANSITION_TIME = 500;

const hamburgerButton = document.querySelector('.nav__hamburger-button');
const navMain = document.querySelector('.nav__main');

document.addEventListener('click', function (e) {
  if (e.target === hamburgerButton) navMain.classList.toggle('nav__main--open');
  else if (!e.target.closest('.nav__main')) {
    navMain.classList.remove('nav__main--open');
  }
});

const toggleWithButtons = document.querySelector('.toggle-with-buttons');

toggleWithButtons.addEventListener('input', function (e) {
  const toggle = e.currentTarget;
  const [label] = e.target.labels;

  toggle
    .querySelectorAll('.toggle-button')
    .forEach((button) => button.classList.remove('toggle-button--active'));

  label.classList.add('toggle-button--active');
});

const toggleButtonWith = document.getElementById('with');
const toggleButtonWithout = document.getElementById('without');
const advantagesHeading = document.querySelector('.advantages__heading');
const advantagesList = document.querySelector('.advantages__list');
const advantagesImage = document.querySelector('.success-stories__image');

toggleButtonWith.addEventListener('change', function () {
  advantagesHeading.textContent =
    'Track Business Expenses until its Milisecond';

  advantagesList.innerHTML = `
    <li class="advantages__list-item">
      Analyze your business cost easily with group transaction through
      tagging feature.
    </li>
    <li class="advantages__list-item">
      Add more than one card for payment. Integrated with more than
      50+ payment method and support bulk payment.
    </li>
    <li class="advantages__list-item">
      Arrange your business expenses by date, name, etc., with just
      one click.
    </li>`;

  advantagesImage.src = SuccessImageUp;
  advantagesImage.alt = 'Positive balance change graph';
});

toggleButtonWithout.addEventListener('change', function () {
  advantagesHeading.textContent =
    'Taking too long to tidy up administrative files makes it unproductive';

  advantagesList.innerHTML = `
    <li class="advantages__list-item advantages__list-item--disadvantage">
      Complex recording process due to every administrative file in a different place.
    </li>
    <li class="advantages__list-item advantages__list-item--disadvantage">
      Need more effort to pay manually one by one invoice because there is no payment accommodation.
    </li>
    <li class="advantages__list-item advantages__list-item--disadvantage">
      Manual data arranging needs a long time because the different months/years are not in the same place.
    </li>`;

  advantagesImage.src = SuccessImageDown;
  advantagesImage.alt = 'Negative balance change graph';
});

const toggleSwitch = document.querySelector('.toggle-switch');
const toggleMonthly = document.querySelector('#monthly');
const toggleYearly = document.querySelector('#yearly');
const prices = document.querySelectorAll('.pricing-plan__amount');
const periods = document.querySelectorAll('.pricing-plan__period');

toggleSwitch.addEventListener('click', function (e) {
  e.target.classList.toggle('toggle-switch--right');

  // Implement the radio button type interaction in JS
  if (toggleMonthly.checked) {
    toggleMonthly.checked = false;
    toggleYearly.checked = true;
  } else if (toggleYearly.checked) {
    toggleYearly.checked = false;
    toggleMonthly.checked = true;
  }

  periods.forEach(
    (period) =>
      (period.textContent = toggleMonthly.checked ? '/month' : '/year')
  );

  prices.forEach((price) => {
    const numRegExp = /\d+/;
    const priceNum = parseInt(numRegExp.exec(price.textContent)[0], 10);

    price.textContent =
      '$' +
      (toggleYearly.checked
        ? Math.round(priceNum * 0.35 * 12)
        : Math.round(priceNum / 0.35 / 12));
  });
});

// TODO make the following function universal so it can be easliy used with any '.carousel' block
//* CAROUSEL *//
const carousel = document.querySelector('.carousel');
const carouselButtonLeft = document.querySelector('.carousel-button--left');
const carouselButtonRight = document.querySelector('.carousel-button--right');

//* IMPORTANT: live representation of the DOM
const testimonials = carousel.children;

const { gap } = getComputedStyle(carousel);
const slideWidth = testimonials[0].offsetWidth + parseInt(gap, 10);

carouselButtonLeft.addEventListener('click', function (e) {
  const btn = e.target.closest('.carousel-button');
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

  setTimeout(function () {
    carousel.classList.add('carousel--transition');
    carousel.style.transform = '';
  }, 0);

  setTimeout(function () {
    btn.disabled = false;

    // Remove the copy of the last slide because the transition has ended, and it is no longer needed
    lastSlideClone.remove();

    carousel.classList.remove('carousel--transition');
  }, CAROUSEL_TRANSITION_TIME);
});

carouselButtonRight.addEventListener('click', function (e) {
  const btn = e.target.closest('.carousel-button');
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

  setTimeout(function () {
    btn.disabled = false;

    // Remove the first slide because the transition has ended, and it is no longer needed
    firstSlide.remove();

    carousel.classList.remove('carousel--transition');
    carousel.style.transform = '';
  }, CAROUSEL_TRANSITION_TIME);
});
