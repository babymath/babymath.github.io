$(document).ready(function() {
    let num1, num2, correctAnswer;
    let questionCount = 0;
    const totalQuestions = 10;
    let startTime, timerInterval;
    let digitCount = 1;

    // Start Game
    $('#start-btn').click(function() {
        digitCount = parseInt($('#digit-select').val());
        questionCount = 0;
        $('#result, #timer').text('');
        $('#start-btn, #digit-select').hide();
        $('#game-area, #restart-btn').show();
        $('#answer').val('').focus();
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
        generateQuestion();
    });

    // Update Timer
    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
        $('#timer').text(`Time: ${elapsedTime} s`);
    }

    // Generate New Question
    function generateQuestion() {
        let min = (digitCount === 1) ? 0 : Math.pow(10, digitCount - 1);
        let max = Math.pow(10, digitCount) - 1;

        do {
            num1 = Math.floor(Math.random() * (max - min + 1)) + min;
            num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (num1 === num2);

        correctAnswer = num1 + num2;
        $('#question').text(`Question ${questionCount + 1}: What is ${num1} + ${num2}?`);
        $('#answer').focus();
    }

    // Check Answer
    function checkAnswer() {
        const userAnswer = parseInt($('#answer').val());
        const $answerInput = $('#answer');

        if (userAnswer === correctAnswer) {
            questionCount++;
            $answerInput.val('').removeClass('wrong').attr('placeholder', 'Enter your answer');

            if (questionCount < totalQuestions) {
                generateQuestion();
            } else {
                clearInterval(timerInterval);
                const finalTime = $('#timer').text().split(' ')[1];
                $('#result').text(`🎉 Game Over! Total Time: ${finalTime}`);
                $('#game-area').hide();
            }
        } else {
            $answerInput.addClass('wrong').val('').attr('placeholder', 'Wrong! Try again.');
            setTimeout(() => $answerInput.removeClass('wrong').attr('placeholder', 'Enter your answer'), 1500);
            $answerInput.focus();
        }
    }

    // Submit Answer on Button Click
    $('#submit-btn').click(checkAnswer);

    // Submit Answer on Enter Key
    $(document).keydown(function(event) {
        if (event.key === 'Enter' && $('#game-area').is(':visible')) {
            checkAnswer();
        }
    });

    // Restart Game
    $('#restart-btn').click(function() {
        clearInterval(timerInterval);
        $('#start-btn, #digit-select').show();
        $('#restart-btn, #game-area').hide();
        $('#result').text('');
        $('#timer').text('Time: 0.00 s');
        $('#question').text('Press "Start Game" to begin!');
    });
});
