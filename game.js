const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let started = false;
let level = 0;
let userClickedPattern = [];
//give the sequence
function nextSequence() {
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  const randomColor = $(`#${randomChosenColour}`);
  randomColor.fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text(`level-${level}`);
}

//sound function
function playSound(soundname) {
  let audio = new Audio(`sounds/${soundname}.mp3`);
  audio.play();
}
//clicking and putting in array

$(".btn").click(function (event) {
  const userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//   add animation to user clicks
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
//when game is not started it by keypress start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`level-${level}`);
    nextSequence();
    started = true;
  }
});

//check answer
function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    //change title
    //change sound
    //add some danger background for some sec
    //restart the game
    playSound("wrong");
$('#level-title').text(`Game Over, Press Any Key to Restart`)
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
//if user get wrong game will restart by calling this function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
