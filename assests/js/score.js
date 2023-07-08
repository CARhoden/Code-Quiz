var leaderBoard = document.getElementById("leaderboard-list");
var highScores = leaderboards.length;
var leaderboards = [];
// these functions display and list the highscores into the leaderboard.html page
function listHighScores() {
    console.log(leaderboards)
    for (var i = 0; i < leaderboards.length; i++) {
        var highScores = leaderboards[i];
        var li = document.createElement("li");
        li.textContent = highScores.Initials + " your score is " + highScores.Score + " out of 4";
        leaderBoard.appendChild(li);
    }
}
function displayHighscore() {
    var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
    if (storedHighScores != null) {
        leaderboards = storedHighScores;
    }
    listHighScores()
}
displayHighscore()