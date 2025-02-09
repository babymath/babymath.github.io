const HIGH_SCORE_KEY = "hs-number-hunt";

function getHighScore() {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}

function setHighScore(score) {
    localStorage.setItem(HIGH_SCORE_KEY, score);
}

export { getHighScore, setHighScore };
