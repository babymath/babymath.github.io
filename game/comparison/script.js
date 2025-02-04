let timerInterval;
let timeElapsed = 0;

// Run when the page loads
document.addEventListener("DOMContentLoaded", () => {
    generateQuestions();
    startTimer();
});

// Start Timer
function startTimer() {
    clearInterval(timerInterval);
    timeElapsed = 0;
    const timerElement = document.getElementById('timer');

    timerInterval = setInterval(() => {
        timeElapsed++;
        timerElement.textContent = `⏱️ Time: ${timeElapsed}s`;
    }, 1000);
}

// Generate 25 Random Questions
function generateQuestions() {
    const form = document.getElementById('comparison-form');
    form.innerHTML = '';

    for (let i = 1; i <= 25; i++) {
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);
        const correctAnswer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';

        const question = document.createElement('div');
        question.classList.add('question');
        question.setAttribute('data-answer', correctAnswer);
        question.innerHTML = `
            <span>${i}. ${num1}</span>
            <div class="btn-group">
                <button type="button" onclick="selectAnswer(this, '>')">&gt;</button>
                <button type="button" onclick="selectAnswer(this, '<')">&lt;</button>
                <button type="button" onclick="selectAnswer(this, '=')">=</button>
            </div>
            <span>${num2}</span>
            <div class="error-message" style="display: none;">Please select an answer!</div>
        `;
        form.appendChild(question);
    }
}

// Select Answer
function selectAnswer(button, answer) {
    const questionDiv = button.closest('.question');
    questionDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    questionDiv.setAttribute('data-selected', answer);

    // Remove error message when an answer is selected
    questionDiv.classList.remove('unanswered');
    questionDiv.querySelector('.error-message').style.display = 'none';
}

// Check Answers
function checkAnswers() {
    const questions = document.querySelectorAll('.question');
    let score = 0;
    let hasUnanswered = false;

    questions.forEach(question => {
        const correctAnswer = question.getAttribute('data-answer');
        const userAnswer = question.getAttribute('data-selected');

        question.classList.remove('correct', 'incorrect', 'unanswered');
        question.querySelector('.error-message').style.display = 'none';

        if (!userAnswer) {
            hasUnanswered = true;
            question.classList.add('unanswered');
            question.querySelector('.error-message').style.display = 'block';
        } else if (userAnswer === correctAnswer) {
            score++;
            question.classList.add('correct');
        } else {
            question.classList.add('incorrect');
        }
    });

    clearInterval(timerInterval);

    const resultDiv = document.getElementById('result');
    if (hasUnanswered) {
        resultDiv.innerHTML = `<strong>⚠️ Please answer all questions before submitting!</strong>`;
    } else {
        resultDiv.innerHTML = `🎯 You got <strong>${score}</strong> out of <strong>${questions.length}</strong> correct!<br>⏱️ Time Taken: <strong>${timeElapsed} seconds</strong>`;
    }
}

// Reset Quiz
function resetQuiz() {
    clearInterval(timerInterval);
    document.getElementById('result').innerHTML = '';
    generateQuestions();
    startTimer();
}
