const targetNumber = document.getElementById("target-number");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");
const bubbleContainer = document.getElementById("bubble-container");
const restartButton = document.getElementById("restart-btn");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const leaderboardElement = document.getElementById("leaderboard");

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
    for (let i = 1; i < 10; i++) {
        numbers.push(getRandomNumber());
    }

    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(num => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = num;
        bubble.addEventListener("click", () => handleAnswer(num, bubble));
        bubbleContainer.appendChild(bubble);
    });

    startTimer();
}

function startTimer() {
    clearInterval(questionTimer);
    questionTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        timerBar.style.width = (timeLeft / maxTime) * 100 + "%";
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function handleAnswer(num, bubble) {
    if (num === currentTarget) {
        streak++;
        score += streak;
    } else {
        endGame();
    }
    updateUI();
    generateBubbles();
}

function endGame() {
    saveScore();
    popupMessage.textContent = `Your Score: ${score}`;
    updateLeaderboard();
    popup.style.display = "block";
}

function saveScore() {
    let scores = JSON.parse(localStorage.getItem("highScores")) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem("highScores", JSON.stringify(scores.slice(0, 5)));
}

function updateLeaderboard() {
    leaderboardElement.innerHTML = JSON.parse(localStorage.getItem("highScores") || "[]")
        .map(s => `<li>${s}</li>`).join("");
}

restartButton.addEventListener("click", startGame);
startGame();
