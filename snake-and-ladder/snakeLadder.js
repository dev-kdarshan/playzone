const playerToken = document.getElementById("player");
const computerToken = document.getElementById("computer");
const turnText = document.getElementById("turn");
const diceText = document.getElementById("dice-result");

let playerPos = 1;
let computerPos = 1;
let currentPlayer = "player";

// Return percentage-based positions for responsive layout
function getPosition(n) {
  const row = Math.floor((n - 1) / 10);
  const col = (row % 2 === 0)
    ? (n - 1) % 10
    : 9 - (n - 1) % 10;

  const x = col * 10;
  const y = (9 - row) * 10;
  return { x, y };
}

function updateTokens() {
  const pPos = getPosition(playerPos);
  const cPos = getPosition(computerPos);

  playerToken.style.left = `${pPos.x}%`;
  playerToken.style.top = `${pPos.y}%`;

  computerToken.style.left = `${cPos.x + 3}%`; 
  computerToken.style.top = `${cPos.y}%`;
}

function move(who, roll) {
  let pos = who === "player" ? playerPos : computerPos;
  let targetPos = pos + roll;

  if (targetPos > 100) targetPos = pos;

  const path = [];
  for (let i = pos + 1; i <= targetPos; i++) {
    path.push(i);
  }

  const ladders = {
    5: 58,
    14: 49,
    53: 72,
    42: 60,
    64: 83,
    75: 94,
  };

  const snakes = {
    97: 61,
    91: 73,
    65: 54,
    51: 10,
    45: 7,
    38: 20,
  };

  function finalize(finalPos) {
    if (ladders[finalPos]) finalPos = ladders[finalPos];
    else if (snakes[finalPos]) finalPos = snakes[finalPos];

    if (who === "player") playerPos = finalPos;
    else computerPos = finalPos;

    updateTokens();

    if (finalPos === 100) {
      setTimeout(() => {
        alert(`${who === "player" ? "You" : "Computer"} wins!`);
        reset();
      }, 300);
      return;
    }

    if (who === "player") {
      currentPlayer = "computer";
      turnText.innerText = "Computer's Turn...";
      setTimeout(() => {
        const compRoll = Math.floor(Math.random() * 6) + 1;
        diceText.innerText = `Computer rolled: ${compRoll}`;
        move("computer", compRoll);
        currentPlayer = "player";
        turnText.innerText = "Your Turn";
      }, 1000);
    }
  }

  if (path.length === 0) {
    finalize(targetPos);
    return;
  }

  function step(index) {
    if (index >= path.length) {
      finalize(path[path.length - 1]);
      return;
    }

    if (who === "player") playerPos = path[index];
    else computerPos = path[index];

    updateTokens();
    setTimeout(() => step(index + 1), 200);
  }

  step(0);
}


function rollDice() {
  if (currentPlayer !== "player") return;
  const roll = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = `You rolled: ${roll}`;
  move("player", roll);
}

function reset() {
  playerPos = 1;
  computerPos = 1;
  updateTokens();
  diceText.innerText = "";
  turnText.innerText = "Your Turn";
}

updateTokens();
