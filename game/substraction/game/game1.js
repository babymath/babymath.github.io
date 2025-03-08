document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const startGameButton = document.getElementById('startGame');

    function checkEnableStartButton() {
        console.log('checkEnableStartButton function called');
        const selectedMode = document.querySelector('.mode1.selected-mode');
        const selectedType = document.querySelector('.typeOption.selected');
        if (selectedMode && selectedType) {
            startGameButton.disabled = false;
        } else {
            startGameButton.disabled = true;
        }
    }

    document.getElementById('questionMode1').addEventListener('click', function() {
        console.log('Question Mode button clicked');
        document.querySelectorAll('.questionMode').forEach(button => {
            button.style.display = 'block';
            button.classList.remove('selected-mode');
        });
        document.querySelectorAll('.timeMode').forEach(button => {
            button.style.display = 'none';
            button.classList.remove('selected-mode');
        });
        this.classList.add('selected-mode');
        document.getElementById('timeMode1').classList.remove('selected-mode');
        checkEnableStartButton();
    });

    document.getElementById('timeMode1').addEventListener('click', function() {
        console.log('Time Mode button clicked');
        document.querySelectorAll('.timeMode').forEach(button => {
            button.style.display = 'block';
            button.classList.remove('selected-mode');
        });
        document.querySelectorAll('.questionMode').forEach(button => {
            button.style.display = 'none'; // Fix syntax error: change ')' to ';'
            button.classList.remove('selected-mode');
        });
        this.classList.add('selected-mode');
        document.getElementById('questionMode1').classList.remove('selected-mode');
        checkEnableStartButton();
    });

    document.querySelectorAll('.mode1').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Mode button clicked');
            document.querySelectorAll('.mode1').forEach(btn => btn.classList.remove('selected-mode'));
            this.classList.add('selected-mode');
            checkEnableStartButton();
        });
    });

    document.querySelectorAll('.typeOption').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Type option button clicked');
            document.querySelectorAll('.typeOption').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            checkEnableStartButton();
        });
    });

    document.getElementById('startGame').addEventListener('click', function() {
        console.log('Start Game button clicked');
        startGame();
        document.getElementById('answer1').focus();
    });

    document.getElementById('submit1').addEventListener('click', function() {
        console.log('Submit button clicked');
        checkAnswer();
    });

    document.getElementById('answer1').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            checkAnswer();
        }
    });

    document.getElementById('playAgain').addEventListener('click', function() {
        console.log('Play Again button clicked');
        playAgain();
    });

    document.getElementById('backToSetup').addEventListener('click', function() {
        console.log('Back to Setup button clicked');
        backToSetup();
    });
});
