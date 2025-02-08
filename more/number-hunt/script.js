const targetNumber = document.getElementById("target-number");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");
const bubbleContainer = document.getElementById("bubble-container");
const restartButton = document.getElementById("restart-btn");
const popup = document.getElementById("popup");
const finalScoreElement = document.getElementById("final-score");
const highScoreElement = document.getElementById("high-score");
const okButton = document.getElementById("ok-btn");

let score = 0;
let timeLeft = 10;
let maxTime = 10;
let currentTarget = 0;
let highScore = localStorage.getItem("highScore") || 0;

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
}

function generateBubbles() {
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
}

function startTimer() {
    let timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        timerBar.style.width = (timeLeft / maxTime) * 100 + "%";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
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
    finalScoreElement.textContent = score;
    highScore = Math.max(score, highScore);
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = highScore;
    popup.style.display = "block";
}

okButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
startGame();