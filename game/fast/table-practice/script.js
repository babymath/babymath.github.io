$(document).ready(function () {
  let totalQuestions = 0,
    questionsLeft = 0,
    score = 0,
    bestScore = localStorage.getItem("bestScore") || 0,
    timerInterval,
    questionNumber = 0,
    timeRemaining = 0,
    timeSpent = 0,
    gameMode = "",
    gameValue = 0;

  const showWindow = (id) => {
    $(".window").removeClass("show");
    $(id).addClass("show");
  };

  const startGame = (mode, value) => {
    clearInterval(timerInterval);
    score = 0;
    questionNumber = 0;
    timeSpent = 0;
    gameMode = mode;
    gameValue = value;

    showWindow("#game-container");

    if (mode === "question") {
      totalQuestions = value;
      questionsLeft = value;
      $("#counterWord").text("Time:-");
      $("#counter").text(timeSpent);
      $("#leftTotal").text(`${questionsLeft} / ${totalQuestions}`);

      timerInterval = setInterval(() => {
        timeSpent++;
        $("#counter").text(timeSpent);
      }, 1000);
    } else {
      timeRemaining = value * 60;
      $("#counterWord").text("Question No:-");
      $("#counter").text(1);
      $("#leftTotal").text(`${timeRemaining} sec`);

      timerInterval = setInterval(() => {
        timeRemaining--;
        $("#leftTotal").text(`${timeRemaining} sec`);
        if (timeRemaining <= 0) endGame();
      }, 1000);
    }

    generateQuestion();
  };

  const generateQuestion = () => {
    if (questionsLeft === 0) return endGame();
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    $("#question").text(`${num1} × ${num2}`);
    $("#answer").val("").focus();
  };

  const endGame = () => {
    clearInterval(timerInterval);
    $("#yourScore").text(score);
    $("#totalQuestionsAttempted").text(gameMode === "question" ? totalQuestions : questionNumber);
    $("#totalTimeTaken").text(timeSpent);

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore);
      $("#bestScore1").text(bestScore);
      $("#newBestMessage").text("🎉 New Best Score! 🎉");
    } else {
      $("#newBestMessage").text("");
    }

    showWindow("#result-window");
  };

  $(".btnQuestion").click(function () {
    startGame("question", $(this).data("questions"));
  });

  $(".btnTime").click(function () {
    startGame("time", $(this).data("time"));
  });

  $("#answer").keypress(function (e) {
    if (e.which === 13 && $("#question").text() !== "Loading...") {
      const [num1, , num2] = $("#question").text().split(" ");
      const correct = parseInt(num1) * parseInt(num2);

      if (parseInt($(this).val()) === correct) {
        score++;
        if (gameMode === "question") {
          questionsLeft--;
          $("#leftTotal").text(`${questionsLeft} / ${totalQuestions}`);
          questionsLeft > 0 ? generateQuestion() : endGame();
        } else {
          questionNumber++;
          $("#counter").text(questionNumber + 1);
          generateQuestion();
        }
      }
    }
  });

  $("#btnEnd").click(endGame);

  $("#btnRestart").click(() => {
    showWindow("#setup-window");
  });

  $("#bestScore").text(bestScore);
  $("#bestScore1").text(bestScore);

  showWindow("#setup-window");
});