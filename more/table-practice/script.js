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
    document.getElementById("feedback").innerText = "";
    document.getElementById("answer").focus();
}

// Check Answer
function checkAnswer() {
    if (gameEnded) return;

    let userAnswer = document.getElementById("answer").value;

    if (userAnswer == correctAnswer) {
        questionCount++;
        document.getElementById("questionCount").innerText = questionCount;
        document.getElementById("feedback").innerText = "✅ Correct!";
        document.getElementById("feedback").style.color = "green";
        generateQuestion();
    } else {
        lives--;
        updateLivesUI();

        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

        document.getElementById("feedback").innerText = `❌ Wrong! ${lives} lives left.`;
        document.getElementById("feedback").style.color = "red";

        if (lives === 0) {
            setTimeout(endGame, 1000);
        }
    }
}

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

// End Game
function endGame() {
    gameEnded = true;
    clearInterval(timerInterval);
    document.getElementById("question").innerText = "🎉 Game Over!";
    document.getElementById("feedback").innerText = `Total Questions: ${questionCount}, Time: ${totalTime} seconds`;
    document.getElementById("restart").style.display = "block";
}

// Restart Game
function restartGame() {
    gameEnded = false;
    questionCount = 0;
    totalTime = 0;
    lives = 3;
    document.getElementById("restart").style.display = "none";
    startGame();
}

// Handle Enter Key
document.getElementById("answer").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

startGame();
