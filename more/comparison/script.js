let timerInterval;
let timeElapsed = 0;
let questionCount = 0;
let lives = 3;
let highestScore = localStorage.getItem("highestScore") || 0;
$("#highest-score").text(highestScore);

function startGame(mode) {
    $("#menu").hide();
    $("#game-content").show();
    resetGame(mode);
}

function resetGame(mode) {
    lives = 3;
    timeElapsed = 0;
    questionCount = 0;
    $("#lives").html("❤️❤️❤️");
    $("#timer").text("⏱️ 0s");
    $("#question-no").text("Question: 1");
    startTimer();
    generateQuestion(mode);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        $("#timer").text(`⏱️ ${timeElapsed}s`);
    }, 1000);
}

function generateQuestion(mode) {
    let num1, num2;
    if (mode === "easy") {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
    } else {
        num1 = (Math.random() * 100 - 50).toFixed(1);
        num2 = (Math.random() * 100 - 50).toFixed(1);
    }

    let correctAnswer = num1 > num2 ? ">" : num1 < num2 ? "<" : "=";
    $("#question-container").html(`
        <div>${num1} ? ${num2}</div>
        <button class="answer-btn" onclick="checkAnswer('>', '${correctAnswer}', '${mode}')">></button>
        <button class="answer-btn" onclick="checkAnswer('<', '${correctAnswer}', '${mode}')"><</button>
        <button class="answer-btn" onclick="checkAnswer('=', '${correctAnswer}', '${mode}')">=</button>
    `);
}

function checkAnswer(selected, correct, mode) {
    if (selected === correct) {
        questionCount++;
        $("#question-no").text(`Question: ${questionCount + 1}`);
        generateQuestion(mode);
    } else {
        lives--;
        updateLives();
        if (lives === 0) {
            endGame();
        } else {
            questionCount++;
            $("#question-no").text(`Question: ${questionCount + 1}`);
            generateQuestion(mode);
        }
    }
}

function updateLives() {
    let hearts = "❤️".repeat(lives);
    $("#lives").html(hearts);
}

function endGame() {
    clearInterval(timerInterval);
    $("#game-content").hide();
    $("#game-over").show();
    $("#final-score").text(`Final Score: ${questionCount}`);
    $("#total-time").text(`Total Time: ${timeElapsed}s`);
    $("#total-questions").text(`Total Questions: ${questionCount}`);

    if (questionCount > highestScore) {
        highestScore = questionCount;
        localStorage.setItem("highestScore", highestScore);
        $("#highest-score").text(highestScore);
    }
}

function restartGame() {
    $("#game-over").hide();
    $("#menu").show();
}
