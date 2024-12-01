// Kérdések és válaszok
const questions = [
    { text: "A lónak 4 lába van", answer: "igaz" },
    { text: "A csirkének 2 lába van", answer: "igaz" },
    { text: "A halaknak 3 lába van", answer: "hamis" }
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = questions.length;
let userAnswers = Array(totalQuestions).fill(null); // Felhasználó válaszai (null, "igaz", vagy "hamis")

// Elemek kiválasztása
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game');
const resultsScreen = document.getElementById('results');
const questionElement = document.getElementById('question');
const feedbackElement = document.getElementById('feedback');
const summaryTable = document.getElementById('summary-table').querySelector('tbody');
const summaryElement = document.getElementById('summary');
const trueButton = document.getElementById('true-button');
const falseButton = document.getElementById('false-button');
const nextButton = document.getElementById('next-question');
const endGameButton = document.getElementById('end-game');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');

// Játék indítása
startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers.fill(null); // Nullázza a felhasználói válaszokat
    feedbackElement.textContent = ""; // Visszajelzés törlése
    startScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    showQuestion();
}

// Kérdés megjelenítése
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;
    feedbackElement.textContent = ""; // Visszajelzés törlése
    trueButton.disabled = false;
    falseButton.disabled = false;
    nextButton.style.display = 'none';
}

// Válasz feldolgozása
function handleAnswer(isTrue) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const userAnswer = isTrue ? "igaz" : "hamis";

    userAnswers[currentQuestionIndex] = userAnswer; // Felhasználó válaszának rögzítése

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Siker!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = "Nem.";
        feedbackElement.style.color = "red";
    }

    trueButton.disabled = true;
    falseButton.disabled = true;
    nextButton.style.display = 'inline-block';
}

// Következő kérdés
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        endGame();
    }
});

// Játék abbahagyása és eredmények megjelenítése
endGameButton.addEventListener('click', endGame);

function endGame() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    // Táblázat feltöltése
    summaryTable.innerHTML = ""; // Táblázat törlése
    let answeredQuestions = 0;
    userAnswers.forEach((answer, index) => {
        const row = document.createElement('tr');
        const questionCell = document.createElement('td');
        const userAnswerCell = document.createElement('td');
        const correctAnswerCell = document.createElement('td');

        questionCell.textContent = questions[index].text;
        userAnswerCell.textContent = answer || "";
        correctAnswerCell.textContent = questions[index].answer;

        if (answer !== null) answeredQuestions++; // Csak a megválaszolt kérdések számát növeli

        row.appendChild(questionCell);
        row.appendChild(userAnswerCell);
        row.appendChild(correctAnswerCell);
        summaryTable.appendChild(row);
    });

    // Összefoglaló
    summaryElement.textContent = `Helyes válaszok: ${score} / ${answeredQuestions}`;
}

// Újraindítás
restartButton.addEventListener('click', () => {
    startScreen.style.display = 'block';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'none';
});

// Igaz és Hamis gombok eseménykezelői
trueButton.addEventListener('click', () => handleAnswer(true));
falseButton.addEventListener('click', () => handleAnswer(false));