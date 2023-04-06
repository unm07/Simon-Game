var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[]

var started=false;

var level=0;

$("body").keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour=(this.id);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length) {   
            setTimeout(function(){
                nextSequence();
            },1000);    
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){    
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    level=level+1;
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    currentColour="#"+currentColour;
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");    
    },100);
}

function startOver(){
    started=false;
    level=0;
    gamePattern=[];
}
