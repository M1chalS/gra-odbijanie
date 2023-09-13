let dirArrow = "right";
let interval;
let points = 0;
let lives = 3;

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
    }
}

async function checkLives() {
    if (lives === 0) {
        await alert("Koniec gry, punkty:" + points);
        location.reload();
    }
}

function checkCollisionWithGround() {
    let posX = $("#arrow").position().left;

    if (posX >= 975) {
        lives--;
        $("#lives").html(lives);
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
        $("#arrow").css("left", posX + 15);
    }

    if (dirArrow === "left") {
        $("#arrow").css("left", posX - 15);
    }
}

const gameState = {
    status: true,
    on: () => {
        interval = setInterval(function () {
            calculateArrow();
            checkCollision();
            checkLives();
            checkCollisionWithGround();
        }, 100)
    },
    off: () => clearInterval(interval)
};

$(function () {
    gameState.on();
    calculateShield();

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
    let posY = $("#shield").position().top;
    const key = (event.keyCode ? event.keyCode : event.which);

    if(posY > 0) {
        if (key == '87') {
            $("#shield").css("top", posY - 30);
        }
    }

    if(posY < 510) {
         if (key == '83') {
            $("#shield").css("top", posY + 30);
        }
    }

    console.log(posY);
});
