var playing = false;
var score;
var trialLeft;
var step;
var action;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','pineapple','watermelon'];
$(function(){
    //click on start reset button
    $("#startreset").click(function(){
         //are we playing?
         if(playing==true){
            //reload page
            location.reload();
         }else{
             //we are not playing
            playing = true;
            score = 0;//set score is 0
            $('#scorevalue').html(score);

            //show trials left
            $("#trialsLeft").show();
            trialLeft =3;
            addHearts();

            //hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            startAction();
        }
    })
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //Update score
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode",500); //slice fruit

    //generate new fruit
    setTimeout(startAction,800);
})

function addHearts(){
    $("#trialsLeft").empty();
    for(let i=0;i<trialLeft;i++){
                $("#trialsLeft").append('<img src="images/heart.png" class="life"/>');
            }
}

//start sending fruits
function startAction(){
    // $("#fruitsContainer").append('<img src="images/apple.png" class="fruit"/>');
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left':Math.round(500*Math.random()), 'top':-50});

    //generate a random step
    step = 1 + Math.round(5*Math.random());

    //Move fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        //check if the fruit by one step
    if($("#fruit1").position().top > $("#fruitsContainer").height()){
        //check if we have trials left
        if(trialLeft >1){
            $("#fruit1").show();
            chooseFruit();
            $("#fruit1").css({'left':Math.round(500*Math.random()), 'top':-50});

            //generate a random step
            step = 1 + Math.round(5*Math.random());
            trialLeft--;

            //populate trialLeft one
            addHearts();
        }else{
            //reduce trials by one
            playing =false;
            $("#startreset").html("Start Game");//Change button to Start Game
            $("#gameOver").show();
            $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score+'.</p>');
            $("#trialsLeft").hide();
            stopAction();

        }
    }
    },10); //move fruit by one step

}

function chooseFruit(){
    // $("#fruit1").attr('src','images/apple.png');
    $("#fruit1").attr('src','images/' +fruits[Math.round(9*Math.random())] +'.png');
    
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
