const btn1_ctn = document.getElementsByClassName('btn1_container')[0];
const one = document.querySelector('.fas');

btn1_ctn.addEventListener('click', () => {
  // Toggle classes for the moon icon, active state, and background change
  one.classList.toggle('fa-circle');
  one.classList.toggle('fa-moon');
  one.classList.toggle('active1');
  btn1_ctn.classList.toggle('changeBg');

  // Toggle background color of the body
  document.body.classList.toggle('dark-mode');
});