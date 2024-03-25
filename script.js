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
            bell.play(); 
        }, 30000);
      }
  
      time--;
    }, 1000);

    document.getElementById('stopBtn').addEventListener('click', function() {
      clearInterval(interval);
      document.getElementById('inputScreen').classList.remove('hidden');
      countdownScreen.classList.add('hidden');
      document.body.style.backgroundColor = 'white';
    });
  }
