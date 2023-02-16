// DEPENDENCIES =====================================================================
var startButtonEl = document.querySelector('#start-button');
var questionEl = document.querySelector('.question');
var instructionsEl = document.querySelector('.instructions');
var choicesEl = document.querySelector('.choices');
var formEl = document.querySelector(".submit-form");
var submitEl = document.querySelector('#submit');
var initialsInputEl = document.querySelector("#initials-input");
var scoreboardEl = document.querySelector('#scoreboard');
var scoreboardButtonsEl = document.querySelector("#scoreboard-buttons");
var clearScoreboardButtonEl = document.querySelector('#clear-scoreboard-button');
var backButtonEl = document.querySelector('#back-button');
var choicesButtonsEl = [];




// DATA =============================================================================
//challenges will hold a questions and its choices followed by the correct answer
var challenges = [
    {
        question: "Commonly used data types DO NOT include:",
        a: "1. strings",
        b: "2. booleans",
        c: "3. alerts",
        d: "4. numbers",
        correct: "3. alerts"
    },

    {
        question: "The condition in an if / else statement is enclosed with ______.",
        a: "1. quotes",
        b: "2. curly brackets",
        c: "3. parenthesis",
        d: "4. square brackets",
        correct: "2. curly brackets"
    },

    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        a: "1. commas",
        b: "2. curly brackets",
        c: "3. quotes",
        d: "4. parenthesis",
        correct: "3. quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        a: "1. JavaScript",
        b: "2. terminal/bash",
        c: "3. for loops",
        d: "4. console.log",
        correct: "4. console.log"
    },

    {
        question: "Arrays in JavaScript can be used to store _____.",
        a: "1. numbers and strings",
        b: "2. other arrays",
        c: "3. booleans",
        d: "4. all the above",
        correct: "4. all the above"
    }
];

var currentQuestion = 0; // the location of the current question in the array
var score = 0; //user points
var time = 90; 
var userInitials = localStorage.getItem('initials') || '';
var userScores = localStorage.getItem('scores') || '';
var scoreList = [];
var initialsList = [];




//FUNCTIONS =========================================================================

//the quiz will kick off
function startListener(){
    //create the proper html structure to place questions
    //create the list for our choices
    buildLi();
    //hide the quiz instructions
    instructionsEl.setAttribute('class', 'instructions instructions-hide');
    //disable and hide the start button 
    startButtonEl.disabled;
    startButtonEl.parentElement.setAttribute('class', 'start-box start-box-hide');
    //input the first question
    nextQuestion();

}


//add the li elements to the ul element
function buildLi(){
    for(var i = 0; i < 4; i++){
       //create button
        var buttonEl = document.createElement('button');
        //add button to the array for access later
        choicesButtonsEl[i] = buttonEl;
        //create li element and append to the parent
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'choices-list');
        liEl.appendChild(buttonEl);
        choicesEl.appendChild(liEl);

        buttonEl.addEventListener('click', choicesListener);

        //change the question css
        questionEl.setAttribute('id', 'quiz-question');
    }
}


//start game function which will present the first question to the user
function nextQuestion(){
    //Display question 
    questionEl.textContent = challenges[currentQuestion].question;
    //display choices 
    choicesButtonsEl[0].textContent = challenges[currentQuestion].a;
    choicesButtonsEl[1].textContent = challenges[currentQuestion].b;
    choicesButtonsEl[2].textContent = challenges[currentQuestion].c;
    choicesButtonsEl[3].textContent = challenges[currentQuestion].d;

    //update currentQuestion variable
    currentQuestion++;
}

//when the user clicks one of the question's choices this will occur
function choicesListener(event){
    //check weather the answer is correct 
    var usersChoice = event.target.innerHTML;
    if(usersChoice === challenges[currentQuestion-1].correct){
        //if true increase users score
        score++;
    }
    //if user input is wrong then decrease time by 10 seconds
    else{
        time -= 10;
    }
    //if not on the last question then go to next question
    if(currentQuestion != challenges.length){
        nextQuestion();
    }
    //else the quiz has ended
    else{
        //go to the score record screen
        scoreRecordScreen();
    }
}

