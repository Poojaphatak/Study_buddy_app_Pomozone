// const timeDisplay = document.getElementById('time');
// const startStopBtn = document.getElementById('startStop');
// const resetBtn = document.getElementById('reset');
// const modeButtons = document.querySelectorAll('.mode');

// let timer;
// let isRunning = false;
// let currentMode = 'pomodoro';
// let timeLeft = 30 * 60; 
// const MODES = {
//   pomodoro: 30 * 60,
//   short: 5 * 60,
//   long: 15 * 60,
// };

// function updateTimeDisplay() {
//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// }

// function switchMode(mode) {
//   clearInterval(timer);
//   isRunning = false;
//   startStopBtn.textContent = 'Start';
//   currentMode = mode;
//   timeLeft = MODES[mode];
//   updateTimeDisplay();

//   modeButtons.forEach(btn => btn.classList.remove('active'));
//   document.querySelector([data-mode=="${mode}"]).classList.add('active');
// }

// function startTimer() {
//   if (isRunning) {
//     clearInterval(timer);
//     startStopBtn.textContent = 'Start';
//     isRunning = false;
//     return;
//   }

//   isRunning = true;
//   startStopBtn.textContent = 'Pause';

//   timer = setInterval(async () => {
//     if (timeLeft > 0) {
//       timeLeft--;
//       updateTimeDisplay();
//     } else {
//       clearInterval(timer);
//       alert("Time's up!");
      
//       isRunning = false;
//       startStopBtn.textContent = 'Start';
//     }
//   }, 1000);
// }

// startStopBtn.addEventListener('click', startTimer);
// resetBtn.addEventListener('click', () => {
//   switchMode(currentMode);
// });

// modeButtons.forEach(btn => {
//   btn.addEventListener('click', () => {
//     switchMode(btn.dataset.mode);
//   });
// });

// updateTimeDisplay();
let timer;
let isRunning = false;
let timeLeft = 1800; // 30 minutes in seconds
let currentMode = 'pomodoro';
const startStopBtn = document.getElementById("startStop");
const timerDisplay = document.getElementById("timer");
const minutesLogged=0;
const userId = localStorage.getItem("userId");


function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchMode(mode) {
  currentMode = mode;
  if (mode === 'pomodoro') {
    timeLeft = 1800; // 30 minutes
  } else if (mode === 'shortBreak') {
    timeLeft = 300; // 5 minutes
  } else if (mode === 'longBreak') {
    timeLeft = 900; // 15 minutes
  }
  updateTimerDisplay();
}

startStopBtn.addEventListener("click", async function () {
  if (!isRunning) {
    isRunning = true;
    startStopBtn.textContent = 'Pause';

    timer = setInterval(async () => {
      timeLeft--;
      if((1800-timeLeft/60)>minutesLogged){
        minutesLogged++;
        
        if (currentMode === 'pomodoro') {
          // Send backend update for focus tracking
          try {
            const response = await fetch(`/progress/${userId}/focus`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ minutes: 30 }) // Or calculate real elapsed time
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            console.log("Focus time updated!");
          } catch (error) {
            console.error("Failed to update focus time:", error);
          }
        }
      }
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up!");


        isRunning = false;
        startStopBtn.textContent = 'Start';
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
  }
});

// Initialize display
updateTimerDisplay();
