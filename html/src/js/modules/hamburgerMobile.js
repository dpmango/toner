'use strict';

// what it's for
// toggle mobile hamburger and menu

const moduleName = 'hamburgerMobile';

module.exports = function () {

  Array.from(document.querySelectorAll('.hamburger')).forEach((self) => {
    if (self.dataset[moduleName + 'Init']) return;
    self.dataset[moduleName + 'Init'] = true;
  });

  // declare variables
  const body = document.querySelector('body');
  const hamburger = document.querySelector('[js-open-menu]');
  const hamburgerClose = document.querySelector('[js-close-menu]');
  const mobileMenu = document.querySelector('[js-mobile-menu]');

  const toggleClass = function(el, cl) {
    el.classList.toggle(cl)
    // this.style.display = (el.style.display == 'none') ? 'block' : 'none'
  }

  // even listener
  hamburger.addEventListener('click', (event) => {
    if (!mobileMenu) { return; }

    toggleClass(hamburger, 'is-active');
    toggleClass(mobileMenu, 'active');
    toggleClass(body, 'locked');

    event.preventDefault();
    event.stopPropagation();
  });

  hamburgerClose.addEventListener('click', (event) => {
    if (!mobileMenu) { return; }

    toggleClass(hamburger, 'is-active');
    toggleClass(mobileMenu, 'active');
    toggleClass(body, 'locked');
  });

};
