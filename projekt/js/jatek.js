// Kérdések és válaszok
const questions = [
    { text: "Számon tarthatják, mit telefonoztam s mikor, miért, kinek. Aktákba irják, miről álmodoztam s azt is, ki érti meg.", answer: "költő", zeneElőadója: "József Attila", zeneCíme: "Levegőt" },
    { text: "A kormányt én elengedném, hadd mosson el örökre De mindenki, aki törődik velem, itt ül mögöttem", answer: "repper", zeneElőadója: "Krúbi", zeneCíme: "Másnap" },
    { text: "Én betörtem tiszta szívvel, azt mocskos aggyal jöttem ki", answer: "repper", zeneElőadója: "6363", zeneCíme: "Negatív" },
    { text: "Nem írom ki, visszatartom Kék a véred, méreg drágán méred, mint egy tintapatron", answer: "repper", zeneElőadója: "trAnzKaPHka", zeneCíme: "Szupercella" },
    { text: "Boldog akartam lenni, de a vágyak Más vágyakkal keresztbe állnak Bennem is úgy, ahogy mindenkiben Boldog akartam lenni Ugyan ki nem?", answer: "költő", zeneElőadója: "CSNK", zeneCíme: "Király Úr" },
    { text: "Adjatok még inni, jöhet vodka, meg a Sprite Baby, nem akarok húszezerért terapeutát", answer: "repper", zeneElőadója: "Manuel", zeneCíme: "Terapeuta" },
    { text: "Jar Jar szívja a csár csárt bluntot csavar kurva nagyot rakjatok egy mágját", answer: "repper", zeneElőadója: "17", zeneCíme: "Jar Jar" },
    { text: "Smároló sarok ide nemjöhetnek csajok, ha belép egy homi szájra cuppansat adok, itt a zacsival van pacsi a nyelvem lesz a vacsi", answer: "repper", zeneElőadója: "Oxy Beat$", zeneCíme: "Smároló Sarok" },
    { text: "Anya kiabáll, nem feküdtem időben, figyelem! Mexikó hetek Lidlben", answer: "repper", zeneElőadója: "megussunk gang", zeneCíme: "Mexikó hetek Lidlben" },
    { text: "Izgatta szívem negyven cigarettám. Meg más egyéb is. A fekete. Minden.", answer: "költő", zeneElőadója: "Kosztolányi Dezső", zeneCíme: "Hajnali részegség" },
    { text: "Nem érek éppen rá Semmire most, bocsi (Bocsi) Meló van, kell nagy ház Meg egy sportkocsi (Wruuh)", answer: "repper", zeneElőadója: "Gyuris", zeneCíme: "big boy ben" },
    { text: "Alvó szegek a jéghideg homokban. Plakátmagányban ázó éjjelek. Égve hagytad a folyosón a villanyt. Ma ontják véremet.", answer: "költő", zeneElőadója: "Pilinszky János", zeneCíme: "Négysoros" },
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = questions.length;
let userAnswers = Array(totalQuestions).fill(null); // Felhasználó válaszai (null, "költő", vagy "repper")

// Elemek kiválasztása
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game');
const resultsScreen = document.getElementById('results');
const questionElement = document.getElementById('question');
const feedbackElement = document.getElementById('feedback');
const summaryTable = document.getElementById('summary-table').querySelector('tbody');
const summaryElement = document.getElementById('summary');
const poetButton = document.getElementById('poet-button');
const rapperButton = document.getElementById('rapper-button');
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
    poetButton.disabled = false;
    rapperButton.disabled = false;
    nextButton.style.display = 'none';
}

// Válasz feldolgozása
function handleAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    userAnswers[currentQuestionIndex] = userAnswer; // Felhasználó válaszának rögzítése

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Eltaláltad!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = "Sajnos nem.";
        feedbackElement.style.color = "red";
    }

    poetButton.disabled = true;
    rapperButton.disabled = true;
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
        const songInfoCell = document.createElement('td');

        questionCell.textContent = questions[index].text;
        userAnswerCell.textContent = answer || "";
        correctAnswerCell.textContent = questions[index].answer;
        songInfoCell.textContent = `${questions[index].zeneElőadója}, ${questions[index].zeneCíme}`;

        if (answer !== null) answeredQuestions++; // Csak a megválaszolt kérdések számát növeli

        row.appendChild(questionCell);
        row.appendChild(userAnswerCell);
        row.appendChild(correctAnswerCell);
        row.appendChild(songInfoCell);
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

// Költő és Repper gombok eseménykezelői
poetButton.addEventListener('click', () => handleAnswer("költő"));
rapperButton.addEventListener('click', () => handleAnswer("repper"));