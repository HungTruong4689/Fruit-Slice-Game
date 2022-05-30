

var playing = false;
var score;
var timeremaining;
var correctNumber;
document.getElementById("startreset").onclick = function(){
    if(playing ===true){
        location.reload(); //reload the page
    }else{
        playing=true;
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        // document.getElementById("timeremaining").style.display ="block";
        show("timeremaining");
        timeremaining =60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide game over box
        hide("gameOver");


        //Change button to reset
        document.getElementById("startreset").innerHTML ="Reset Game";

        //start countdown
        startCountdown();

        generateQA();
    }
}
for(let i=1; i<5;i++){


    document.getElementById("box"+i).onclick = function(){
        //Check if we are playing
        if(playing===true){
            if(this.innerHTML ==correctNumber){
                //correct answer
                score++;
                document.getElementById("scorevalue").innerHTML =score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);

                //Generate the new QA
                generateQA();
            }else{
                
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000)
                //Generate the new QA
                generateQA();
            }
        }
    }
}
function startCountdown(){
    action = setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining===0){
            //game over
            stopCountdown();

            generateQA();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your score is "+ score+".</p>";
            // document.getElementById("timeremaining").style.display ="none";
            hide("timeremaining");

            hide("correct");
            hide("wrong");
            playing =false;
            document.getElementById("startreset").innerHTML ="Start Game";
        }
    },1000)
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display ="block";
} 

function generateQA(){
    var x = 1+Math.round(9* Math.random());
    var y = 1+Math.round(9* Math.random());
    correctNumber = x*y;
    document.getElementById("question").innerHTML = x + " x "+y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctNumber;

    //fill other boxes with wrong answers
    var answers = [correctNumber];
    for(i=1;i<5;i++){
        if(i!==correctPosition){
            var wrongAnswer;
            
            do{
                wrongAnswer = (1+Math.round(9* Math.random()))*(1+Math.round(9* Math.random()));
            }
            while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            
        }
    }
}