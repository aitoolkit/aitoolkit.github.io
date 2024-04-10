const countdownConfigs = {
  '1min': { limit1: 30, limit2: 15, limit3: 5, globalLimit: 60 },
  '2min': { limit1: 60, limit2: 30, limit3: 0, globalLimit: 120 },
  '3min': { limit1: 60, limit2: 30, limit3: 0, globalLimit: 180 },
  '5min': { limit1: 180, limit2: 120, limit3: 30, globalLimit: 300 },
  '6min': { limit1: 120, limit2: 60, limit3: 0, globalLimit: 360 },
  '7min': { limit1: 120, limit2: 60, limit3: 0, globalLimit: 420 },
  '10min': { limit1: 240, limit2: 120, limit3: 30, globalLimit: 600 },
  '25min': { limit1: 600, limit2: 300, limit3: 60, globalLimit: 1500 },
  '40min': { limit1: 600, limit2: 300, limit3: 60, globalLimit: 2400 },
  '45min': { limit1: 900, limit2: 300, limit3: 60, globalLimit: 2700 },
  '1hour': { limit1: 600, limit2: 300, limit3: 120, globalLimit: 3600 },
};

let stopBell = 0;
let currentInterval = null;
let lastTimerCount = 0;

// Initialize all buttons for predefined countdowns
Object.keys(countdownConfigs).forEach(key => {
  document.getElementById(key).addEventListener('click', function() {
    const { limit1, limit2, limit3, globalLimit } = countdownConfigs[key];
    startCountdown(limit1, limit2, limit3, globalLimit);
  });
});

// Listener for custom countdown start
document.getElementById('startBtn').addEventListener('click', function() {
  const limit1 = parseInt(document.getElementById('limit1').value);
  const limit2 = parseInt(document.getElementById('limit2').value);
  const limit3 = parseInt(document.getElementById('limit3').value);
  const globalLimit = parseInt(document.getElementById('globalLimit').value);

  startCountdown(limit1, limit2, limit3, globalLimit);
});

function startCountdown(limit1, limit2, limit3, globalLimit) {
  if (currentInterval) clearInterval(currentInterval); // Clear existing interval if any

  document.getElementById('inputScreen').classList.add('hidden');
  const countdownScreen = document.getElementById('countdownScreen');
  countdownScreen.classList.remove('hidden');
  
  let time = globalLimit;
  stopBell = 0;
  lastTimerCount = 0;
  
  const timerDisplay = document.getElementById('timer');
  currentInterval = setInterval(function() {
    if ((time === 0) && (stopBell === 1)) {
      updateTimerDisplay(time, timerDisplay, limit1, limit2, limit3);
      clearInterval(currentInterval);
      setTimeout(() => playBellIfNeeded(), 30000);
    } else if ((time === 0) && (stopBell === 0)) {
      updateTimerDisplay(time, timerDisplay, limit1, limit2, limit3);
      setTimeout(() => playBellIfNeeded(), 30000);
      time--;
    } else if (time > 0) {
      updateTimerDisplay(time, timerDisplay, limit1, limit2, limit3);
      time--;
    } 
    lastTimerCount++;
  }, 1000);
}

function updateTimerDisplay(time, displayElement, limit1, limit2, limit3) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  displayElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  document.body.style.backgroundColor = getBackgroundColor(time, limit1, limit2, limit3);
}

function getBackgroundColor(time, limit1, limit2, limit3) {
  if (time <= limit3) return 'red';
  if (time <= limit2) return 'yellow';
  if (time <= limit1) return 'green';
  return '';
}

function playBellIfNeeded() {
  if (stopBell === 0) {
    const bell = new Audio('reception-bell.mp3');
    bell.play();
  }
}

document.getElementById('stopBtn').addEventListener('click', function() {
  stopBell = 1;
  const minutes = Math.floor(lastTimerCount / 60);
  const seconds = lastTimerCount % 60;
  const timeToDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  console.log(timeToDisplay);
  if (currentInterval) {
    clearInterval(currentInterval);
  }
  document.getElementById('inputScreen').classList.remove('hidden');
  document.getElementById('countdownScreen').classList.add('hidden');
  document.body.style.backgroundColor = 'white';

  // Display time consumed
  document.getElementById('timeDisplayer').classList.remove('hidden')
  document.getElementById('counter').innerText = timeToDisplay
});
