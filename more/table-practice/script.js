let num1, num2, correctAnswer;
let questionCount = 0;
let startTime, totalTime = 0;
let gameEnded = false;
let timerInterval;
let lives = 3;

// Start Game
function startGame() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    updateLivesUI();
    generateQuestion();
}

// Generate New Question
function generateQuestion() {
    if (gameEnded) return;

    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;

    document.getElementById("question").innerText = `${num1} × ${num2} = ?`;
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

// Auto-Submit Answer
document.getElementById("answer").addEventListener("input", function () {
    let userAnswer = parseInt(this.value);
    if (userAnswer === correctAnswer) {
        questionCount++;
        document.getElementById("questionCount").innerText = questionCount;
        setTimeout(generateQuestion, 300);
    }
});

// Update Timer
function updateTimer() {
    if (!gameEnded) {
        totalTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").innerText = totalTime;
    }
}

// Update Lives UI
function updateLivesUI() {
    let livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";

    for (let i = 0; i < lives; i++) {
        let heart = document.createElement("span");
        heart.innerHTML = "❤️";
        heart.style.fontSize = "20px";

        if (lives === 1) {
            heart.classList.add("flash");
        }

        livesContainer.appendChild(heart);
    }
}

// Save Best Score
function saveHighScore(score) {
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
}

// Get Best Score
function getHighScore() {
    return parseInt(localStorage.getItem("highScore")) || 0;
}

// End Game
function endGame() {
    gameEnded = true;
    clearInterval(timerInterval);
    
    saveHighScore(questionCount);
    let bestScore = getHighScore();

    document.getElementById("result-window").style.display = "block";
    document.getElementById("final-result").innerHTML = `
        <strong>Best Score:</strong> ${bestScore} <br>
        <strong>Your Score:</strong> ${questionCount} <br>
        <strong>Total Questions Attempted:</strong> ${questionCount} <br>
        <strong>Total Time Taken:</strong> ${totalTime} seconds
    `;
}

// Restart Game
function restartGame() {
    gameEnded = false;
    questionCount = 0;
    totalTime = 0;
    lives = 3;
    document.getElementById("result-window").style.display = "none";
    startGame();
}

// Display best score on page load
document.getElementById("bestScore").innerText = getHighScore();

startGame();