const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Peripheral Unit"],
        answer: 0
    },
    {
        question: "What does GPU stand for?",
        options: ["Graphics Processing Unit", "Graphics Personal Unit", "General Processing Unit", "Graphics Peripheral Unit"],
        answer: 0
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Random Access Module"],
        answer: 0
    },
    {
        question: "What does PSU stand for?",
        options: ["Power Supply Unit", "Power System Unit", "Personal Supply Unit", "Power Source Unit"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    document.getElementById('progress').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectOption(index) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === index) {
            btn.classList.add('selected');
        }
    });
}

function checkAnswer() {
    const selectedOption = Array.from(document.querySelectorAll('.option-btn')).findIndex(btn => btn.classList.contains('selected'));
    if (selectedOption === -1) return; // No option selected

    if (selectedOption === questions[currentQuestionIndex].answer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Incorrect! The correct answer is: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score').innerText = `${score} out of ${questions.length} (${(score / questions.length * 100).toFixed(2)}%)`;
}

function restartQuiz() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}
