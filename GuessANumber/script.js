'use strict';

const message = document.querySelector('.message');
const check = document.querySelector('.check');
const gameNumber = document.querySelector('.number');
const gameScore = document.querySelector('.score');
const again = document.querySelector('.again');
const gameHighscore = document.querySelector('.highscore');

let score = 20;
let highscore = 0;

const randomNumber = () => {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = randomNumber();

const displayMessage = msg => {
  message.textContent = msg;
};

const displayScore = score => {
  gameScore.textContent = score;
};



const styleBodyBackGroundColor = color => {
  document.querySelector('body').style.backgroundColor = color;
};

const styleNumberWidth = width => {
  document.querySelector('.number').style.width = width;
};

check.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎆🎉🎇 Correct number!');
    gameNumber.textContent = secretNumber;
    //CSS style
    styleBodyBackGroundColor('#60b347');
    styleNumberWidth('30rem');

    if (score > highscore) {
      highscore = score;
      gameHighscore.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess < secretNumber ? '📉 Too low!' : '📈 Too high!');
      score--;
      displayScore(score);
    } else {
      displayMessage('🧨🧨🧨 Game over!');
      score = 0;
      displayScore(score);
      styleBodyBackGroundColor('rgb(221, 74, 74)');
    }
  }
});

again.addEventListener('click', () => {
  secretNumber = randomNumber();
  score = 20;
  displayMessage('Start guessing...');
  displayScore.textContent = score;
  gameNumber.textContent = '?';
  document.querySelector('.guess').value = '';
  styleNumberWidth('15rem');
  styleBodyBackGroundColor('#222');
});
