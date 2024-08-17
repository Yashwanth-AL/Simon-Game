var buttonsColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(event) {
  var key = event.key;
  if (!started && key == ' ') {
    $("#hidden-input").focus();  // Focus on the hidden input field
    $("#level-title").text("Level : " + level);
    setTimeout(function() {
      nextSequence();
    }, 1000); 
    started = true;
  }
});

// Handle keyboard and touch input
$(document).keydown(function(event){
  var key = event.key;
  switch(key){
    case 'w' : case 'ArrowUp' :  execute("green"); break;
    case 'a' : case 'ArrowLeft' : execute("red"); break;
    case 's' : case 'ArrowDown' : execute("yellow"); break;
    case 'd' : case 'ArrowRight' : execute("blue"); break;
    default : break;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  execute(userChosenColour);
});

// Add touch event listeners for mobile devices
$(".btn").on("touchstart", function() {
  var userChosenColour = $(this).attr("id");
  execute(userChosenColour);
});

function execute(button){
  userClickedPattern.push(button);
  playSound(button);
  animatePress(button);
  checkAnswer(userClickedPattern.length-1);  
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      if(userClickedPattern.length == gamePattern.length){
        setTimeout(function() {
        nextSequence();
      }, 1000);
      }
    } else {
      playSound("wrong");
      $("h1").text("Game Over!!! Press space key to Restart.");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function nextSequence(){
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level : "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonsColor[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}

function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed"); 
  }, 100);
}

// Prevent scrolling on touch devices while playing
$(document).on('touchmove', function(e) {
  e.preventDefault();
});
