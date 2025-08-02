// Game variables
let targetNumber;
let attempts = 0;

// DOM elements
const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const restartBtn = document.getElementById('restart-btn');
const messageEl = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');

// Initialize the game
function initGame() {
    // Generate random number between 1-100
    targetNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;

    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    checkBtn.disabled = false;
    messageEl.textContent = 'Take a guess!';
    messageEl.style.color = '#4a6bff';
    attemptsEl.textContent = `Attempts: ${attempts}`;
    restartBtn.style.display = 'none';

    // Focus input field
    guessInput.focus();
}

// Check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(userGuess)) {
        messageEl.textContent = 'Please enter a number';
        messageEl.style.color = '#ff9a9e';
        return;
    }

    if (userGuess < 1 || userGuess > 10) {
        messageEl.textContent = 'Please enter a number between 1 and 10';
        messageEl.style.color = '#ff9a9e';
        return;
    }

    attempts++;
    attemptsEl.textContent = `Attempts: ${attempts}`;

    // Compare guess to target number
    if (userGuess === targetNumber) {
        // Correct guess
        messageEl.textContent = `🎉 You guessed it right in ${attempts} attempts!`;
        messageEl.style.color = '#4a6bff';
        guessInput.disabled = true;
        checkBtn.disabled = true;
        restartBtn.style.display = 'block';
    } else if (userGuess < targetNumber) {
        // Too low
        messageEl.textContent = 'Too low! Try a higher number.';
        messageEl.style.color = '#ff9a9e';
    } else {
        // Too high
        messageEl.textContent = 'Too high! Try a lower number.';
        messageEl.style.color = '#ff9a9e';
    }

    // Clear input and focus for next guess
    guessInput.value = '';
    guessInput.focus();
}

// Event Listeners
checkBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', initGame);

// Allow pressing Enter to submit guess
guessInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start the game when page loads
window.addEventListener('DOMContentLoaded', initGame);

// Prevent scrolling
window.addEventListener('scroll', function (e) {
    window.scrollTo(0, 0);
});
