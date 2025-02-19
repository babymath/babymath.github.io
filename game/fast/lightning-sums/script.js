// Lighting Sum



let numCount = 2; // Number of addends to start with
let correctStreak = 0; // Correct streak to increase difficulty
let questionCount = 0; // Total questions answered
let correctSum = 0; // Correct sum for each question
let startTime, totalTime = 0; // Game start time and total time
let gameEnded = false; // Track if the game has ended
let timerInterval; // Timer interval for updating the countdown

// Start Game
function startGame() {
    gameEnded = false;
    questionCount = 0;
    correctStreak = 0;
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

    let numbers = [];
    correctSum = 0;

    // Generate 'numCount' random numbers
    for (let i = 0; i < numCount; i++) {
        let randomNum = Math.floor(Math.random() * 10); // Generates a number between 0 and 9
        numbers.push(randomNum);
        correctSum += randomNum;
    }

    document.getElementById("question").innerText = numbers.join(" + ");
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

// Auto-Submit Answer
document.getElementById("answer").addEventListener("input", function () {
    let userAnswer = parseInt(this.value);

    if (userAnswer === correctSum) {
        correctStreak++;
        if (correctStreak % 4 === 0) {
            numCount++; // Increase addends after every 4 correct answers
        }
        questionCount++; // Increment question count
        document.getElementById("questionCount").innerText = questionCount + 1;
        generateQuestion(); // Instantly generate a new question
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

// Start the game
startGame();
