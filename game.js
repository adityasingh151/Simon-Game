// Array of possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store game pattern and user's clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variables to track game state
var started = false; // Has the game started?
var level = 0;       // Current level

// Event listener for key press to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event listener for button click
$(".btn").click(function() {
  // Get the color of the clicked button
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play sound and animate the button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the user's pattern matches the game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // If the user completed the sequence, move to the next level
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // If there's a mismatch, indicate game over
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the game over indicator after a delay
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset user's clicked pattern and increment the level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random color and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Show an animation and play the sound for the new color
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Function to create a button press animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play a sound based on the provided name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to start the game over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
