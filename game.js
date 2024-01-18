var level=0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var wrong = false;

$(document).keypress(function(){
    if (!gameStarted){
        gameStarted=true;
        nextSequence();
    }
    else if (wrong){
        startOver();
    }
});

$('.btn').click(function(event){
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log('success');

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $('body').addClass('red');
        setTimeout(function(){
            $('body').removeClass('red');
        },200);
        $('h1').html('Game Over, Press Any Key to Restart');
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        wrong=true;
    }
}

function nextSequence(){
    level++;
    $('h1').html('level '+level);
    userClickedPattern=[];
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $('.'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('.'+currentColour).removeClass('pressed')},100);
}

function startOver(){
    level=0;
    wrong = false;
    gamePattern=[];
    nextSequence();
}