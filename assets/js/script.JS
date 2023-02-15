// DEPENDENCIES =====================================================================
var startButtonEl = document.querySelector('#start-button');
var questionEl = document.querySelector('.question');
var instructionsEl = document.querySelector('.instructions');
var choicesEl = document.querySelector('.choices');
var formEl = document.querySelector(".submit-form");
var choicesButtonsEl = [];




// DATA =============================================================================
//challenges will hold a questions and its choices followed by the correct answer
var challenges = [
    {
        question: "Question 1 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    },

    {
        question: "Question 2 right answer D",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option D"
    },

    {
        question: "Question 3 right answer A",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option A"
    },

    {
        question: "Question 4 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    },

    {
        question: "Question 5 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    }
];

var currentQuestion = 0; // the location of the current question in the array
var score = 0; //user points
var time = 90; 




//FUNCTIONS =========================================================================

//the quiz will kick off
function startButton(){
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

        buttonEl.addEventListener('click', choicesButton);

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
function choicesButton(event){
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





// USER INTERACTIONS ================================================================
// a user clicks start
startButtonEl.addEventListener('click', startButton);
// a user clicks a choice -- listeners were added in the build li function where the buttons are being created 
// a user inputs initials and saves they report
// a user can see high scores



// INITIALIZATIONS =================================================================