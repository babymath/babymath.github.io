let num1, num2, correctAnswer;
let questionCount = 0;
let startTime, totalTime = 0;
let gameEnded = false;
let timerInterval;
let lives = 3;

// Start Game
function startGame() {
    gameEnded = false;
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
    if (userAnswer === correctAnswer && !gameEnded) {
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

// End Game (Fix: Ensures Result Window Shows)
function endGame() {
    if (gameEnded) return; // Prevent multiple calls

    gameEnded = true;
    clearInterval(timerInterval);

    saveHighScore(questionCount);
    let bestScore = getHighScore();

    // Hide game container and show result window
    document.querySelector(".game-container").style.display = "none"; // Hide game container
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.remove("hidden"); // Ensure it's visible
    resultWindow.style.display = "block"; // Set display to block

    document.getElementById("final-result").innerHTML = `
        <strong>Best Score:</strong> ${bestScore} <br>
        <strong>Your Score:</strong> ${questionCount} <br>
        <strong>Total Questions Attempted:</strong> ${questionCount} <br>
        <strong>Total Time Taken:</strong> ${totalTime} seconds
    `;
}

// Restart Game (Fix: Properly Resets Everything)
function restartGame() {
    gameEnded = false;
    questionCount = 0;
    totalTime = 0;
    lives = 3;

    // Reset UI
    document.getElementById("questionCount").innerText = questionCount;
    document.getElementById("timer").innerText = "0";
    document.getElementById("answer").value = "";

    // Show game container and hide result window
    document.querySelector(".game-container").style.display = "block"; // Show game container
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.add("hidden"); // Hide result window
    resultWindow.style.display = "none"; // Ensure it's hidden

    startGame();
}

// Event Listeners
document.getElementById("btn-end").addEventListener("click", endGame);
document.getElementById("btn-restart").addEventListener("click", restartGame);

// Display best score on page load
document.getElementById("bestScore").innerText = getHighScore();

startGame();