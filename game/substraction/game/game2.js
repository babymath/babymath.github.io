let question = 1;
let timer;
let checkQuestionCount;
let time; // Define the time variable
let incorrectAnswers = 0; // Define the incorrectAnswers variable

const questionElement = document.getElementById('question1');
const timeElement = document.getElementById('time1');

function startGame() {
    console.log('startGame function called');
    time = 1;
    question = 1;
    document.getElementById("setup1").style.display = "none";
    document.getElementById("gameover1").style.display = "none";
    document.getElementById("play1").style.display = "flex";

    const selectedTimeMode = document.querySelector('.timeMode.selected-mode');
    const selectedQuestionMode = document.querySelector('.questionMode.selected-mode');

    if (selectedTimeMode) {
        initializeTimeMode(selectedTimeMode);
    } else if (selectedQuestionMode) {
        initializeQuestionMode(selectedQuestionMode);
    } else {
        console.log('No mode is selected');
    }

    generateQuestion();
}

function initializeTimeMode(selectedTimeMode) {
    console.log('initializeTimeMode function called');
    console.log('Time Mode is selected');
    time = parseInt(selectedTimeMode.getAttribute('data-value'));
    questionElement.textContent = `Question No: ${question}`;
    timeElement.textContent = `Time Left: ${time}`;
    timer = setInterval(() => {
        time--;
        timeElement.textContent = `Time Left: ${time}`;
        if (time <= 0) {
            clearInterval(timer);
            endGame(parseInt(selectedTimeMode.getAttribute('data-value')), question-1);
        }
    }, 1000);
}

function initializeQuestionMode(selectedQuestionMode) {
    console.log('initializeQuestionMode function called');
    console.log('Question Mode is selected');
    question = parseInt(selectedQuestionMode.getAttribute('data-value'));
    questionElement.textContent = `Question left: ${question}`;
    timeElement.textContent = `Time: ${time}`;
    time = 0;
    timer = setInterval(() => {
        time++;
        timeElement.textContent = `Time: ${time}`;
    }, 1000);
    checkQuestionCount = setInterval(() => {
        if (question <= 0) {
            clearInterval(timer);
            clearInterval(checkQuestionCount);
            endGame(time, parseInt(selectedQuestionMode.getAttribute('data-value')));
        }
    }, 1000);
}

function generateQuestion() {
    console.log('generateQuestion function called');
    const selectedQuestionType = document.querySelector('.typeOption.selected');
    let num1, num2;
    if (selectedQuestionType.dataset.value === '2-2') {
        num1 = Math.floor(Math.random() * 50 + 51); // num1 will be between 51 and 100
        num2 = Math.floor(Math.random() * 10 + 49); // num2 will be between 10 and 99
    } else if (selectedQuestionType.dataset.value === '3-3') {
        num1 = Math.floor(Math.random() * 500 + 501); // num1 will be between 501 and 1000
        num2 = Math.floor(Math.random() * 900 + 100); // num2 will be between 100 and 999
    } else {
        console.log('No question type is selected');
    }
    const questionTextElement = document.getElementById('questionText');
    questionTextElement.textContent = `${num1} - ${num2} =`;
    questionTextElement.dataset.answer = num1 - num2;
}

function checkAnswer() {
    console.log('checkAnswer function called');
    const userAnswer = parseInt(document.getElementById('answer1').value);
    const correctAnswer = parseInt(document.getElementById('questionText').dataset.answer);
    const answerInput = document.getElementById('answer1');
    if (userAnswer === correctAnswer) {
        console.log('Correct');
        if (document.querySelector('.timeMode.selected-mode')) {
            question++;
            questionElement.textContent = `Question No: ${question}`;
        } else if (document.querySelector('.questionMode.selected-mode')) {
            question--;
            questionElement.textContent = `Question Remaining: ${question}`;
            if (question == 0) {
                clearInterval(timer);
                clearInterval(checkQuestionCount);
                endGame(time, parseInt(document.querySelector('.questionMode.selected-mode').getAttribute('data-value')));
            }
        }
        generateQuestion();
    } else {
        console.log('Incorrect');
        incorrectAnswers++; // Increment incorrectAnswers
        answerInput.classList.add('incorrect');
        setTimeout(() => {
            answerInput.classList.remove('incorrect');
        }, 500);
    }
    answerInput.value = '';
    answerInput.focus(); // Ensure the input box retains autofocus
}

function endGame(totalTime, totalQuestions) {
    console.log('endGame function called');
    document.getElementById("setup1").style.display = "none";
    document.getElementById("play1").style.display = "none";
    document.getElementById("gameover1").style.display = "flex";
    document.getElementById("totalTime").textContent = `Total Time: ${totalTime}`;
    document.getElementById("totalQuestion").textContent = `Total Questions: ${totalQuestions}`;

    const correctAnswers = totalQuestions;
    const score = calculateScore(correctAnswers, incorrectAnswers, totalTime);
    document.getElementById("score1").textContent = `Score: ${score}`;
}

function playAgain() {
    console.log('playAgain function called');
    document.getElementById("gameover1").style.display = "none";
    document.getElementById("play1").style.display = "flex";
    startGame();
}

function backToSetup() {
    console.log('backToSetup function called');
    document.getElementById("gameover1").style.display = "none";
    document.getElementById("play1").style.display = "none";
    document.getElementById("setup1").style.display = "flex";
    const selectedTimeMode = document.querySelector('.timeMode.selected-mode');
    if (selectedTimeMode) {
        selectedTimeMode.classList.remove('selected-mode');
    }

    const selectedQuestionMode = document.querySelector('.questionMode.selected-mode');
    if (selectedQuestionMode) {
        selectedQuestionMode.classList.remove('selected-mode');
    }

    const selectedQuestionType = document.querySelector('.typeOption.selected');
    if (selectedQuestionType) {
        selectedQuestionType.classList.remove('selected');
    }
}

function calculateScore(correctAnswers, incorrectAnswers, totalTime) {
    console.log('calculateScore function called');
    const score = (correctAnswers * 100 - incorrectAnswers * 90) / totalTime;
    return Math.round(score);
}