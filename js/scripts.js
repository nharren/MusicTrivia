
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
  clearAnswerHighlights();
  var answers = getAnswers();
  var score = calculateScore(answers);
  highlightAnswers(answers);
  displayScore(score);
  saveAnswers(answers);
  return false;
}

function clearAnswerHighlights() {
  for (i = 0; i < 10; i++) {
    for (j = 1; j < 5; j++) {
      document.getElementById(questionLetters[i] + j + "l").style.color = null;
    }
  }
}

function getAnswer(questionLetter) {   
  for (var i = 1; i < 5; i++) {
    if (document.getElementById(questionLetter + i).checked) {
      return i;
    }
  }

  return 0; // Unanswered question.
}

function getAnswers() {
  return questionLetters.map(getAnswer);
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

function highlightAnswers(answers) {
  for (i = 0; i < 10; i++) {
    if (answers[i] === correctAnswers[i]) {
      document.getElementById(questionLetters[i] + answers[i] + "l").style.color = "lime";
    }
    else if (answers[i] != 0) {
      document.getElementById(questionLetters[i] + answers[i] + "l").style.color = "red";
    }
  }
}

function displayScore(score) {
  var resultText = "You answered " + score + " / 10 questions correctly.";
  document.getElementById("results").innerHTML = resultText;
}

function saveAnswers(answers) {
  localStorage.setItem("musicTrivia.answers", JSON.stringify(answers));
}

function resetQuiz() {
  document.getElementById("quiz").reset();
  clearAnswerHighlights();
  document.getElementById("results").innerHTML = null;  
  localStorage.removeItem("musicTrivia.answers");
  return false;
}