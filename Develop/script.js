var startPage = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");
var quizDiv = document.querySelector("#quiz");
var currentQuestion = document.querySelector("#current-question");
var answerGrid = document.querySelector("#answer-grid");
var inputSection = document.querySelector(".input-page");
var timeEl = document.querySelector(".seconds-left");
var userInput = document.querySelector("#user-input");
var highscoresSection = document.querySelector(".highscores");
var initialsColumn = document.querySelector(".initials-column");
var scoreColumn = document.querySelector(".score-column");

var optionButtons = document.querySelector(".option-btn");
var submitButton = document.querySelector(".submit-button");
var restartBtn = document.querySelector(".restart");
var clearBtn = document.querySelector(".clear");
var highscoresHyperlink = document.querySelector(".highscores-hyperlink");

var currentQuestionIndex;
var currentAnswerIndex;
var secondsLeft = 75;

startBtn.addEventListener("click", startQuiz);
optionButtons.addEventListener("click", updateQuestion);
optionButtons.addEventListener("click", checkAnswer);

var initialsArray = [];
var scoreArray = [];

init();

function startQuiz () {
    startPage.classList.add("hide");
    quizDiv.classList.remove("hide");
    currentQuestionIndex = -1;
    updateQuestion();
    setTime();
};

// After we start the quiz, we run the updateQuestion() function, this removes any children currently in the quizGrid, and adds new question 
function updateQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

};

function navigateToInput() {
    quizDiv.classList.add("hide");
    inputSection.classList.remove("hide");
};

function navigateToHighScore() {
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    displayHighScores()
};

function displayHighScores() {
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";

    for(var i=0; i<initialsArray.length; i++) {
        var initialsP = document.createElement("p");
        initialsP.textContent = initialsArray[i];
        initialsColumn.append(initialsP);

        var scoreP = document.createElement("p");
        scoreP.textContent = scoreArray[i];
        scoreColumn.append(scoreP);
      }
};

// We pass in the current index of questions, then we set the text content of the currentQuestion to the currentindex.question in the questions object, then we create a button element and set the text of that button to the answers located at the current index of the questions object, add an event listener to the buttons in the quizGrid that checks the answer
function showQuestion(question) {
    if (currentQuestionIndex < questions.length) {
    currentQuestion.textContent = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button") 
        button.innerText = answer.text
        button.value = answer.response
        button.classList.add("btn", "btn-secondary", "btn-md", "m-1", "text-left")
        button.addEventListener("click", checkAnswer)
        answerGrid.appendChild(button)
        
    })

}
    else {
        navigateToInput()

    }

};

// Need to access index of answers in a for loop!!!! 
function checkAnswer(event) {
    var element = event.target
    
    if (element.matches("button") === true && Number(element.value) === 1) {
        displayCorrect()
        
    }
    else if (element.matches("button") === true && Number(element.value) === 0) {
        displayIncorrect()
        secondsLeft = secondsLeft - 10

    }
    updateQuestion()
};

function displayCorrect() {
    var correctAlert = document.querySelector(".correct-alert");
    setTimeout(function(){ 
        correctAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        correctAlert.classList.add("hide")
    }, 1000)

}

function displayIncorrect() {
    var incorrectAlert = document.querySelector(".incorrect-alert");
    setTimeout(function(){ 
        incorrectAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        incorrectAlert.classList.add("hide")
    }, 1000)
};

// If there is an answer button element inside of the answer grid, remove it; basically loop through until there are no more firstChild elements
function resetState() {
    while (answerGrid.firstChild) {
        answerGrid.removeChild(answerGrid.firstChild)
    }
    currentQuestionIndex++
};

function setTime() {
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secondsLeft--;
        
        // Condition to make the function no longer run
        if(secondsLeft === 0 || currentQuestionIndex > 3) {
          // Have to set timer to a name so we know which timer to delete
          clearInterval(timerInterval);
          // Tell the app what to do when the timer gets to 0
        }
    
      }, 1000);
};

function init() {
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("score"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedInitials !== null || storedScores !==null) {
      initialsArray = storedInitials;
      scoreArray = storedScores;
    }
  
    // Render todos to the DOM
    displayHighScores();
};

function storeScores() {
    localStorage.setItem("initials", JSON.stringify(initialsArray))
    localStorage.setItem("score", JSON.stringify(scoreArray))
};

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var userInitials = userInput.value.trim();
    var userScore = secondsLeft

    initialsArray.push(userInitials)
    scoreArray.push(userScore)

    console.log(initialsArray)

    userInput.value = ""

    storeScores();
    navigateToHighScore();
     
});

restartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startPage.classList.remove("hide");
    highscoresSection.classList.add("hide");
});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";
});

highscoresHyperlink.addEventListener("click", function(event) {
    quizDiv.classList.add("hide");
    startPage.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    highscoresHyperlink.setAttribute("data-click", true);
});

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
        {text: "1. strings", response: 0},
        {text: "2. booleans", response: 0},
        {text: "3. alerts", response: 1},
        {text: "4. numbers", response: 0}
        ]

    },
    {
        question: "What is 2 + 2",
        answers: [
        {text: "1. one", response: 0},
        {text: "2. two", response: 1},
        {text: "3. four", response: 0},
        {text: "4. eight", response: 0}
        ]

    },
    {
        question: "Question 3",
        answers: [
        {text: "1. blah", response: 1},
        {text: "2. ok", response: 0},
        {text: "3. yep", response: 0},
        {text: "4. fine", response: 0}
        ]

    },
    {
        question: "Question 4",
        answers: [
        {text: "1. red", response: 0},
        {text: "2. blue", response: 0},
        {text: "3. green", response: 1},
        {text: "4. purple", response: 0}
        ]

    }
]



/*
something about textContent of the button the user clicks on is equal to what is in the variable
User clicks on start quiz button
    - Add event listener to start button to begin pagination of some sort?
    - Pagination order is welcome page, questions, summary socre/input initials page, high scores page
Time begins to count down
    - Set interval needed here
    - Clear interval once user reaches certain point in pagination sequence
Time drops quicker if user answer incorrectly
    - TBD
User advances to the first question
    -Pagination is prompted by user selecting a response to the question
When the user clicks on their answer choice, they advance to the next question
User sees if they got the previous question correct or incorrect when advancing to the next question
    - Need some way to verify if their response matches the correct answer...?  An object of some sort?
    - Or would each of the questions have their own array and the correct answer would be equal to a certain index in the array? 
After responding to the last question, user is met with a screen displaying their final score & an input field, *time stops counting down here
    - Clear interval is needed at this point; time needs to stop counting down
    - Need to add to local storage the final time & the user initials as key value pairs (Intials: EB, score: 100)
    - Once the user hits the submit button, they are met with a screen of the option to clear the high score or go back/return to the start
    - Clear high scores would cear the local storage
User enters their intiials in the input field
User's score & intials are then displayed on the screen showing "Highscores"

Other developer notes:
    - Will need to add a variable to select the time displayed on the page
    - Will need to add a variable to locate start button as well as other buttson?? 
    - An object to include the questions and correct answers?  
    - 
*/