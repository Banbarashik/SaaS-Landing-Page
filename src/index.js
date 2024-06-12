import './sass/main.scss';

const toggleSwitch = document.querySelector('.toggle-switch');

toggleSwitch.addEventListener('click', function (e) {
  e.target.classList.toggle('toggle-switch--right');
});
