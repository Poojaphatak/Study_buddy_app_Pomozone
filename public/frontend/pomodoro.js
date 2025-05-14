const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 30 * 60; 
const MODES = {
  pomodoro: 30 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchMode(mode) {
  clearInterval(timer);
  isRunning = false;
  startStopBtn.textContent = 'Start';
  currentMode = mode;
  timeLeft = MODES[mode];
  updateTimeDisplay();

  modeButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector([data-mode=="${mode}"]).classList.add('active');
}

function startTimer() {
  if (isRunning) {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    isRunning = false;
    return;
  }

  isRunning = true;
  startStopBtn.textContent = 'Pause';

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimeDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
      isRunning = false;
      startStopBtn.textContent = 'Start';
    }
  }, 1000);
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', () => {
  switchMode(currentMode);
});

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchMode(btn.dataset.mode);
  });
});

updateTimeDisplay();
