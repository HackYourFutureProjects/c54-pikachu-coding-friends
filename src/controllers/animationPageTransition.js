export function animatePageTransition(pageWrapper, callback) {
  pageWrapper.classList.add('slide-out');

  setTimeout(() => {
    callback();
    pageWrapper.classList.add('slide-in');
    setTimeout(() => {
      pageWrapper.classList.remove('slide-in');
      pageWrapper.classList.add('slide-in-active');
    }, 50);

    setTimeout(() => {
      pageWrapper.classList.remove('slide-in-active', 'slide-out');
    }, 400);
  }, 400);
}
