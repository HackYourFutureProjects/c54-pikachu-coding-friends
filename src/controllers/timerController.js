/**
 * @param {Object} params
 * @param {number} [params.duration=30]
 * @param {SVGCircleElement} params.circle
 * @param {HTMLElement} params.text
 * @param {number} params.circumference
 * @param {Function} params.onTimeout
 * @returns {{ stop: Function, reset: Function }}
 *   An API to control the timer:
 *   - `start()` — begins or resumes the countdown.
 *   - `stop()` — pauses the countdown.
 *   - `reset()` — resets the countdown to the initial `duration`.
 */

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
      }

      if (timeLeft <= 0) {
        stop();
        if (typeof onTimeout === 'function') {
          onTimeout();
        }
      }
    }, 1000);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function reset() {
    stop();
    timeLeft = duration;
    text.textContent = timeLeft;
    setProgress(1);
    circle.classList.remove('red');
    start();
  }

  start();

  return { stop, reset };
}
