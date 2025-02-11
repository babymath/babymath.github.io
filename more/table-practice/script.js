let num1, num2, correctAnswer;
let questionCount = 0;
let startTime, totalTime = 0;
let gameEnded = false;
let timerInterval;

// Start Game
function startGame() {
    gameEnded = false;
    questionCount = 0;
    totalTime = 0;
    
    document.getElementById("questionCount").innerText = questionCount;
    document.getElementById("timer").innerText = "0";
    document.getElementById("answer").value = "";

    // Display best score on game screen
    document.getElementById("bestScore").innerText = getHighScore();

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
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

// Calculate Final Score (Based on Time & Questions)
function calculateScore() {
    return questionCount * 10 - totalTime; // Simple formula for final score
}

// Save Best Score & Update UI
function saveHighScore(score) {
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        document.getElementById("bestScore").innerText = score; // ✅ Update best score in game screen
    }
}

// Get Best Score
function getHighScore() {
    return parseInt(localStorage.getItem("highScore")) || 0;
}

// End Game
function endGame() {
    if (gameEnded) return;

    gameEnded = true;
    clearInterval(timerInterval);

    let finalScore = calculateScore();
    saveHighScore(finalScore);
    let bestScore = getHighScore();

    // Hide game container and show result window
    document.querySelector(".game-container").style.display = "none";
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.remove("hidden");
    resultWindow.style.display = "block";

    document.getElementById("final-result").innerHTML = `
        <strong>Best Score:</strong> ${bestScore} <br>
        <strong>Your Score:</strong> ${finalScore}
    `;
}

// Restart Game
function restartGame() {
    gameEnded = false;

    // Show game container and hide result window
    document.querySelector(".game-container").style.display = "block";
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.add("hidden");
    resultWindow.style.display = "none";

    startGame();
}

// Event Listeners
document.getElementById("btn-end").addEventListener("click", endGame);
document.getElementById("btn-restart").addEventListener("click", restartGame);

// Display best score on page load
document.getElementById("bestScore").innerText = getHighScore();

startGame();

