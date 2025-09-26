export function timerController({
  duration = 30,
  circle,
  text,
  circumference,
  onTimeout,
} = {}) {
  let timeLeft = duration;
  function setProgress(percent) {
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = String(offset);
  }

  function startTimer() {
    const interval = setInterval(() => {
      timeLeft--;
      text.textContent = String(timeLeft);
      setProgress(timeLeft / duration);
      if (timeLeft <= 10) {
        circle.classList.add('red');
        document.body.classList.add('screen-pulse');
      }

      if (timeLeft <= 0) {
        clearInterval(interval);
        document.body.classList.remove('screen-pulse');
        if (typeof onTimeout === 'function') {
          onTimeout();
        }
      }
    }, 1000);
  }

  startTimer();
}
