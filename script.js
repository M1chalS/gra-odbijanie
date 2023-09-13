let dirArrow = "right";
let interval;
let intervalBullet;
let points = 0;
let lives = 3;
let bullet = false;

function checkCollision() {
    let posX = $("#arrow").position().left;
    let posY = $("#arrow").position().top;
    let shieldX = $("#shield").position().left;
    let shieldY = $("#shield").position().top;

    if (posX >= shieldX && posX <= shieldX + 25 && posY >= shieldY && posY <= shieldY + 100) {
        $("#arrow").css("left", 0);
        $("#arrow").css("top", Math.floor(Math.random() * 500));
        points++;
        $("#points").html(points);
        calculateDifficulty();
    }
}

function checkCollisionBullet() {
    let posX = $("#bullet").position().left;
    let posY = $("#bullet").position().top;
    let shieldX = $("#shield").position().left;
    let shieldY = $("#shield").position().top;

    if (posX >= shieldX && posX <= shieldX + 50 && posY >= shieldY && posY <= shieldY + 100) {
        $("#bullet").css("left", 0);
        $("#bullet").css("top", Math.floor(Math.random() * 500));
        points++;
        $("#points").html(points);
        calculateDifficulty();
        bullet = false;
        $("#bullet").css("display", "none");
        clearInterval(intervalBullet);
    }
}

function checkLives() {
    if (lives === 0) {
        gameState.off();
        alert("Koniec gry, punkty: " + points);
        location.reload();
    }
}

function checkCollisionWithGround() {
    let posX = $("#arrow").position().left;
    let posXBullet = $("#bullet").position().left;

    if (posX >= 975) {
        lives--;
        $("#lives").html(lives);
    }

    if(posXBullet >= 960) {
        $("#bullet").css("left", 0);
        $("#bullet").css("top", Math.floor(Math.random() * 500));
        lives--;
        $("#lives").html(lives);
        bullet = false;
        $("#bullet").css("display", "none");
        clearInterval(intervalBullet);
    }
}

function calculateArrow() {
    let posX = $("#arrow").position().left;

    if (posX >= 975) {
        dirArrow = "left";
        $("#arrow").html("<<<");
    }

    if (posX <= 0) {
        dirArrow = "right";
        $("#arrow").html(">>>");
    }

    if (dirArrow === "right") {
        $("#arrow").css("left", posX + gameParams.arrowSpeed);
    }

    if (dirArrow === "left") {
        $("#arrow").css("left", posX - gameParams.arrowSpeed);
    }
}

function calculateBullet() {
    let posX = $("#bullet").position().left;
    $("#bullet").css("left", posX + gameParams.bulletSpeed);
}

function calculateDifficulty() {
    switch (points) {
        case 3: gameParams.arrowSpeed = 23; break;
        case 6: gameParams.arrowSpeed = 25; break;
        case 8: gameParams.arrowSpeed = 28; gameParams.bulletSpeed = 50; break;
        case 10: gameParams.arrowSpeed = 30; break;
        case 15: gameParams.arrowSpeed = 33; gameParams.bulletSpeed = 55; break;
        case 19: gameParams.arrowSpeed = 36; break;
    } 
}

function spawnBullet() {
    console.log(bullet)
    if((points === 2 || points === 5 || points === 8 || points === 13 || points === 17) && bullet === false) {
        bullet = true;
        intervalBullet = setInterval(function() {
            calculateBullet();
        }, 100);
    }

    if(bullet) {
        $("#bullet").css("display", "block");
    } else {
        $("#bullet").css("display", "none");
    }
}

const gameState = {
    status: true,
    on: () => {
        interval = setInterval(function () {
            calculateArrow();
            checkCollision();
            checkCollisionBullet();
            checkLives();
            checkCollisionWithGround();
            spawnBullet();
        }, 100)
    },
    off: () => clearInterval(interval)
};

const gameParams = {
    arrowSpeed: 20,
    bulletSpeed: 45,
    shieldSpeed: 30
}

$(function () {
    gameState.on();

    $("#start").click(function () {
        if (gameState.status) {
            $("#start").html("Start");
            gameState.status = false;
            gameState.off();
        } else {
            $("#start").html("Stop");
            gameState.status = true;
            gameState.on();
        }
    });


});

$(document).on("keydown", function (event) {
    if(!gameState.status) {
        return;
    }
    
    let posY = $("#shield").position().top;
    const key = (event.keyCode ? event.keyCode : event.which);

    if(posY > 0) {
        if (key == '87' || key == '38') {
            $("#shield").css("top", posY - gameParams.shieldSpeed);
        }
    }

    if(posY < 510) {
         if (key == '83' || key == '40') {
            $("#shield").css("top", posY + gameParams.shieldSpeed);
        }
    }

    console.log(posY);
});
