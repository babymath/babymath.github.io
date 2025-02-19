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
    document.getElementById("questionCount").innerText = questionCount + 1;
    document.getElementById("timer").innerText = "0";
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = false;  // Enable input field
    document.getElementById("btn-end").disabled = false; // Enable End Game button

    // Display best score on game screen
    document.getElementById("bestScore").innerText = getHighScore();

    clearInterval(timerInterval); // ✅ Prevent multiple timers
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

    if (Number.isInteger(userAnswer) && userAnswer === correctAnswer && !gameEnded) {
        questionCount++;
        document.getElementById("questionCount").innerText = questionCount;

        setTimeout(generateQuestion, 500); // ✅ Slight delay for better readability
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
    return Math.max(0, questionCount * 10 - totalTime); // ✅ Prevents negative scores
}

// Save Best Score & Update UI Immediately
function saveHighScore(score) {
    let highScore = getHighScore();
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
    document.getElementById("bestScore").innerText = getHighScore(); // ✅ Update best score in UI
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

    // Disable the input field and end game button
    document.getElementById("answer").disabled = true;
    document.getElementById("btn-end").disabled = true;

    // Hide game container and show result window with smooth transition
    document.getElementById("game-container").style.display = "none";
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.remove("hidden");
    resultWindow.style.display = "block";
    resultWindow.classList.add("fade-in");  // Add fade-in effect (CSS needed)

    document.getElementById("bestScore1").innerText = getHighScore();
    document.getElementById("yourScore").innerText = finalScore;
}

// Restart Game
function restartGame() {
    if (!gameEnded) return; // ✅ Prevent multiple restarts

    gameEnded = false;

    // Show game container and hide result window
    document.getElementById("game-container").style.display = "block";
    let resultWindow = document.getElementById("result-window");
    resultWindow.classList.add("hidden");
    resultWindow.style.display = "none";

    clearInterval(timerInterval); // ✅ Prevent multiple timers
    startGame();
}

// Event Listeners
document.getElementById("btn-end").addEventListener("click", endGame);
document.getElementById("btn-restart").addEventListener("click", restartGame);

// Display best score on page load
document.getElementById("bestScore").innerText = getHighScore();

startGame();
