var gamePattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var chosenBtnAudio = new Audio();
var level = 0;

$(document).keydown(function(){
    if(level === 0) {
        nextSequence();
    }

})

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function nextSequence(){
    if(level >= 0){
        $("h1").text("Level "+level);
        level++;
    }
        userClickedPattern = [];
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#"+randomChosenColor).fadeOut().fadeIn();
    
}



function playSound(name){
    switch (name) {
        case "red":
            chosenBtnAudio.src="./sounds/red.mp3";
            chosenBtnAudio.play();
            break;
        case "blue":
            chosenBtnAudio.src="./sounds/blue.mp3";
            chosenBtnAudio.play();
            break;
        case "green":
            chosenBtnAudio.src="./sounds/green.mp3";
            chosenBtnAudio.play();
            break;
        case "yellow":
            chosenBtnAudio.src="./sounds/yellow.mp3";
            chosenBtnAudio.play();
            break;
        default:
            chosenBtnAudio.src="./sounds/wrong.mp3";
            chosenBtnAudio.play();
            break;
    }
}


$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    var indexOfUserClickedBtn = userClickedPattern.indexOf(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(indexOfUserClickedBtn);
})

function checkAnswer(indexOfUser){
    if(gamePattern[indexOfUser] === userClickedPattern[indexOfUser]){
        if(gamePattern.length === userClickedPattern.length) {
            nextSequence();
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over")}, 200);
        $("h1").text("Game over, press any key to restart.");
        startOver();
    }
    
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}
