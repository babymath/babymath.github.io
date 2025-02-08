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
let questionTimer;
let currentTarget = 0;
let streak = 0;
let maxTime = 10;

function getRandomNumber() {
    return Math.floor(Math.random() * (10 + Math.floor(score / 5))); 
}

function startGame() {
    score = 0;
    streak = 0;
    popup.style.display = "none";
    updateUI();
    generateBubbles();
}

function updateUI() {
    scoreElement.textContent = score;
}

function generateBubbles() {
    clearInterval(questionTimer);
    timeLeft = maxTime;
    timerElement.textContent = timeLeft;
    timerBar.style.width = "100%";
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

function handleAnswer(num) {
    if (num === currentTarget) {
        score += ++streak;
        updateUI();
        generateBubbles();
    } else {
        endGame();
    }
}

function endGame() {
    finalScoreElement.textContent = score;
    popup.style.display = "block";
}

okButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
startGame();
