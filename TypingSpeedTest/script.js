const paragraphDisplay = document.getElementById("paragraph-display");
const typingInput = document.getElementById("typing-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const resultDisplay = document.getElementById("final-result");
const restartBtn = document.getElementById("restart-btn");

let originalText = `Typing is a fundamental skill that allows individuals to communicate effectively and efficiently using a keyboard. Practicing typing helps improve speed and accuracy, which are both crucial for productivity in the digital age.`;
let timer = null;
let startTime = null;
let totalTyped = 0;
let totalCorrect = 0;

function loadParagraph() {
    paragraphDisplay.innerText = originalText;
    typingInput.value = "";
    typingInput.disabled = false;
    timerDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    resultDisplay.style.display = "none";
    resultDisplay.innerHTML = "";
    totalTyped = 0;
    totalCorrect = 0;
    startTime = null;
    clearInterval(timer);
    timer = null;
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        timerDisplay.textContent = elapsed;
        updateWPM(elapsed);
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function updateWPM(seconds) {
    if (seconds === 0) return;
    const words = typingInput.value.trim().split(/\s+/).length;
    const wpm = Math.round((words / seconds) * 60);
    wpmDisplay.textContent = wpm;
}

function showFinalResults() {
    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    const words = typingInput.value.trim().split(/\s+/).length;
    const wpm = Math.round((words / timeTaken) * 60);
    const accuracy = ((totalCorrect / totalTyped) * 100).toFixed(1);

    resultDisplay.innerHTML = `
    <h3>Test Completed!</h3>
    <p><strong>Final WPM:</strong> ${wpm}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
    <p><strong>Total Time:</strong> ${timeTaken} seconds</p>
  `;
    resultDisplay.style.display = "block";
}

typingInput.addEventListener("input", () => {
    const userInput = typingInput.value;

    if (userInput.length === 1 && !timer) {
        startTimer();
    }

    totalTyped = userInput.length;
    totalCorrect = 0;

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === originalText[i]) {
            totalCorrect++;
        }
    }

    const accuracy = totalTyped > 0 ? ((totalCorrect / totalTyped) * 100).toFixed(1) : 100;
    accuracyDisplay.textContent = accuracy;

    if (userInput === originalText) {
        stopTimer();
        typingInput.disabled = true;
        showFinalResults();
    }
});

restartBtn.addEventListener("click", loadParagraph);

// Initialize
loadParagraph();
