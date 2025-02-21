$(document).ready(function () {
    let totalQuestions = 0, questionsLeft = 0, score = 0;
    let bestScore = localStorage.getItem("bestScore") || 0;
    let timerInterval, mode = "", value = 0;
    let questionNumber = 0, timeRemaining = 0, timeSpent = 0;

    $("#bestScore").text(bestScore);
    showWindow("#setup-window");

    function showWindow(windowId) {
        $(".window").hide();
        $(windowId).css("display", "flex");
    }

    function startGame(selectedMode, selectedValue) {
        clearInterval(timerInterval);
        score = 0;
        timeSpent = 0;
        questionNumber = 0;
        mode = selectedMode;
        value = selectedValue;

        showWindow("#game-window");
        $("#answer").val("").focus();

        if (mode === "question") {
            totalQuestions = value;
            questionsLeft = value;
            $("#counterWord").text("Time:");
            $("#counter").text(timeSpent);
            $("#leftTotal").text(`${questionsLeft} / ${totalQuestions}`);

            timerInterval = setInterval(() => {
                timeSpent++;
                $("#counter").text(timeSpent);
            }, 1000);

        } else if (mode === "time") {
            timeRemaining = value * 60;
            $("#counterWord").text("Question No:");
            $("#counter").text(questionNumber + 1);
            $("#leftTotal").text(`${timeRemaining} sec`);

            timerInterval = setInterval(() => {
                timeSpent++;
                timeRemaining--;
                $("#leftTotal").text(`${timeRemaining} sec`);
                if (timeRemaining <= 0) endGame();
            }, 1000);
        }

        generateQuestion();
    }

    function generateQuestion() {
        if (questionsLeft === 0 && mode === "question") return endGame();

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        $("#question").text(`${num1} × ${num2}`);
    }

    $("#answer").keypress(function (e) {
        if (e.which === 13 && $("#question").text() !== "Loading...") {
            const [num1, , num2] = $("#question").text().split(" ");
            if (parseInt($(this).val()) === parseInt(num1) * parseInt(num2)) {
                score++;
                if (mode === "question") {
                    questionsLeft--;
                    $("#leftTotal").text(`${questionsLeft} / ${totalQuestions}`);
                    if (questionsLeft === 0) return endGame();
                } else {
                    questionNumber++;
                    $("#counter").text(questionNumber + 1);
                }
            }
            $(this).val("").focus();
            generateQuestion();
        }
    });

    function endGame() {
        clearInterval(timerInterval);

        const totalAnswered = mode === "question" ? totalQuestions : questionNumber + 1;
        const timeTaken = timeSpent === 0 ? 1 : timeSpent;

        const accuracyScore = (score / totalAnswered) * 100;
        const speedScore = ((mode === "time" ? value * 60 : timeTaken) / timeTaken) * 50;
        const finalScore = Math.round(accuracyScore + speedScore);

        $("#yourScore").text(finalScore);
        $("#totalQuestions").text(totalAnswered);
        $("#totalTime").text(timeTaken);
        $("#bestScoreMsg").text("");

        if (finalScore > bestScore) {
            bestScore = finalScore;
            localStorage.setItem("bestScore", bestScore);
            $("#bestScore1").text(bestScore);
            $("#bestScoreMsg").text("🎉 Congratulations! New Best Score!");
        } else {
            $("#bestScore1").text(bestScore);
        }

        showWindow("#result-window");
    }

    $(".btnQuestion").click(function () {
        startGame("question", $(this).data("questions"));
    });

    $(".btnTime").click(function () {
        startGame("time", $(this).data("time"));
    });

    $("#btnEnd").click(endGame);
    $("#btnRestart").click(() => startGame(mode, value));
    $("#btnSetup").click(() => showWindow("#setup-window"));
});
