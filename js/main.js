// Inicialización de variables
let uncoveredCards = 0;
let moves = 0,
  hits = 0;
let card1 = null,
  card2 = null;
let firstResult = null,
  lastResult = null;
let useTimer = false;
let timer = 30;
let timerId = null;

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// Accediendo a HTML
let showMoves = document.getElementById("moves");
let showHits = document.getElementById("hits");
let showTimer = document.getElementById("timer");

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

  if (uncoveredCards == 1) {
    card1 = document.getElementById(id);
    card1.innerHTML = firstResult = numbers[id];
    card1.disabled = true;
  } else if (uncoveredCards == 2) {
    card2 = document.getElementById(id);
    card2.innerHTML = lastResult = numbers[id];
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
    BlockCard.innerHTML = numbers[i];
  }
}

// Verificar victoria del juego
function VerifyVictory() {
  if (firstResult == lastResult) {
    uncoveredCards = 0;
    ShowHits();
  } else {
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

  if (hits == 8) {
    showHits.innerHTML = `Aciertos: ${hits} \n¡¡GANASTE!!`;
    clearInterval(timerId);
    CallNewGameWithDelay();
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
  timer = 30;
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
