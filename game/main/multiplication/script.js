        let correctAnswer, questionCount = 0, maxQuestions, timer, timeLeft, startTime, timeElapsed = 0;

        function setTimeLimit(seconds) {
            document.querySelector('input[name="mode"][value="time"]').checked = true;
            timeLeft = seconds;
            highlightSelectedButton("time-buttons", event.target);
        }

        function setQuestionLimit(questions) {
            document.querySelector('input[name="mode"][value="questions"]').checked = true;
            maxQuestions = questions;
            highlightSelectedButton("question-buttons", event.target);
        }

        function highlightSelectedButton(groupClass, selectedButton) {
            document.querySelectorAll(`.${groupClass} button`).forEach(btn => btn.classList.remove("selected"));
            selectedButton.classList.add("selected");
        }

        function startGame() {
            document.getElementById('setup').classList.add('hidden');
            document.getElementById('game').classList.remove('hidden');

            let mode = document.querySelector('input[name="mode"]:checked').value;
            let questionType = document.getElementById('questionType').value;

            if (mode === 'questions' && !maxQuestions) maxQuestions = 15;
            if (mode === 'time' && !timeLeft) timeLeft = 60;

            questionCount = 0;
            startTime = new Date();

            if (mode === "time") {
                document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
                timer = setInterval(() => {
                    timeLeft--;
                    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
                    if (timeLeft <= 0) endGame();
                }, 1000);
            } else {
                timeElapsed = 0;
                document.getElementById('timer').textContent = `Timer: ${timeElapsed}s`;
                timer = setInterval(() => {
                    timeElapsed++;
                    document.getElementById('timer').textContent = `Timer: ${timeElapsed}s`;
                }, 1000);
            }

            nextQuestion(questionType);
        }

        function nextQuestion(type) {
            questionCount++;
            let mode = document.querySelector('input[name="mode"]:checked').value;

            if (mode === "questions") {
                document.getElementById('question-count').textContent = `Questions Left: ${maxQuestions - questionCount}`;
            } else {
                document.getElementById('question-count').textContent = `Question: ${questionCount}`;
            }

            if (mode === "questions" && questionCount > maxQuestions) {
                return endGame();
            }

	let num1, num2;
		if (type === "2x1") {
			num1 = Math.floor(Math.random() * 90) + 10;
			num2 = Math.floor(Math.random() * 9 ) + 1;
		} else if (type === "3x1") {
			num1 = Math.floor(Math.random() * 900) + 100;
			num2 = Math.floor(Math.random() * 9  ) + 1;
		} else {
			num1 = Math.floor(Math.random() * 90) + 10;
			num2 = Math.floor(Math.random() * 90) + 10;
		}
            
            correctAnswer = num1 * num2;
            document.getElementById('question').textContent = `${num1} × ${num2} = ?`;
            let answerBox = document.getElementById('answer');
            answerBox.value = '';
            answerBox.classList.remove('error');
            answerBox.placeholder = "Enter your answer";
            answerBox.focus();
        }

        function checkEnter(event) {
            if (event.key === 'Enter') submitAnswer();
        }

        function submitAnswer() {
            let answerBox = document.getElementById('answer');
            let userAnswer = parseInt(answerBox.value);

            if (userAnswer === correctAnswer) {
                nextQuestion(document.getElementById('questionType').value);
            } else {
                answerBox.classList.add("error");
                answerBox.value = "";
                answerBox.placeholder = "Wrong! Try again.";
            }
        }

        function endGame() {
            clearInterval(timer);
            let totalTime = Math.round((new Date() - startTime) / 1000);
            document.getElementById('final-score').textContent = `Total Questions Answered: ${questionCount}`;
            document.getElementById('final-time').textContent = `Total Time Taken: ${totalTime} seconds`;
            document.getElementById('game').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');
        }

        function restartGame() {
            clearInterval(timer);
            document.getElementById('setup').classList.remove('hidden');
            document.getElementById('game').classList.add('hidden');
            document.getElementById('result').classList.add('hidden');
        }