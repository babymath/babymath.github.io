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

    function numberToWords(num) {
        const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
        const placeValues = ["", "thousand", "lakh", "crore"];

        function convertLessThanThousand(n) {
            let word = "";
            if (n >= 100) {
                word += ones[Math.floor(n / 100)] + " hundred ";
                n %= 100;
            }
            if (n >= 11 && n <= 19) {
                word += teens[n - 10] + " ";
            } else if (n > 0) {
                word += tens[Math.floor(n / 10)] + " " + ones[n % 10] + " ";
            }
            return word.trim();
        }

        if (num < 10) return ones[num];
        if (num >= 11 && num <= 19) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? "-" + ones[num % 10] : "");

        let numParts = [];
        let place = 0;

        while (num > 0) {
            let chunk = num % 100;
            if (place === 0) chunk = num % 1000;

            if (chunk > 0) {
                numParts.unshift(convertLessThanThousand(chunk) + (placeValues[place] ? " " + placeValues[place] : ""));
            }

            num = Math.floor(num / (place === 0 ? 1000 : 100));
            place++;
        }

        return numParts.join(" ").trim();
    }

    if (selectedQuestionType.dataset.value === '1to99') {
        num1 = Math.floor(Math.random() * 99) + 1;
        num2 = numberToWords(num1);
    } else if (selectedQuestionType.dataset.value === 'morethen99') {
        num1 = Math.floor(Math.random() * (100000000 - 100 + 1)) + 100;
        num2 = numberToWords(num1);
    } else {
        console.log('No question type is selected');
        return;
    }

    const questionTextElement = document.getElementById('questionText');
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