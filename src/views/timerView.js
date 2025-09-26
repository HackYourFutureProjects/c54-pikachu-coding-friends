export function timerView() {
  const timerDiv = document.createElement('div');
  timerDiv.className = 'timer-wrapper';

  timerDiv.innerHTML = `
        <svg class="timer" viewBox="0 0 100 100">
            <circle class="timer-bg" cx="50" cy="50" r="45"></circle>
            <circle class="timer-progress" cx="50" cy="50" r="45"></circle>
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="timer-text">30</text>
        </svg>
    `;

  const circle = timerDiv.querySelector('.timer-progress');
  const text = timerDiv.querySelector('.timer-text');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = String(0);

  return {
    timerDiv,
    circle,
    text,
    circumference,
  };
}
