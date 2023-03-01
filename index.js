var interval;
$(document).ready(function(){
  
  var currentQuestion;
  // Add to top, after currentQuestion;
var timeLeft = 10;
var score = 0;
var updateScore = function (amount) {
  score += amount;
  $('#score').text(score);
};
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  }
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }
  var startGame = function () {
    if (!interval) {
      // call the updateTimeLeft function if timeLeft is 0
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  renderNewQuestion();

  var interval = setInterval(function () {
    updateTimeLeft(-1);
    if (timeLeft === 0) {
      clearInterval(interval);
      interval = undefined;
    }
  }, 1000);

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }
});