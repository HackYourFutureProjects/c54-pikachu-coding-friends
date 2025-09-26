export function timerController({
  duration = 30,
  circle,
  text,
  circumference,
  onTimeout,
} = {}) {
  let timeLeft = duration;
  let intervalId = null;

  function setProgress(percent) {
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = String(offset);
  }

  function start() {
    intervalId = setInterval(() => {
      timeLeft--;
      text.textContent = String(timeLeft);
      setProgress(timeLeft / duration);

      if (timeLeft <= 10) {
        circle.classList.add('red');
        document.body.classList.add('screen-pulse');
      }

      if (timeLeft <= 0) {
        stop();
        document.body.classList.remove('screen-pulse');
        if (typeof onTimeout === 'function') {
          onTimeout();
        }
      }
    }, 1000);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
    document.body.classList.remove('screen-pulse');
  }

  function reset() {
    stop();
    timeLeft = duration;
    text.textContent = timeLeft;
    setProgress(1);
    circle.classList.remove('red');
    document.body.classList.remove('screen-pulse');
    start();
  }

  start();

  return { stop, reset };
}
