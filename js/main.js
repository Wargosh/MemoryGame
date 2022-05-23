// Inicialización de variables
let uncoveredCards = 0;
let moves = 0,
  hits = 0;
let card1 = null,
  card2 = null;
let firstResult = null,
  lastResult = null;
let useTimer = false;
let timer = 60;
let initialTime = 60;
let timerId = null;

// sonidos
let winAudio = new Audio('./sounds/win-1.wav');
let correctAudio = new Audio('./sounds/correct-1.wav');
let errorAudio = new Audio('./sounds/error-2.wav');
let gameoverAudio = new Audio('./sounds/gameover-1.wav');
let selectAudio = new Audio('./sounds/select-3.wav');

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// Accediendo a HTML
let showMoves = document.getElementById("moves");
let showHits = document.getElementById("hits");
let showTimer = document.getElementById("timer");
let infoWinner = document.getElementById("infoWinner");
let popup = document.querySelector(".popup__winner");
let closePopup = document.querySelector(".close-popup");
let showConfetti = document.querySelector("#my-canvas");

// Desordenar items
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});

// Muestra o revela la tarjeta seleccionada
function ShowCard(id) {
  if (useTimer == false) {
    useTimer = true;
    Countdown();
  }

  uncoveredCards++;
  selectAudio.play();

  if (uncoveredCards == 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="./img/${firstResult}.png" alt="">`;
    card1.disabled = true;
  } else if (uncoveredCards == 2) {
    card2 = document.getElementById(id);
    lastResult = numbers[id];
    card2.innerHTML = `<img src="./img/${lastResult}.png" alt="">`;
    card2.disabled = true;

    ShowMoves();
    VerifyVictory();
  }
}

// Cuenta regresiva
function Countdown() {
  timerId = setInterval(() => {
    timer--;
    showTimer.innerHTML = `Tiempo: ${timer}s`;
    if (timer == 0) {
      GameOver();
    }
  }, 1000);
}

// Se acabó el tiempo
function GameOver() {
  gameoverAudio.play();
  clearInterval(timerId);
  BlockCards();
  showTimer.innerHTML = `¡¡Se acabó el tiempo!!\n:(`;
  CallNewGameWithDelay();
}

// Bloquear y mostrar el contenido de todas las tarjetas
function BlockCards() {
  for (let i = 0; i < numbers.length; i++) {
    let BlockCard = document.getElementById(i);
    BlockCard.disabled = true;
    // BlockCard.innerHTML = numbers[i];
    BlockCard.innerHTML = `<img src="./img/${numbers[i]}.png" alt="">`;
  }
}

// Verificar victoria del juego
function VerifyVictory() {
  if (firstResult == lastResult) {
    uncoveredCards = 0;
    ShowHits();
  } else {
    errorAudio.play();
    setTimeout(() => {
      card2.innerHTML = card1.innerHTML = " ";
      card2.disabled = card1.disabled = false;
      uncoveredCards = 0;
    }, 600);
  }
}

// Aumentar Movimientos
function ShowMoves() {
  moves++;
  showMoves.innerHTML = `Movimientos: ${moves}`;
}

// Aumentar Aciertos
function ShowHits() {
  hits++;
  showHits.innerHTML = `Aciertos: ${hits}`;
  correctAudio.play();

  if (hits == 8) {
    showHits.innerHTML = `Aciertos: ${hits} \n¡¡GANASTE!!`;
    clearInterval(timerId);
    ShowPopUpWinner();
    // CallNewGameWithDelay();
  }
}

function CallNewGameWithDelay() {
  setTimeout(() => {
    NewGame();
  }, 4000);
}

// Nuevo juego
function NewGame() {
  ResetInfoVars();
  ResetCards();
  ResetStats();

  // Desordenar items
  numbers = numbers.sort(() => {
    return Math.random() - 0.5;
  });
}

// Restablecer variables a por defecto
function ResetInfoVars() {
  useTimer = false;
  timer = initialTime;
  moves = hits = 0;
}

// Reiniciar tarjetas
function ResetCards() {
  for (let i = 0; i < numbers.length; i++) {
    let card = document.getElementById(i);
    card.innerHTML = " ";
    card.disabled = false;
  }
}

// Reinicar informacion de estadisticas
function ResetStats() {
  showHits.innerHTML = `Aciertos: ${hits}`;
  showMoves.innerHTML = `Movimientos: ${moves}`;
  showTimer.innerHTML = `Tiempo: ${timer}s`;
}

// Mostrar confetti
function ShowPopUpWinner() {
  winAudio.play();
  popup.classList.add("active");
  showConfetti.classList.add("active");
  infoWinner.innerHTML = `Tan solo te tomó ${
     initialTime - timer
  } segundos.\n¡Sigue asi!`;
}

// Ocultar confetti
closePopup.onclick = function () {
  popup.classList.remove("active");
  showConfetti.classList.remove("active");
  infoWinner.innerHTML = " ";

  NewGame();
};
