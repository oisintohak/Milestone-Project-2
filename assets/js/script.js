// TIMER ELEMENTS
const timerDisplay = document.querySelector('#t-display');
const timerStart = document.querySelector('#t-start');
const timerPause = document.querySelector('#t-pause');
const timerReset = document.querySelector('#t-reset');
const timerProgress = document.querySelector('#t-progress-time');
const timerProgressBar = document.querySelector('#t-progress-bar');
// SETTINGS ELEMENTS
const workTimeInput = document.querySelector('#work-time');
const restTimeInput = document.querySelector('#rest-time');
const roundsInput = document.querySelector('#rounds');
const extBreakCheckbox = document.querySelector('#ext-break-checkbox');
const extBreakRounds = document.querySelector('#ext-break-rounds');
const extBreakTime = document.querySelector('#ext-break-time');
const updateTimerButton = document.querySelector('#update-timer-button');
const timer = {
  running: false,
  hasStarted: false,
  workTime: 30,
  restTime: 10,
  numRounds: 9,
  extBreak: true,
  extBreakLength: 30,
  extBreakAfter: 3,
  timeElapsedOnPause: 0
};
const settings = {};

function createRounds() {
  timer.rounds = {};
  for (let i = 1; i <= timer.numRounds*2; i ++) {
    timer.rounds[i] = {};
    if (i % 2 === 0) {
      if (timer.extBreak === true && i % timer.extBreakAfter == 0) {
        timer.rounds[i].rest = timer.extBreakLength;
      }
      else {
        timer.rounds[i].rest = timer.restTime;
      }
      // calculate runtime for round:
      timer.rounds[i].roundRuntime = timer.rounds[i].rest;
    }
    else {
      timer.rounds[i].work = timer.workTime;
      // calculate runtime for round:
      timer.rounds[i].roundRuntime = timer.rounds[i].work;
    }
    // add runtime from any previous rounds:
    if (i > 1) {
      timer.rounds[i].roundRuntime += timer.rounds[i-1].roundRuntime;
    }
  }
}

function calcRuntime () {
  timer.runtime = timer.rounds[timer.numRounds * 2].roundRuntime;
}

function startTimer () {
  if (timer.running === true) {
    return;
  }
  if (timer.hasStarted === false) {
    timer.hasStarted = true;
    timer.currentRound = 1;
    createRounds(timer);
    calcRuntime(timer);
    timer.roundType = 'work';
    timer.timeElapsed = 0;
  }
  timer.startTime = new Date().getTime();
  timer.running = true;
  timer.intervalID = setInterval(countdown, 100);
};


function countdown() {
  // unrounded value for smooth progress bar:
  timer.timeElapsedMs = (new Date().getTime() - timer.startTime) / 1000;
  timer.timeElapsed = Math.floor(timer.timeElapsedMs);
  // if timer was paused, add previous elapsed time
  timer.timeElapsed += timer.timeElapsedOnPause;
  timer.timeRemaining = timer.runtime - timer.timeElapsed;
  displayTime();
  displayProgress();
  checkRound();
}

function checkRound() {
  for (let i = 1; i <= timer.numRounds*2; i++) {
    if (timer.timeElapsed >= timer.rounds[i].roundRuntime) {
      timer.currentRound = i + 1;
      if (timer.currentRound % 2 === 0) {
        timer.roundType = 'rest';
      }
      else {
        timer.roundType = 'work';
      }
      //change color scheme
      //audio alert
    }
  }
  if (timer.currentRound > (timer.numRounds*2)) {
    console.log('finish!');
    pauseTimer();
    resetTimer();
  }
}

function displayTime() {
  timerDisplay.textContent = timer.rounds[timer.currentRound].roundRuntime - timer.timeElapsed;
  timerProgress.textContent = `${secondsToFullTime(timer.timeElapsed)}/${secondsToFullTime(timer.runtime)}`;
};

function secondsToFullTime(seconds) {
  let min = `${Math.floor(seconds / 60)}`;
  let sec = (seconds % 60).toString();
  if (sec.length < 2) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

function displayProgress() {
  timerProgressBar.value = (timer.timeElapsedMs / timer.runtime) * 100;
};

function pauseTimer() {
  if (timer.running === true) {
    clearInterval(timer.intervalID);
    timer.running = false;
    timer.timeElapsedOnPause = timer.timeElapsed;
  }
  else {
    return;
  }
};

function resetTimer() {
  pauseTimer();
  timer.hasStarted = false;
  // load default settings
};

function disableExtBreak() {
  if (extBreakCheckbox.checked) {
    extBreakRounds.disabled = false;
    extBreakTime.disabled = false;
  }
  else {
    extBreakTime.disabled = true;
    extBreakRounds.disabled = true;
  }
}

function updateTimer() {
  timer.running = false;
  timer.hasStarted = false;
  timer.workTime = workTimeInput.value;
  timer.restTime = restTimeInput.value;
  timer.numRounds = roundsInput.value;
  extBreakCheckbox.checked === true ? timer.extBreak = true : timer.extBreak = false;
  timer.extBreakLength = extBreakTime.value;
  timer.extBreakAfter = extBreakRounds.value;
  timer.timeElapsedOnPause = 0;
  console.log('updated');
}

timerStart.addEventListener('click', startTimer);
timerPause.addEventListener('click', pauseTimer);
extBreakCheckbox.addEventListener('change', disableExtBreak);
updateTimerButton.addEventListener('click', updateTimer);