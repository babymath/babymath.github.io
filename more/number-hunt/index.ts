// Select elements
const targetNumber = document.getElementById("target-number") as HTMLElement;
const scoreElement = document.getElementById("score") as HTMLElement;
const timerElement = document.getElementById("timer") as HTMLElement;
const levelElement = document.getElementById("level") as HTMLElement;
const bubbleCountElement = document.getElementById("bubble-count") as HTMLElement;
const bubbleContainer = document.getElementById("bubble-container") as HTMLElement;
const restartButton = document.getElementById("restart-btn") as HTMLButtonElement;
const timerBar = document.getElementById("timer-bar") as HTMLElement;
const popup = document.getElementById("popup") as HTMLElement;
const popupMessage = document.getElementById("popup-message") as HTMLElement;
const overlay = document.getElementById("overlay") as HTMLElement;

let score: number = 0;
let timeLeft: number = 10;
let currentTarget: number = 0;
let questionTimer: number;
let numberRange: number = 10;
let numBubbles: number = 10;
let level: string = "Easy";
const maxBubbles: number = 20;

// Generate a random number avoiding duplicates
function getRandomNumber(max: number, avoid: number[] = []): number {
    let num: number;
    do {
        num = Math.floor(Math.random() * max);
    } while (avoid.includes(num));
    return num;
}

// Start the game
function startGame(): void {
    score = 0;
    level = "Easy";
    numberRange = 10;
    numBubbles = 10;
    updateUI();
    generateBubbles();
}

// Update UI elements
function updateUI(): void {
    scoreElement.textContent = score.toString();
    levelElement.textContent = level;
    bubbleCountElement.textContent = numBubbles.toString();
}

// Generate bubbles with random numbers
function generateBubbles(): void {
    clearInterval(questionTimer);
    timeLeft = 10;
    timerElement.textContent = timeLeft.toString();
    timerBar.style.width = "100%";
    bubbleContainer.innerHTML = "";

    let numbers: number[] = [];
    currentTarget = getRandomNumber(numberRange);
    targetNumber.textContent = currentTarget.toString();
    numbers.push(currentTarget);

    for (let i = 1; i < numBubbles; i++) {
        numbers.push(getRandomNumber(numberRange, numbers));
    }

    numbers.sort(() => Math.random() - 0.5);

    numbers.forEach(num => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = num.toString();
        bubble.addEventListener("click", () => handleAnswer(num));
        bubbleContainer.appendChild(bubble);
    });

    startQuestionTimer();
}

// Start timer countdown
function startQuestionTimer(): void {
    clearInterval(questionTimer);
    questionTimer = window.setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft.toString();
        timerBar.style.width = `${(timeLeft / 10) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            endGame();
        }
    }, 1000);
}

// Handle answer click
function handleAnswer(selectedNumber: number): void {
    clearInterval(questionTimer);

    if (selectedNumber === currentTarget) {
        score++;
        updateLevel();
        updateBubbles();
        setTimeout(generateBubbles, 300);
    } else {
        const wrongBubble = [...bubbleContainer.children].find(
            (bubble) => bubble.textContent === selectedNumber.toString()
        ) as HTMLElement;
        if (wrongBubble) {
            wrongBubble.classList.add("wrong");
        }
        setTimeout(endGame, 500);
    }

    updateUI();
}

// Update difficulty level based on score
function updateLevel(): void {
    if (score >= 15) {
        level = "Extreme";
        numberRange = 100;
    } else if (score >= 10) {
        level = "Hard";
        numberRange = 50;
    } else if (score >= 5) {
        level = "Medium";
        numberRange = 20;
    }
    updateUI();
}

// Increase bubbles as the game progresses
function updateBubbles(): void {
    if (score % 3 === 0 && numBubbles < maxBubbles) {
        numBubbles++;
    }
}

// End game and show popup
function endGame(): void {
    clearInterval(questionTimer);
    
    let highScore = Number(localStorage.getItem("highScore")) || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score.toString());
        popupMessage.innerHTML = `New High Score! 🏆<br>Your Score: ${score}`;
    } else {
        popupMessage.innerHTML = `Your Score: ${score}<br>High Score: ${highScore}`;
    }

    popup.style.display = "block";
    overlay.style.display = "block";
}

// Close popup and restart game
function closePopup(): void {
    popup.style.display = "none";
    overlay.style.display = "none";
    startGame();
}

// Event listeners
restartButton.addEventListener("click", startGame);
startGame();
