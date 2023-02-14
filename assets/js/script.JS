// DEPENDENCIES =====================================================================
var startButtonEl = document.querySelector('#start-button');
var questionEl = document.querySelector('#question');
var instructionsEl = document.querySelector('#instructions');
var choicesEl = document.querySelector('#choices');




// DATA =============================================================================
//challenges will hold a questions and its choices followed by the correct answer
var challeneges = [
    {
        question: "Question 1 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    },

    {
        question: "Question 1 right answer D",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option D"
    },

    {
        question: "Question 1 right answer A",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option A"
    },

    {
        question: "Question 1 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    },

    {
        question: "Question 1 right answer C",
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D",
        correct: "Option C"
    }
];

var currentQuestion = 0; // the location of the current question in the array





//FUNCTIONS =========================================================================

//start game function which will present the first question to the user
function startGame(){
    //Display question 
    
    //display choices 


}






// USER INTERACTIONS ================================================================
// a user clicks start
startButtonEl.addEventListener('click', startGame);
// a user clicks a choice 
// a user inputs initials and saves they report
// a user can see high scores



// INITIALIZATIONS =================================================================