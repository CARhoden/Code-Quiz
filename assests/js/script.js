var timerElement = document.getElementById("timer");
var leaderboards = [];
var quizQuestions = [
    {
        question: "What does CSS stand for?",
        options: ["Cool Style Sheet", "Cascading Style Sheet", "Computer style sheet", "Computer Standard Style"],
        answer: 1,
    },
    {
        question: "What is Bootstrap?",
        options: ["CSS Framework", "library", "API", "CSS library"],
        answer: 0,
    },
    {
        question: "What is JavaScript?",
        options: ["library", "soft language", "function", "programming language"],
        answer: 3,
    },
    {
        question: "What does DRY code mean?",
        options: ["Boring Code", "Repeat Yourself", "Don't Repeat Yourself", "Sloppy Code"],
        answer: 2,
    },
];

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var endTime;
var startElement = document.getElementById("start-button");
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var submitElement = document.getElementById("submit-button");
var textboxElement = document.getElementById("initials");



startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);
submitElement.style.display = "none";
textboxElement.style.display = "none";



// this starts the quiz
function startButtonClicked() {
    setQuestion();
    startElement.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
};

// this starts the timer when test starts
function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        endQuiz();
    }
};

// this goes through the questions
function setQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    for (let i = 0; i < currentQuestion.options.length; i++) {
        var choice = document.createElement("li");
        choice.textContent = currentQuestion.options[i];
        choice.addEventListener("click", () => {
            checkAnswer(i);
        });
        optionsElement.appendChild(choice);
    };
};
// this function checks the answers out of the quiz
function checkAnswer(answerIndex) {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    if (timeLeft <= 0) {
        endQuiz();
    };
    if (answerIndex === currentQuestion.answer) {
        score++;
    } else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setQuestion();
    } else {
        endQuiz();
    }
};

// this functions ends the quiz
function endQuiz() {
    clearInterval(timerInterval);
    endTime = timeLeft;
    timerElement.style.display = "none";
    optionsElement.style.display = "none";
    textboxElement.style.display = "block";
    submitElement.style.display = "block";
    questionElement.textContent = "Your score is " + score + " out of 4, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
};

// this function displays the highscore in the screen and stores it
function displayHighscore() {
    var storedHighScore = localStorage.getItem("leaderboards");
    if (storedHighScore) {
        score = parseInt(storedHighScore);
    }
    highScoreElement.textContent = score.toString();
}


// This function saves the score into the storage
function saveScore() {
    var initials = textboxElement.value;
    var totalScore = {
        Initials: initials,
        Score: score,
        Time: endTime
    };
    leaderboards.push(totalScore);
    localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
};


// this function lists the scores on the screen
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