var navMain = document.querySelector('.main-nav');
var navBtnOpen = document.querySelector('.main-nav__btn-open');
var navBtnClose = document.querySelector('.main-nav__btn-close');

navMain.classList.remove('main-nav--nojs');

navBtnOpen.addEventListener('click', function() {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
});

navBtnClose.addEventListener('click', function() {
  navMain.classList.remove('main-nav--opened');
  navMain.classList.add('main-nav--closed');
});
