'use strict';
let userName; //имя игрока
let opened = []; //массив открытых полей
let selected = [0, 0]; //массив пар последовательно выбранных полей
let firstClick = true; //первый клик

let startTime; //время начала игры
let reverseCard; //перевернутые карточки

const memoryGame = document.getElementById('memory-game');
const gameConsts = {
  'gameAriaWidth': 800,
  'gameAriaHeight': 800,
  cardSetting: {
    cardWidth: 50,
    cardHeight: 50,
    cardRX: 10,
    cardRY: 10,
    stroke: '#004d61',
    'back-face': 'img/card_background.jpg',
  },
  cardType: {
    tennisBall: {
      'front-face': 'src(img/ball/basketball_PNG1094.png)',
      'bgd-face': '#55db1d7'
    },
    volleyBall: {
      'front-face': 'src(img/ball/volleyball.jpg)',
      'bgd-face': '#55db1d7'
    }
  }
};

memoryGame.appendChild(createGameField());

//UI

function createGameField() {
  let gameField = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  gameField.setAttribute('id', 'gameField');
  gameField.setAttribute('width', gameConsts.gameAriaWidth);
  gameField.setAttribute('height', gameConsts.gameAriaHeight);
  gameField.appendChild(MiniCard(gameConsts.cardSetting.cardWidth,
    gameConsts.cardSetting.cardHeight,
    gameConsts.cardSetting.cardRX,
    gameConsts.cardSetting.cardRY,
    gameConsts.cardSetting.stroke,
    gameConsts.cardSetting["back-face"],));
  return gameField;
}

function MiniCard(width, height, rx, ry, stroke, backFace) {
  let rectCard = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  rectCard.setAttribute('cx', '10 + px'); //подумать над универсальным подсчетом сх и су calc(25% - 19%)
  rectCard.setAttribute('cy', '10 + px'); //calc(33.333% - 10px)
  rectCard.setAttribute('width', width);
  rectCard.setAttribute('height', height);
  rectCard.setAttribute('rx', rx);
  rectCard.setAttribute('ry', ry);
  rectCard.setAttribute('stroke', stroke);
  rectCard.setAttribute('fill', backFace);
  return rectCard;
}


//LOGIC
function initGame() {
  startTime = new Date().getTime();
  reverseCard = 0;
  let output = '';

}
