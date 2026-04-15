function controller(event) {

    if (event.key == "Enter") {

        if (runworker == 0) {
            run();
            movebackground();
            updateScore();
            runSound.play();

            flameLocations.forEach(generateFlames);

        }
    }
   if (event.key == " ") {

    if (jumpworker == 0 && runworker != 0) {

        clearInterval(runworker);
        runSound.pause();

        jumpSound.currentTime = 0;   // RESET SOUND
        jumpSound.play();            // PLAY IMMEDIATELY

        jump();
    }
}

}

var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3");

var deadSound = new Audio("dead.mp3");



var x = 1;
var runworker = 0;

function run() {

    // STOP OLD RUN FIRST (IMPORTANT FIX)
    clearInterval(runworker);

    runworker = setInterval(() => {

        x = x + 1;
        if (x == 9) {
            x = 1;
        }

        document.getElementById("boy").src = "run" + x + ".png";

    }, 150);
}

var jumpImage = 1;
var jumpworker = 0;

var boyMarginTop = 450;

function jump() {

    jumpSound.currentTime = 0;
    jumpSound.play();

    jumpworker = setInterval(() => {

        jumpImage = jumpImage + 1;

        if (jumpImage < 8) {
            boyMarginTop -= 30;
        } else {
            boyMarginTop += 30;
        }

        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        document.getElementById("boy").src = "jump" + jumpImage + ".png";

        if (jumpImage == 13) {

            jumpImage = 1;
            clearInterval(jumpworker);
            jumpworker = 0;

            boyMarginTop = 450;
            document.getElementById("boy").style.marginTop = boyMarginTop + "px";

            run();
            runSound.play();
        }

    }, 150);
}


var score = 0;
var scoreWorker = 0;

function updateScore() {

    scoreWorker = setInterval(() => {

        score = score + 10;

        if(score==5000){
            alert("You Win")
        }
        document.getElementById("score").innerHTML = score;



    }, 100);

}

var move = 0;

var backgroundWorker = 0;

function movebackground() {

    backgroundWorker = setInterval(() => {

        move = move - 10;
        document.getElementById("background").style.backgroundPositionX
= move + "px";
    }, 100)



}


var deadImage = 0;
var deadWorker = 0;


function dead() {
    deadWorker = setInterval(() => {
        deadImage = deadImage + 1;

        if (deadImage == 11) {
            clearInterval(deadWorker);
            alert("You're dead, Try again");
            window.location.reload();
        }

        document.getElementById("boy").src = "dead" + deadImage + ".png";

    }, 150);


}

var flameLocations = [700,1000, 1400, 1700, 2000, 2500,2800,
3300,3700,4000,4200,4600,4800,5000];

var flameWorker = 0;

function generateFlames(x) {

    var flame = document.createElement("img");
    flame.src = "flame.gif";
    flame.className = "flame";
    flame.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(flame);


    flameWorker = setInterval(() => {

        if (flameWorker != 0) {

            x = x - 10;
            flame.style.marginLeft = x + "px";


        }
        if (x == 180) {

            if (jumpworker == 0) {
                clearInterval(runworker);
                runSound.pause;
                clearInterval(backgroundWorker);
                clearInterval(scoreWorker);
                clearInterval(flameWorker);

                dead();
                deadSound.play();


            }


        }

    }, 100);

}
// ================= GAME OVER =================
function gameOver() {

    clearInterval(runWorker);
    clearInterval(backgroundWorker);
    clearInterval(scoreWorker);

    runSound.pause();
    deadSound.play();

    alert("Game Over 😢");
    location.reload();
}

// ================= KEYBOARD CONTROLS =================
document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        startGame();
    }

    if (e.key === " ") {
        jump();
    }

});

// ================= TOUCH + SWIPE =================
let startY = 0;

document.addEventListener("touchstart", function (e) {

    startY = e.touches[0].clientY;

    if (!gameStarted) {
        startGame();
    }

});

document.addEventListener("touchend", function (e) {

    let endY = e.changedTouches[0].clientY;

    // swipe up = jump
    if (startY - endY > 50) {
        jump();
    }

});

