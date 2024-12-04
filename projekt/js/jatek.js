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

let currentQuestionIndex = 0; // kérdések sora
let score = 0; //pontok
let totalQuestions = questions.length; //annyi kérdes amennyi sor a kérdésekben
let userAnswers = Array(totalQuestions).fill(null); // Felhasználó válaszai ((üres,null),alapból majd "költő", vagy "repper")

//
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

// Játék elindítása
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

// kérdés megjelenítése
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;
    feedbackElement.textContent = ""; // Visszajelzés törlése
    poetButton.disabled = false; //alapból kiválaszthatjuk költő vagy rapper
    rapperButton.disabled = false;
    nextButton.style.display = 'none'; //először válaszolnunk kell utánna jöhet a kövi kérdés
}

// felhasználó válaszának eltárolása pontszámitas
function handleAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer; // jovalasz lekérese
    userAnswers[currentQuestionIndex] = userAnswer; // Felhasználó válaszának rögzítése
    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Eltaláltad!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = "Sajnos nem.";
        feedbackElement.style.color = "red";
    }
    poetButton.disabled = true; //már nem lehet haszálni (elsötétül)
    rapperButton.disabled = true;
    nextButton.style.display = 'inline-block'; //amit a show questionnál letiltottunk most megjelenítjük
}

// Következő kérdés ha továb akarunk jatszani
nextButton.addEventListener('click', () => { // nem adtam nevet a függvénynek csak (arrow function)-t használok
    currentQuestionIndex++; //növelem a lépést
    if (currentQuestionIndex < totalQuestions) {
        showQuestion(); //kövi kérdés
    } else {
        endGame(); //elfogyott a kerdes befejezzuk a jatekot
    }
});

// Játék abbahagyása és eredmények megjelenítése
endGameButton.addEventListener('click', endGame);

function endGame() {
    gameScreen.style.display = 'none'; // kikapcsolom a játék gomjait (kezelőfelület nincs)
    resultsScreen.style.display = 'block'; // eredmények kiírása

    // Táblázat feltöltése
    summaryTable.innerHTML = ""; // Táblázat törlése ha újra játszunk lehessen 0-ról kezdeni
    let answeredQuestions = 0; // hany választ sdott a jatekos
    userAnswers.forEach((answer, index) => { //mivel alapból fel van töltve üres helyekkel végig megy az egész táblázaton és kiírja az egészet
        const row = document.createElement('tr');
        const questionCell = document.createElement('td');
        const userAnswerCell = document.createElement('td');
        const correctAnswerCell = document.createElement('td');
        const songInfoCell = document.createElement('td');
        //készítek egy sort és az oszlopokat
        questionCell.textContent = questions[index].text;
        userAnswerCell.textContent = answer || ""; //lehet üres is
        correctAnswerCell.textContent = questions[index].answer;
        songInfoCell.textContent = `${questions[index].zeneElőadója}, ${questions[index].zeneCíme}`;
        //eltároloom az értékekeket az adott sorhoz
        if (answer !== null) answeredQuestions++; // Csak a megválaszolt kérdések számát növeli
        //ha nem üres akkor növeli a válaszolt kérdések számát
        row.appendChild(questionCell);
        row.appendChild(userAnswerCell);
        row.appendChild(correctAnswerCell);
        row.appendChild(songInfoCell);
        summaryTable.appendChild(row); //hozzáadjuk az egész sort
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

// Költő és Repper gombok amikor költő vagy reppert kattintunk
poetButton.addEventListener('click', () => handleAnswer("költő"));
rapperButton.addEventListener('click', () => handleAnswer("repper"));