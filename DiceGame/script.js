'use strict';

const domScore0 = document.querySelector('#score--0');
const domScore1 = document.querySelector('#score--1');
const domDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const domCurrentScore0 = document.querySelector('#current--0');
const domCurrentScore1 = document.querySelector('#current--1');
const domPlayer0 = document.querySelector('.player--0');
const domPlayer1 = document.querySelector('.player--1');

domScore0.textContent = 0;
domScore1.textContent = 0;
domDice.classList.add('hidden');

let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = 1;

//Switch player when dice === 1 or hold button is click and check if player win
const switchPlayer = () => {
  if (scores[activePlayer] >= 100) {
    playing = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    domPlayer0.classList.toggle('player--active');
    domPlayer1.classList.toggle('player--active');
  }
};

// display current score
const displayCurrentScore = (score, player) => {
  document.getElementById(`current--${player}`).textContent = score;
};
// display total score
const displayTotalScore = (score, player) => {
  document.getElementById(`score--${player}`).textContent = score;
};

// rolling dice
const rollingDice = () => {
  if (playing) {
    const diceResult = Math.trunc(Math.random() * 6) + 1;
    domDice.classList.remove('hidden');
    domDice.src = `dice-${diceResult}.png`;

    if (diceResult !== 1) {
      currentScore += diceResult;
      displayCurrentScore(currentScore, activePlayer);
    } else {
      currentScore = 0;
      displayCurrentScore(currentScore, activePlayer);
      switchPlayer();
    }
  }
};

//hold your points
const holdPoints = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    displayCurrentScore(currentScore, activePlayer);
    displayTotalScore(scores[activePlayer], activePlayer);
    switchPlayer();
  }
};

//reset
const resetGame = () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  domDice.classList.add('hidden');
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  displayCurrentScore(currentScore, 0);
  displayCurrentScore(currentScore, 1);
  displayTotalScore(scores[0], 0);
  displayTotalScore(scores[1], 1);
  activePlayer = 0;
  domPlayer0.classList.add('player--active');
  domPlayer1.classList.remove('player--active');
  playing = 1;
};

btnRoll.addEventListener('click', rollingDice);
btnHold.addEventListener('click', holdPoints);
btnNew.addEventListener('click', resetGame);
