'use strict';

const memoryGame = document.getElementById('memoryGame');
let resultsArray = []; //массив из открытых карточек
let countCorrect = 0; // количество верных пар
let startTime = [2, 30]; //массив минуты:секунды начаkа игры
let startTimer; // старт таймера
const spanTimeDown = document.getElementById('timeDown'); //получить блок с таймером
let Interval; // отметка таймера
let musicGame = new Audio('./audio/fon-muzyka.mp3'); //фоновая музыка игры
let musicCorrect = new Audio('./audio/correct.mp3'); //фоновая музыка игры
let musicClick = new Audio('./audio/click.mp3'); //фоновая музыка игры
const cardConsts = [
  {'cardName': 'badminton', 'src': './img/ball/badminton.png'},
  {'cardName': 'badminton', 'src': './img/ball/badminton.png'},
  {'cardName': 'baseball', 'src': './img/ball/baseball.png'},
  {'cardName': 'baseball', 'src': './img/ball/baseball.png'},
  {'cardName': 'basketball', 'src': './img/ball/basketball.png'},
  {'cardName': 'basketball', 'src': './img/ball/basketball.png'},
  {'cardName': 'curling-stones', 'src': './img/ball/curling-stones.png'},
  {'cardName': 'curling-stones', 'src': './img/ball/curling-stones.png'},
  {'cardName': 'darts', 'src': './img/ball/darts.png'},
  {'cardName': 'darts', 'src': './img/ball/darts.png'},
  {'cardName': 'tennis', 'src': './img/ball/tennis-ball.png'},
  {'cardName': 'tennis', 'src': './img/ball/tennis-ball.png'},
];
const RequestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  }
;

function shuffleField(arr) {
  let randomInd;
  let tempVal;
  for (let i = arr.length - 1; i > 0; i--) {
    randomInd = Math.floor(Math.random() * (i + 1));
    tempVal = arr[randomInd];
    arr[randomInd] = arr[i];
    arr[i] = tempVal;
  }
  return arr;
}

shuffleField(cardConsts);

for (let i = 0; i < cardConsts.length; i++) {
  let frontFace = document.createElement('div');
  frontFace.dataset.cardname = cardConsts[i].cardName;

  const images = document.createElement('img');
  images.classList.add('images');
  images.src = cardConsts[i].src;

  frontFace.appendChild(images);
  memoryGame.appendChild(frontFace);

  frontFace.onclick = function () {
    if (this.className !== 'flipped' && this.className !== 'correct') {
      this.className = 'flipped';
      let result = this.dataset.cardname;
      resultsArray.push(result);
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }

    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        checkCards('correct');
        setRotate('720deg');
        vibro(true);
        musicCorrect.play();
        countCorrect++;
        win();
        resultsArray = [];
      } else {
        checkCards('reverse');
        resultsArray = [];
        vibro(false);
      }
    }
  };
}

function setRotate(NewAngle) {
  const divCorrect = document.getElementsByClassName('correct');
  divCorrect.style.transform = 'rotate(' + NewAngle + ')';
  divCorrect.style.webkitTransform = 'rotate(' + NewAngle + ')';
}

window.onload = initGame;

function initGame() {
  musicGame.play();
  const spanScore = document.getElementById('score');
  let score = 0;
  spanScore.innerHTML = score;
  document.body.onclick = (EO) => {
    musicClick.play();
    EO = EO || document.event;
    let target = EO.target || EO.srcElement;
    if (target.className !== 'flipped') return;
    score++;
    spanScore.innerHTML = Math.floor(score / 2);
  };

  if (startTime !== [0, 0]) {
    startTimer = timer(startTime, (m, s) => {
      spanTimeDown.innerHTML = (m + ':' + s);
    });
  } else {
    gameOver();
  }

//  RequestAnimationFrame(startTimer);
}

let checkCards = (className) => {
  let flipCards = document.querySelectorAll('.flipped');

  setTimeout(() => {
    for (let i = (flipCards.length - 1); i >= 0; i--) {
      flipCards[i].className = className;
    }
  }, 500);
};

let win = () => {
  if (countCorrect === (cardConsts.length / 2)) {
    clearInterval(Interval);
    gameOver();
    musicGame.pause();
  }
};

function gameOver() {
  const wrapGameOver = document.createElement('div');
  wrapGameOver.classList.add('wrapGameOver');

  const btnAgain = document.createElement('input');
  btnAgain.classList.add('btnAgain');
  btnAgain.type = 'button';
  btnAgain.value = 'Play again?';
  btnAgain.title = 'Play again?';
  btnAgain.onclick = switchToPlay();
  btnAgain.style.outline = 'none';
  btnAgain.style.borderRadius = 32 + 'px';
  btnAgain.style.letterSpacing = 1 + 'px';
  btnAgain.style.fontSize = 20 + 'px';
  btnAgain.style.color = '#e1e1e1';
  btnAgain.style.backgroundColor = '#004d61';
  btnAgain.style.width = 100 + 'px';
  btnAgain.style.height = 40 + 'px';

  wrapGameOver.appendChild(btnAgain);
  document.getElementsByClassName('wrapPlay').appendChild(wrapGameOver);
}

//-----обратный таймер------
//time -  массив, минуты секунды
//call - функция с параметрами, минуты и секунды обратного отсчета
function timer(time, call) {
  timer.lastCall = call;
  timer.lastTime = time;
  timer.timerInterval = setInterval(() => {
    call(time[0], time[1]);
    time[1]--;
    if (time[0] === 0 && time[1] === 0) {
      timer.pause();
      call(0, 0);
    }
    if (time[1] === 0) {
      time[1] = 59;
      time[0]--;
    }
    timer.lastTime = time;
  }, 1000);
}

timer.pause = () => {
  clearInterval(timer.timerInterval);
};
timer.start = () => {
  timer(timer.lastTime, timer.lastCall);
};

document.getElementById("timePause").onclick = () => {
  timer.pause();
};

document.getElementById("continPause").onclick = () => {
  timer.start();
};

document.getElementById("sound").onclick = () => {
  if (musicGame.paused === true) {
    musicGame.play();
  } else if (musicGame.paused === false) {
    musicGame.pause();
  }
};

function vibro(LongFlag) {
  if (navigator.vibrate) {
    if (!LongFlag) {
      window.navigator.vibrate(300);
    } else {
      window.navigator.vibrate([100, 50, 100]);
    }
  }
}
