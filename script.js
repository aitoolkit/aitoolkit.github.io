document.getElementById('1min').addEventListener('click', function() {
  startCountdown(30, 15, 5, 60);
});

document.getElementById('2min').addEventListener('click', function() {
  startCountdown(60, 30, 0, 120);
});

document.getElementById('3min').addEventListener('click', function() {
  startCountdown(60, 30, 0, 180);
});

document.getElementById('5min').addEventListener('click', function() {
  startCountdown(180, 120, 30, 300);
});

document.getElementById('7min').addEventListener('click', function() {
  startCountdown(120, 60, 0, 420);
});

document.getElementById('10min').addEventListener('click', function() {
  startCountdown(240, 120, 30, 600);
});

document.getElementById('25min').addEventListener('click', function() {
  startCountdown(10*60, 5*60, 60, 25*60);
});

document.getElementById('40min').addEventListener('click', function() {
  startCountdown(10*60, 5*60, 60, 40*60);
});

document.getElementById('45min').addEventListener('click', function() {
  startCountdown(15*60, 5*60, 60, 45*60);
});

document.getElementById('1hour').addEventListener('click', function() {
  startCountdown(600, 300, 120, 3600);
});

let stopBell = 0

document.getElementById('startBtn').addEventListener('click', function() {
    const limit1 = parseInt(document.getElementById('limit1').value);
    const limit2 = parseInt(document.getElementById('limit2').value);
    const limit3 = parseInt(document.getElementById('limit3').value);
    const globalLimit = parseInt(document.getElementById('globalLimit').value);
    
    startCountdown(limit1, limit2, limit3, globalLimit);
  });
  
function startCountdown(limit1, limit2, limit3, globalLimit) {
  document.getElementById('inputScreen').classList.add('hidden');
  const countdownScreen = document.getElementById('countdownScreen');
  countdownScreen.classList.remove('hidden');
  
  let time = globalLimit;

  stopBell = 0
  
  const timerDisplay = document.getElementById('timer');
  const interval = setInterval(function() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    if (time <= limit3) {
      document.body.style.backgroundColor = 'red';
    } else if (time <= limit2) {
      document.body.style.backgroundColor = 'yellow';
    } else if (time <= limit1) {
      document.body.style.backgroundColor = 'green';
    }
  
    if (time === 0) {
      clearInterval(interval);
      // setTimeout(function() { alert('Time is up!'); }, 30000); // This should be replaced by the bell sound.
      setTimeout(function() { 
          var bell = new Audio('reception-bell.mp3');
          if (stopBell == 0) {
            bell.play(); 
          }
      }, 30000);
    }
  
    time--;
  }, 1000);

  document.getElementById('stopBtn').addEventListener('click', function() {
    stopBell = 1
    clearInterval(interval);
    document.getElementById('inputScreen').classList.remove('hidden');
    countdownScreen.classList.add('hidden');
    document.body.style.backgroundColor = 'white';
  });
}
