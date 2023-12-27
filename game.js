var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red","blue","green","yellow"];
var level=0;
var started = false;

function startOver(){
  level=0;
  started=false;
  gamePattern=[];

}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(()=>{
        document.querySelector("body").classList.remove("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}



function nextSequence(){
  level++
  $("h1").text("Level "+level);
  var randomNumber=Math.random()*4;
  randomNumber=Math.floor(randomNumber);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  playsound(randomChosenColor);

}

$(".btn").on("click",function(event){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function playsound(name){
  var audio = new Audio("./sounds/"+name+'.mp3');
  audio.play();
}


function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(()=>{
    document.querySelector("#"+currentColor).classList.remove("pressed");
  },100);
}

$(document).keypress(function(){
if (!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});
