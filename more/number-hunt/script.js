import { getHighScore, setHighScore } from "./highscore.js";

const targetNumber = document.getElementById("target-number");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");
const bubbleContainer = document.getElementById("bubble-container");
const restartButton = document.getElementById("restart-btn");
const popup = document.getElementById("popup");
const finalScoreElement = document.getElementById("final-score");
const highScorePopup = document.getElementById("high-score-popup");
const highScoreElement = document.getElementById("high-score");
const okButton = document.getElementById("ok-btn");

let score = 0;
let timeLeft = 10;
let maxTime = 10;
let currentTarget = 0;
let questionTimer;
let highScore = getHighScore();

function getRandomNumber() {
    return Math.floor(Math.random() * (10 + Math.floor(score / 5)));
}

function startGame() {
    score = 0;
    timeLeft = maxTime;
    popup.style.display = "none";
    updateUI();
    generateBubbles();
    startTimer();
}

function updateUI() {
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    highScoreElement.textContent = highScore;
}

function generateBubbles() {
    clearInterval(questionTimer);
    bubbleContainer.innerHTML = "";
    currentTarget = getRandomNumber();
    targetNumber.textContent = currentTarget;

    let numbers = [currentTarget];
    for (let i = 1; i < 15; i++) {
        numbers.push(getRandomNumber());
    }

    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(num => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = num;
        bubble.addEventListener("click", () => handleAnswer(num));
        bubbleContainer.appendChild(bubble);
    });

    startTimer();
}

function startTimer() {
    timeLeft = maxTime;
    updateUI();
    timerBar.style.width = "100%";

    questionTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        timerBar.style.width = (timeLeft / maxTime) * 100 + "%";

        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            endGame();
        }
    }, 1000);
}

function handleAnswer(num) {
    if (num === currentTarget) {
        score++;
        generateBubbles();
        updateUI();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(questionTimer);
    finalScoreElement.textContent = score;
    highScorePopup.textContent = highScore;

    if (score > highScore) {
        highScore = score;
        setHighScore(highScore);
    }

    highScoreElement.textContent = highScore;
    popup.style.display = "block";
}

okButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
updateUI();
startGame();