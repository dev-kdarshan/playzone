function playerChoice(playerSelection) {
    const choices = ["rock", "paper", "scissors"];
    const computerSelection = choices[Math.floor(Math.random() * 3)];
    
    document.getElementById("player-choice").textContent = `Your Choice: ${capitalize(playerSelection)}`;
    document.getElementById("computer-choice").textContent = `Computer's Choice: ${capitalize(computerSelection)}`;
    
    const result = getResult(playerSelection, computerSelection);
    document.getElementById("result").textContent = `Result: ${result}`;
}

function getResult(player, computer) {
    if (player === computer) {
        return "It's a draw!";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function resetGame() {
    document.getElementById("player-choice").textContent = "Your Choice: ";
    document.getElementById("computer-choice").textContent = "Computer's Choice: ";
    document.getElementById("result").textContent = "Result: ";
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
