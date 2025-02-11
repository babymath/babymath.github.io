let num1, num2, correctAnswer;
let questionCount = 0;
let startTime, totalTime = 0;
let gameEnded = false;
let timerInterval;

function startGame() {
    gameEnded = false;
    questionCount = 0;
    totalTime = 0;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById("game-container").style.display = "block";
    document.getElementById("result-window").style.display = "none";
    generateQuestion();
}

function generateQuestion() {
    if (gameEnded) return;
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;
    document.getElementById("question").innerText = `${num1} × ${num2} = ?`;
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

document.getElementById("answer").addEventListener("input", function () {
    let userAnswer = parseInt(this.value);
    if (userAnswer === correctAnswer && !gameEnded) {
        questionCount++;
        document.getElementById("questionCount").innerText = questionCount;
        setTimeout(generateQuestion, 300);
    }
});

function updateTimer() {
    if (!gameEnded) {
        totalTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").innerText = totalTime;
    }
}

function calculateFinalScore() {
    return Math.round((questionCount ** 2) / (totalTime + 1));
}

function saveHighScore(score) {
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
}

function getHighScore() {
    return parseInt(localStorage.getItem("highScore")) || 0;
}

function endGame() {
    if (gameEnded) return;
    gameEnded = true;
    clearInterval(timerInterval);

    let finalScore = calculateFinalScore();
    saveHighScore(finalScore);
    let bestScore = getHighScore();

    document.getElementById("game-container").style.display = "none";
    document.getElementById("result-window").style.display = "block";

    document.getElementById("final-result").innerHTML = `
        <strong>Best Score:</strong> ${bestScore} <br>
        <strong>Your Score:</strong> ${finalScore}
    `;
}

function restartGame() {
    startGame();
}

document.getElementById("btn-end").addEventListener("click", endGame);
document.getElementById("btn-restart").addEventListener("click", restartGame);
document.getElementById("bestScore").innerText = getHighScore();

startGame();
