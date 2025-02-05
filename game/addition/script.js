document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const gamePage = document.getElementById('game-page');
    const resultPage = document.getElementById('result-page');

    const digitSelect = document.getElementById('digit-select');
    const timeOptionDiv = document.getElementById('time-option');
    const questionsOptionDiv = document.getElementById('questions-option');

    const gameTimeOption = document.getElementById('game-time-option');
    const gameQuestionsOption = document.getElementById('game-questions-option');

    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submit-btn');
    const timerElement = document.getElementById('timer');

    const restartBtn = document.getElementById('restart-btn');
    const restartBtnResult = document.getElementById('restart-btn-result');

    const finalTime = document.getElementById('final-time');
    const totalQuestionsAnswered = document.getElementById('total-questions-answered');

    let correctAnswer, questionCount, startTime, timerInterval;
    let totalTimeLimit = 0, totalQuestions = 0, gameMode = '';
    let digitCount = 1;

    // Game Mode Selection
    gameTimeOption.addEventListener('click', () => {
        timeOptionDiv.classList.remove('hidden');
        questionsOptionDiv.classList.add('hidden');
        gameMode = 'time';
    });

    gameQuestionsOption.addEventListener('click', () => {
        questionsOptionDiv.classList.remove('hidden');
        timeOptionDiv.classList.add('hidden');
        gameMode = 'questions';
    });

    // Start Game for Time Limit
    document.querySelectorAll('.time-btn').forEach(button => {
        button.addEventListener('click', () => {
            totalTimeLimit = parseInt(button.dataset.time) * 1000;
            startGame();
        });
    });

    // Start Game for Question Limit
    document.querySelectorAll('.questions-btn').forEach(button => {
        button.addEventListener('click', () => {
            totalQuestions = parseInt(button.dataset.questions);
            startGame();
        });
    });

    function startGame() {
        digitCount = parseInt(digitSelect.value);
        questionCount = 0;
        startTime = Date.now();
        homePage.classList.add('hidden');
        gamePage.classList.remove('hidden');
        restartBtn.classList.remove('hidden');

        timerInterval = setInterval(updateTimer, 100); // Start timer for both modes
        generateQuestion();
    }

    function updateTimer() {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        timerElement.textContent = `⏱ Time: ${elapsed} s`;

        if (gameMode === 'time' && Date.now() - startTime >= totalTimeLimit) {
            clearInterval(timerInterval);
            endGame();
        }
    }

    function generateQuestion() {
        const min = digitCount === 1 ? 0 : Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;

        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

        correctAnswer = num1 + num2;
        questionText.textContent = `What is ${num1} + ${num2}?`;
        questionNumber.textContent = questionCount + 1;

        // Reset input field after each question
        answerInput.value = '';
        answerInput.placeholder = 'Enter your answer here';
        answerInput.focus();
    }

    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === correctAnswer) {
            questionCount++;
            if (gameMode === 'questions' && questionCount >= totalQuestions) {
                endGame();
            } else {
                generateQuestion(); // Move to next question
            }
        } else {
            // Reset input and show wrong answer message in placeholder
            answerInput.value = '';
            answerInput.placeholder = 'Wrong answer, try again!';
        }
    }

    function endGame() {
        clearInterval(timerInterval);
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        finalTime.textContent = `Total Time: ${totalTime} seconds`;
        totalQuestionsAnswered.textContent = `Total Questions Answered: ${questionCount}`;

        gamePage.classList.add('hidden');
        resultPage.classList.remove('hidden');
    }

    restartBtn.addEventListener('click', resetGame);
    restartBtnResult.addEventListener('click', resetGame);

    function resetGame() {
        clearInterval(timerInterval);
        homePage.classList.remove('hidden');
        gamePage.classList.add('hidden');
        resultPage.classList.add('hidden');
        timerElement.textContent = '⏱ Time: 0.00 s';
    }
});
