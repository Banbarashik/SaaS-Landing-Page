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
