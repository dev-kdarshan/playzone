const words = ["JAVASCRIPT", "HTML", "PUZZLE", "PROGRAMMING", "COMPUTER"];
let currentWord = "";
let scrambledWord = "";

function shuffleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}

function resetGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = shuffleWord(currentWord);
    document.getElementById("scrambled-word").textContent = scrambledWord;
    document.getElementById("guess-input").value = "";
    document.getElementById("result-message").textContent = "";
}

function checkGuess() {
    const userGuess = document.getElementById("guess-input").value.toUpperCase();
    const resultMessage = document.getElementById("result-message");

    if (userGuess === currentWord) {
        resultMessage.textContent = "Correct! You guessed the word!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Incorrect! Try again.";
        resultMessage.style.color = "red";
    }
}

// Initialize the game when the page loads
resetGame();
