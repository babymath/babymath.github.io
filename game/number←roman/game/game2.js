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

function generateQuestion() {// Question generation logic
    console.log('generateQuestion function called');
    
    const selectedQuestionType = document.querySelector('.typeOption.selected');
    if (!selectedQuestionType) {
        console.log('No question type is selected');
        return;
    }

    let num1, num2;
    
    function numberToRoman(num) {
        if (num > 3999) {
            console.log('Roman numeral conversion only supports numbers up to 3999.');
            return "Out of range";
        }
        
        const romanNumerals = [
            { value: 1000, symbol: "M" },
            { value: 900, symbol: "CM" },
            { value: 500, symbol: "D" },
            { value: 400, symbol: "CD" },
            { value: 100, symbol: "C" },
            { value: 90, symbol: "XC" },
            { value: 50, symbol: "L" },
            { value: 40, symbol: "XL" },
            { value: 10, symbol: "X" },
            { value: 9, symbol: "IX" },
            { value: 5, symbol: "V" },
            { value: 4, symbol: "IV" },
            { value: 1, symbol: "I" }
        ];
    
        let romanStr = "";
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                romanStr += romanNumerals[i].symbol;
                num -= romanNumerals[i].value;
            }
        }
        return romanStr;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (selectedQuestionType.dataset.value === '1to99') {
        num1 = getRandomNumber(1, 99);
    } else if (selectedQuestionType.dataset.value === 'morethen99') {
        num1 = getRandomNumber(100, 3999);  // Limited to 3999
    } else {
        console.log('Invalid question type');
        return;
    }

    num2 = numberToRoman(num1);
    if (num2 === "Out of range") return;

    const questionTextElement = document.getElementById('questionText');
    if (!questionTextElement) {
        console.error('Element with id "questionText" not found.');
        return;
    }

    questionTextElement.textContent = `${num2}`;
    questionTextElement.dataset.answer = num1;
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
            questionElement.textContent = `Question Left: ${question}`;
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
