let totalTime, totalQuestions, minuendDigits, subtrahendDigits;
let timeLeft, currentQuestion = 0, correctAnswer, timer;

// Option Selection
$('.option').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    if ($(this).hasClass('time-option')) totalTime = $(this).data('time');
    if ($(this).hasClass('question-option')) totalQuestions = $(this).data('questions');
    if ($(this).hasClass('minuend-option')) minuendDigits = $(this).data('digits');
    if ($(this).hasClass('subtrahend-option')) subtrahendDigits = $(this).data('digits');

    checkReady();
});

// Enable Start Button
function checkReady() {
    if (totalTime && totalQuestions && minuendDigits && subtrahendDigits) {
        $('#start-game').fadeIn();
    }
}

// Start Game
$('#start-game').click(function () {
    $('#setup').hide();
    $('#game').fadeIn();
    $('#restart').show();
    startGame();
});

// Game Logic
function startGame() {
    currentQuestion = 0;
    timeLeft = totalTime;
    updateStatus();

    timer = setInterval(() => {
        timeLeft--;
        updateStatus();
        if (timeLeft <= 0) endGame();
    }, 1000);

    generateProblem();
}

// Update Timer and Questions
function updateStatus() {
    $('#timer').text(`⏳ Time Left: ${timeLeft}s`);
    $('#remaining').text(`❓ Questions Left: ${totalQuestions - currentQuestion}`);
}

// Generate Subtraction Problem
function generateProblem() {
    let num1 = Math.floor(Math.random() * Math.pow(10, minuendDigits));
    let num2 = Math.floor(Math.random() * Math.pow(10, subtrahendDigits));
    if (num2 > num1) [num1, num2] = [num2, num1];

    correctAnswer = num1 - num2;
    $('#problem').text(`${num1} - ${num2} = ?`);
    $('#answer').val('').attr('placeholder', 'Enter your answer').focus();
}

// Submit Answer
function submitAnswer() {
    const userAnswer = parseInt($('#answer').val());

    if (userAnswer === correctAnswer) {
        currentQuestion++;
        if (currentQuestion >= totalQuestions) {
            endGame();
        } else {
            generateProblem();
        }
    } else {
        $('#answer').val('').attr('placeholder', '❌ Try Again!');
    }
    updateStatus();
}

// Submit via Button
$('#submit').click(function () {
    submitAnswer();
});

// **Submit via Enter Key**
$('#answer').keypress(function (e) {
    if (e.which === 13) {
        submitAnswer();
    }
});

// End Game
function endGame() {
    clearInterval(timer);
    $('#game').hide();
    $('#result').show().text(`🎯 Game Over! Your Score: ${currentQuestion}/${totalQuestions}`);
    $('#restart').show();
}

// Restart Game
$('#restart').click(function () {
    clearInterval(timer);
    $('#result').hide();
    $('#game').hide();
    $('#setup').fadeIn();
    totalTime = totalQuestions = minuendDigits = subtrahendDigits = 0;
    $('.option').removeClass('active');
    $('#start-game').hide();
});
