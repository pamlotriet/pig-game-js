'use strict';

const diceEl = document.querySelector('.dice');
const rollDiceBtnEl = document.querySelector('.btn--roll');
const holdScoreBtnEl = document.querySelector('.btn--hold');
const newGameBtnEl = document.querySelector('.btn--new');
const player1ScoreEl = document.querySelector('#score--0');
const player1CurrentEl = document.querySelector('#current--0');
const player2ScoreEl = document.querySelector('#score--1');
const player2CurrentEl = document.querySelector('#current--1');
const playerActiveEl0 = document.querySelector('.player--0');
const playerActiveEl1 = document.querySelector('.player--1');

player1ScoreEl.textContent = 0;
player2ScoreEl.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let totalScore = 0;
let playing = true;

const randomDiceRoll = function () {
  if (playing) {
    const random = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${random}.png`;

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayer();
    }
  }
};

const onHold = function () {
  if (playing) {
    let currentTotal = document.getElementById(
      `score--${activePlayer}`
    ).textContent;
    const displayTotal = Number(currentTotal) + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      displayTotal;

    if (
      Number(document.getElementById(`score--${activePlayer}`).textContent) <
      100
    ) {
      togglePlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
  }
};

const reset = function () {
  playing = true;
  currentScore = 0;
  totalScore = 0;
  activePlayer = 0;
  playerActiveEl1.classList.add('player--active');
  playerActiveEl1.classList.remove('player--active');
  playerActiveEl0.classList.remove('player--winner');
  playerActiveEl1.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  player1CurrentEl.textContent = 0;
  player2CurrentEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  player2ScoreEl.textContent = 0;
};

function togglePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerActiveEl0.classList.toggle('player--active');
  playerActiveEl1.classList.toggle('player--active');
}

rollDiceBtnEl.addEventListener('click', randomDiceRoll);
holdScoreBtnEl.addEventListener('click', onHold);
newGameBtnEl.addEventListener('click', reset);
