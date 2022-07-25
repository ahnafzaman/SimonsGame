var buttonColors= ["green", "red", "yellow", "red"];

var gameStarted=false;
var level=0;
gamePattern=[];
userPattern=[];

$(document).keypress(function(){
  if(!gameStarted){
    gameStarted= true;
    getSequence();
  }
});

$(".btn").click(function(){
  var buttonClicked= $(this).attr("id");
  userPattern.push(buttonClicked);
  $("#"+buttonClicked).addClass("pressed");
  setTimeout(function(){
    $("#"+buttonClicked).removeClass("pressed");
  },100);
  playSound(buttonClicked);
  compareResults(userPattern.length-1);
});

function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3")
  audio.play();
}


function getSequence(){
  userPattern=[]
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random()*4);
  var chosenColor=buttonColors[randomNumber];
  gamePattern.push(chosenColor);
  $("#"+chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);

}

function compareResults(currentLevel){
  console.log("inside compareResults");
  if(gamePattern[currentLevel]=== userPattern[currentLevel]){
    if(userPattern.length===gamePattern.length){
      setTimeout(function(){
        getSequence();
      }, 1000);

    }

  }

  else{
    gameStarted=false;
    userPattern=[];
    gamePattern=[];
    level=0;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
  }
}