//end of game screen
function scoreRecordScreen(){
    //display the appropriate text for the end of the game
    questionEl.textContent = "All Done!";
    instructionsEl.textContent = "Your final score is " + score;
    instructionsEl.setAttribute('class', 'instructions instructions-show end-screen');

    //hide the buttons
    choicesEl.setAttribute('id', 'choices-hide');
    //display the form element
    formEl.setAttribute('id', 'show-form');

}

function submitListener(event){
    event.preventDefault();
    
    //users input
    var updatedLocal = '';
    var updatedScores = '';
    var userInput = initialsInputEl.value;
    if(userInitials === ''){
        updatedLocal = userInput;
        updatedScores = score;
    }else{
        updatedLocal = userInitials +  "-" + userInput;
        updatedScores = userScores + '-' + score;
    }
    
    
    //if user didn't place the initials then place N/A for initials 
    if(userInput === ""){
        localStorage.setItem('initials', (updatedLocal + "N/A"));
        localStorage.setItem('scores', updatedScores);
    }
    //user inputted a value therefore record it 
    else{
        localStorage.setItem('initials', updatedLocal);
        localStorage.setItem('scores', updatedScores)
    }
    
    userInitials = localStorage.getItem('initials');
    userScores = localStorage.getItem('scores');

    //local storage is updated, now show the scoreboard
    scoreboard();
}

//the end-screen of the quiz displaying the scoreboard
function scoreboard(){
    //get the locally stored data into arrays
    scoreList = userScores.split('-');
    initialsList = userInitials.split('-');
    console.log(initialsList)
    //turn strings to numbers to sort
    for (var i = 0; i < scoreList.length; i++){
        scoreList[i] = +(scoreList[i]);
    }
    //reorder the list so we can display it from highest to lowest
    bblSort();

    questionEl.textContent = "Scoreboard";
    instructionsEl.setAttribute('class', 'instructions instructions-hide end-screen');
    formEl.setAttribute('id', 'hide-form');

    //create li element and append to the parent to build the scoreboard
    for(var i = scoreList.length - 1; i >= 0; i--){
        
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'scoreboard-li');
        liEl.textContent = initialsList[i] + " - " + scoreList[i];
        scoreboardEl.appendChild(liEl);
    }

    //display the 'clear' and 'back' buttons
    scoreboardButtonsEl.setAttribute('class', 'scoreboard-buttons-show');

}

// bubble sort to sort the score data -- taken from geeksforgeeks
function bblSort(){
    
    for(var i = 0; i < scoreList.length; i++){
       
      // Last i elements are already in place 
      for(var j = 0; j < ( scoreList.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(scoreList[j] > scoreList[j+1]){
           
            // If the condition is true then swap them
            var temp = scoreList[j];
            scoreList[j] = scoreList[j + 1];
            scoreList[j+1] = temp;

            temp = initialsList[j];
            initialsList[j] = initialsList[j + 1];
            initialsList[j+1] = temp;
        }
      }
    }
}
//clears the scoreboard 
function clearScoreboardListener(){

    scoreboardEl.remove();

    localStorage.clear();
}
//refreshes the page
function backListener(){
    location.reload();
}

// USER INTERACTIONS ================================================================
// a user clicks start
startButtonEl.addEventListener('click', startListener);
// a user clicks a choice -- listeners were added in the build li function where the buttons are being created 
// a user inputs initials and saves they report
submitEl.addEventListener('click', submitListener)
// a user can click 'clear scoreboard' and the scoreboard will be reset
clearScoreboardButtonEl.addEventListener('click', clearScoreboardListener);
//user can go back to main page
backButtonEl.addEventListener('click', backListener);



// INITIALIZATIONS =================================================================