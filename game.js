var buttonColors = ["red", "blue", "green", "yellow"];
var i = 0;
var gamePattern = [];
var userClickedPattern = [];
var j = 0;
var started = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name1) {
  $("#" + name1).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + name1).addClass("pressed");
  setTimeout(function() {
    $("#" + name1).removeClass("pressed");
  }, 100);
}
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
function startOver() {
  i = 0;
  j = -1;
  $("h1").text("Game Over, Refresh the page to restart");
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}

function nextSequence() {
  j = 0;
  userClickedPattern = [];
  i++;
  $("h1").text("Level " + i);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

$(".btn").on("click", function(event) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  $(document).off("keydown");
  if (userClickedPattern[j] !== gamePattern[j]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  if (userClickedPattern[j] === gamePattern[j] && j !== -1) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    } else
      j++;
  }

});
