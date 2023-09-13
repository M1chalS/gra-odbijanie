let dirShield = "down";
let dirArrow = "right";
let interval;

function calculateShield() {
    let posY = $("#shield").position().top;

    if (posY === 500) {
        dirShield = "up";
    }

    if (posY === 0) {
        dirShield = "down";
    }

    if (dirShield === "up") {
        $("#shield").css("top", posY - 10);
    }

    if (dirShield === "down") {
        $("#shield").css("top", posY + 10);
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
            calculateShield();
            calculateArrow();
        }, 100)
    },
    off: () => clearInterval(interval)
};

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
