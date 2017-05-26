
var correctAnswers = [1,3,2,2,4,3,4,1,3,2];
var questionLetters = ["a","b","c","d","e","f","g","h","i","j"];

window.onload = function(e) {
  var answers = retrieveAnswers();
  // TODO: Validate array.
  if (answers != null) {
    setAnswers(answers);
  }
}

function retrieveAnswers() {
  var answersString = localStorage.getItem("musicTrivia.answers");
  if (answersString != null) {
      return JSON.parse(answersString);
  }
  return null; 
}

function setAnswers(answers) {
  for (i = 0; i < 10; i++) {
    setAnswer(questionLetters[i], answers[i]);
  }
}

function setAnswer(questionLetter, answer) {   
   document.getElementById(questionLetter + answer).checked = true;
}

function processResults() {
  var answers = getAnswers();
  var score = calculateScore(answers);
  displayScore(score);
  saveAnswers(answers);
  return false;
}

function getAnswer(questionLetter) {   
   if (document.getElementById(questionLetter + "1").checked){
     return 1;  
   }
   else if (document.getElementById(questionLetter + "2").checked){
     return 2;
   }
   else if (document.getElementById(questionLetter + "3").checked){
     return 3;
   }
   else if (document.getElementById(questionLetter + "4").checked){
     return 4;
   }
   else { // Unanswered question.
     return 0;
   }
}

function getAnswers() {
  return [
    getAnswer("a"),
    getAnswer("b"),
    getAnswer("c"),
    getAnswer("d"),
    getAnswer("e"),
    getAnswer("f"),
    getAnswer("g"),
    getAnswer("h"),
    getAnswer("i"),
    getAnswer("j"),
  ]
}

function calculateScore(answers) {
  var score = 0;
  for (i = 0; i < 10; i++) {
    if (answers[i] === correctAnswers[i]) {
      score++;
    }
  }
  return score;
}

function displayScore(score) {
  var resultText = "You answered " + score + " / 10 questions correctly.";
  document.getElementById("results").innerHTML += resultText;
}

function saveAnswers(answers) {
  localStorage.setItem("musicTrivia.answers", JSON.stringify(answers));
}