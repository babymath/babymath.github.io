document.addEventListener("DOMContentLoaded", () => {
    let questionNumber = 0; // Track the question number
    let score = 0;
    let bestScore = localStorage.getItem("bestScore") ? parseInt(localStorage.getItem("bestScore")) : 0; // Get best score from localStorage
    let correctNumber = 0; // Store the correct number
    let correctAnswers = 0; // Track the number of correct answers
    let totalTime = 0; // Track total time taken
    let totalQuestions = 0; // Track total number of questions
    let startTime = Date.now(); // Start time for the game
    let gameStartTime = Date.now(); // To track actual game start time for timer
    let timerInterval;

    // Display best score in the "Best Score" element
    document.getElementById("bestScore").textContent = bestScore;

    function generateQuestion() {
        questionNumber++; // Increment question number
        document.getElementById("questionCount").textContent = questionNumber; // Show only the number

        correctNumber = Math.floor(Math.random() * 999) + 1; // Generates a number from 1 to 999

        // Convert number to words
        const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

        function numberToWords(num) {
            if (num === 0) return "zero";
            let words = "";

            if (num >= 100) {
                words += ones[Math.floor(num / 100)] + " hundred";
                if (num % 100 !== 0) words += " ";
                num %= 100;
            }

            if (num >= 11 && num <= 19) {
                words += teens[num - 11];
            } else {
                words += tens[Math.floor(num / 10)];
                if (num % 10 > 0) {
                    words += (words ? " " : "") + ones[num % 10];
                }
            }
            return words.trim();
        }

        document.getElementById("question").textContent = numberToWords(correctNumber); // Show in words

        // Create answer bubbles with one correct answer
        createBubbles(correctNumber);
    }

    // Function to create 15 bubbles
    function createBubbles(correctNumber) {
        const answerDiv = document.getElementById("answer");
        answerDiv.innerHTML = ''; // Clear previous bubbles

        let numbers = new Set();
        numbers.add(correctNumber); // Ensure the correct number is included

        while (numbers.size < 15) {
            let randomNum = Math.floor(Math.random() * 999) + 1;
            numbers.add(randomNum);
        }

        let bubbles = Array.from(numbers).sort(() => Math.random() - 0.5); // Shuffle the bubbles

        bubbles.forEach(num => {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.textContent = num; // Assign number to bubble
            bubble.onclick = () => checkAnswer(num, correctNumber); // Add click event
            answerDiv.appendChild(bubble);
        });
    }

    // Function to check if the clicked number is correct
    function checkAnswer(selectedNumber, correctNumber) {
        totalQuestions++; // Increment total questions

        if (selectedNumber === correctNumber) {
            correctAnswers++; // Increase the count of correct answers
            score = calculateScore(); // Recalculate the score
            generateQuestion(); // Load the next question
        }
    }

    // Function to calculate the score based on time and questions
    function calculateScore() {
        totalTime = Math.floor((Date.now() - gameStartTime) / 1000); // Calculate time in seconds
        let score = (correctAnswers / totalQuestions) * 100 - (totalTime / totalQuestions);
        return Math.max(0, score); // Ensure score doesn't go negative
    }

    // Start the timer when the game starts
    function startTimer() {
        timerInterval = setInterval(() => {
            totalTime = Math.floor((Date.now() - gameStartTime) / 1000); // Calculate time in seconds
            document.getElementById("timer").textContent = totalTime; // Display time in the timer element
        }, 1000); // Update every second
    }

    // Function to show game result and hide game part
    function endGame() {
        // Update the result window with scores
        document.getElementById("bestScore1").textContent = bestScore; // Update best score
        document.getElementById("yourScore").textContent = score; // Update user's score

        // Check if current score is higher than best score
        if (score > bestScore) {
            bestScore = score; // Update best score
            localStorage.setItem("bestScore", bestScore); // Save new best score to localStorage
        }

        // Update the Best Score element
        document.getElementById("bestScore").textContent = bestScore;

        // Hide the game container and show the result window
        document.getElementById("game-container").classList.add("hidden"); // Hide game part
        document.getElementById("result-window").classList.remove("hidden"); // Show result window

        clearInterval(timerInterval); // Stop the timer
    }

    // Restart game function
    function restartGame() {
        score = 0;
        correctAnswers = 0;
        totalQuestions = 0;
        totalTime = 0;
        gameStartTime = Date.now(); // Reset the game start time
        startTimer(); // Restart the timer

        // Hide result window and show game part again
        document.getElementById("result-window").classList.add("hidden"); // Hide result window
        document.getElementById("game-container").classList.remove("hidden"); // Show game part again

        generateQuestion(); // Start a new game
    }

    // Attach event listeners AFTER DOM is loaded
    let endButton = document.getElementById("btn-end");
    let restartButton = document.getElementById("btn-restart");

    if (endButton) {
        endButton.addEventListener("click", endGame);
    }

    if (restartButton) {
        restartButton.addEventListener("click", restartGame);
    }

    // Start the game
    startTimer(); // Start the timer immediately
    generateQuestion();
});
