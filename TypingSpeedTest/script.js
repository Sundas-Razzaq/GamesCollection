// Lecture 1️⃣: Setup & Variables

// DOM Elements
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

// Game State Variables
let timer = 60; // seconds
let interval = null;
let isGameRunning = false;

let correctChars = 0;
let totalTypedChars = 0;
let targetText = "";
// Lecture 2️⃣: Load & Display Random Text

const paragraphs = [
    "Typing fast is a skill that gets better with practice and patience.",
    "JavaScript is a versatile language used both on the client and server side.",
    "Practice daily to improve your accuracy and typing speed effectively.",
    "This is a simple typing test game built using HTML, CSS and JavaScript."
];

// Load and render a random paragraph
function loadText() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    targetText = paragraphs[randomIndex];
    textDisplay.innerHTML = "";

    // Create span for each character
    targetText.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        textDisplay.appendChild(span);
    });
}

// Call it once initially
loadText();
// Lecture 3️⃣: Typing & Highlighting

textInput.addEventListener("input", () => {
    if (!isGameRunning) {
        startTimer(); // First keystroke starts timer
        isGameRunning = true;
    }

    const inputText = textInput.value;
    const spanElements = textDisplay.querySelectorAll("span");

    totalTypedChars = inputText.length;
    correctChars = 0;

    spanElements.forEach((span, index) => {
        const typedChar = inputText[index];

        if (typedChar == null) {
            span.classList.remove("correct", "incorrect");
        } else if (typedChar === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctChars++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    updateStats(); // update live stats
});
// Lecture 4️⃣: Timer & WPM/Accuracy

function startTimer() {
    interval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(interval);
            textInput.disabled = true;
        } else {
            timer--;
            timerDisplay.textContent = timer;
            updateStats();
        }
    }, 1000);
}

function updateStats() {
    const wordsTyped = textInput.value.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / (60 - timer)) * 60) || 0;

    const accuracy = totalTypedChars > 0
        ? Math.round((correctChars / totalTypedChars) * 100)
        : 100;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}
// Lecture 5️⃣: Reset Game

restartBtn.addEventListener("click", () => {
    clearInterval(interval);
    timer = 60;
    isGameRunning = false;

    textInput.value = "";
    textInput.disabled = false;

    timerDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    summaryMessage.textContent = "";
    correctChars = 0;
    totalTypedChars = 0;

    loadText(); // Load new text
});

//donebtn
const doneBtn = document.getElementById("done-btn");
const summaryMessage = document.getElementById("summary-message");

doneBtn.addEventListener("click", () => {
    if (!isGameRunning) return;

    clearInterval(interval);
    isGameRunning = false;
    textInput.disabled = true;

    // Calculate words
    const wordsTyped = textInput.value.trim().split(/\s+/).filter(word => word !== "").length;
    const wpm = Math.round((wordsTyped / (60 - timer)) * 60) || 0;
    const accuracy = totalTypedChars > 0
        ? Math.round((correctChars / totalTypedChars) * 100)
        : 100;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;

    summaryMessage.textContent = `You typed ${wordsTyped} word(s) at ${wpm} WPM with ${accuracy}% accuracy.`;
});

