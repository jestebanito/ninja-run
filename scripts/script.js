'use strict';

const game = {
    title: "Code Runner",
    isRunning: false,
    loopDuration: 700 / 60,
    bgPositionX: 0,
    obstacleSpeed: 5,
    score: 0,
    hiScore: 0,
    helpButtonPressed: false,

showScore: () => {
    game.score++;
    $('#score').text(game.score);

    if (game.score > game.hiScore) {
        game.hiScore = game.score;
        $('#high-score').text(game.hiScore);
    }
},

toggleIsRunning: () => {
    game.isRunning = !game.isRunning;
    $("#ninja-jumping").hide();
        // Increments Player Score
    game.displayScore = setInterval(game.showScore, 100);

    if (!game.isRunning) {
        game.score = 0;
        $('#score').text(this.score);
    }
},

enablePlayButton: () =>{
    $("#play-pause-btn").show();
    $("#play-pause-btn").on('click', () => {
    game.toggleIsRunning();
    const nameValue = player.playerForm.value;
    if (nameValue !== "") {
      player.name = nameValue;
      player.playerName.textContent = player.name;
    }
    $('#enter-player-name').hide();

    if (game.isRunning === true) {
    $("#play-pause-btn").css({"opacity": 0, "pointer-events": "none"});
    $("#help-btn").css({"opacity": 0, "pointer-events": "none"});
    $("#ninja-running").show();
    $("#ninja-idle").hide();
    game.moveBackground();
    game.generateObstacle();
    } 
    });
},

reset: () => {
    game.toggleIsRunning();
    $(".obstacle").remove();
    $("#ninja-running").show();
    $("#ninja-idle").hide();
    $("#ninja-dead").hide();
    $("#gameOverModal").modal("hide");
    $('#high-score').text(game.hiScore);
    // game.obstacleSpeed = 5;
    // game.loopDuration;
    game.moveBackground();
    game.generateObstacle();
    game.score = 0;

        // Resets the Jump Function
    clearInterval(player.ninjaJump.timerUpId);
    clearInterval(player.ninjaJump.timerDownId);
    player.ninjaJump.isJumping = false;
},


moveBackground: () => {
    game.bgInterval = setInterval(() => {
        if (game.isRunning) {
        // Matches Background Speed with Obstacle Speed
        game.bgPositionX -= game.obstacleSpeed;
        $("#bg-layers").css("background-position-x", game.bgPositionX + "px");
        }
    }, game.loopDuration);
},

generateObstacle: () => {
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);
    
    let randomTimeout = Math.floor(Math.random() * 1500) + 600;
    let obstacleRight = -20;
    let obstacleBottom = 40;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 51) + 50;
    
function moveObstacle() {
    obstacleRight += game.obstacleSpeed;
    obstacle.style.right = obstacleRight + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    obstacle.style.width = obstacleWidth + 'px';
    obstacle.style.height = obstacleHeight + 'px';
        
    // Incrementing Speed of Game every 100 Points
    if (game.isRunning) {
        if (game.score < 100) {
            game.obstacleSpeed = 5;
        } 
        if (game.score >= 100) {
            game.obstacleSpeed = 6;
        } 
        if (game.score >= 200) {
            game.obstacleSpeed = 7;
        } 
        if (game.score >= 300) {
            game.obstacleSpeed = 8;
        } 
        if (game.score >= 400) {
            game.obstacleSpeed = 9;
        } 
        if (game.score >= 500) {
            game.obstacleSpeed = 10;
        } 
        if (game.score >= 600) {
            game.obstacleSpeed = 11;
        } 
        if (game.score >= 700) {
            game.obstacleSpeed = 12;
        } 
        if (game.score >= 800) {
            game.obstacleSpeed = 13;
        } 
        if (game.score >= 900) {
            game.obstacleSpeed = 14;
        } 
    }

    let ninjaRunRight = parseInt(window.getComputedStyle(document.querySelector("#ninja-running")).getPropertyValue('right'));
    let ninjaRunWidth = parseInt(window.getComputedStyle(document.querySelector("#ninja-running")).getPropertyValue('width'));
    let ninjaRunHeight = parseInt(window.getComputedStyle(document.querySelector("#ninja-running")).getPropertyValue('height'));
    
    let ninjaJumpBottom = parseInt(window.getComputedStyle(document.querySelector('#ninja-jumping')).getPropertyValue('bottom'));
    let ninjaJumpRight = parseInt(window.getComputedStyle(document.querySelector('#ninja-jumping')).getPropertyValue('right'));
    let ninjaJumpWidth = parseInt(window.getComputedStyle(document.querySelector('#ninja-jumping')).getPropertyValue('width'));
    let ninjaJumpHeight = parseInt(window.getComputedStyle(document.querySelector('#ninja-jumping')).getPropertyValue('height'));

        // Collision Detection when Ninja is Running || Ninja is Jumping
    if (
        (ninjaRunRight >= obstacleRight - ninjaRunWidth) && (ninjaRunRight <= obstacleRight + obstacleWidth) && (ninjaRunHeight >= obstacleBottom) ||
        (ninjaJumpRight >= obstacleRight - ninjaJumpWidth) && (ninjaJumpRight <= obstacleRight + obstacleWidth) && (ninjaJumpBottom <= obstacleBottom + obstacleHeight) && (ninjaJumpBottom + ninjaJumpHeight >= obstacleBottom)
    ) {
        $("#ninja-dead").show();
        $("#ninja-running").hide();
        $("#gameOverModal").modal("show");
        $("#game-over-score").text(game.score);
        clearInterval(game.bgInterval);
        clearInterval(game.obstacleInterval);
        clearTimeout(game.obstacleTimeout);
        game.isRunning = false;
        // Stops incrementing Player Score
        clearInterval(game.displayScore);
        if (player.ninjaJump.isJumping) {
            clearInterval(player.ninjaJump.timerUpId);
            clearInterval(player.ninjaJump.timerDownId);
            $("#ninja-dead").hide();
        }
    }
}

    game.obstacleInterval = setInterval(moveObstacle, game.loopDuration);
    game.obstacleTimeout = setTimeout(game.generateObstacle, randomTimeout);
    
},



init: () => {  
        // Alert that says to Read Instructions First Before Playing 
    $("#play-pause-btn").on('click', () => {
        if (!game.isRunning && !game.helpButtonPressed) {
            alert('Read instructions first to continue!');
        }
    });
    
    $("#help-btn").on('click', () => {
      if (!game.isRunning && !game.helpButtonPressed) {
          game.helpButtonPressed = true;
          game.enablePlayButton();
        }
    });
    
    $("#play-again-btn").on("click", function() {
        game.reset();
    });
    
        // Reloads the Page when Player Quits
    $("#quit-btn").on("click", function() {
        location.reload();
    });
    
  }
};

const player = {
    playerForm: document.getElementById("enter-player-name"),
    playerName: document.getElementById("player-name"),
    name: "",
    ninjaJump: document.querySelector("#ninja-jumping"),
    ninjaJumpBottom: parseInt(window.getComputedStyle(document.querySelector('#ninja-jumping')).getPropertyValue('bottom')),

    gravity: 0.9,
    isJumping: false,
    timerUpId: null,
    timerDownId: null,

        // Jump Function for Ninja 
jump: function() {
    $('#ninja-jumping').show();
    $('#ninja-running').hide();
    if (player.ninjaJump.isJumping) return;
    
    player.ninjaJump.timerUpId = setInterval(() => {
        if (player.ninjaJumpBottom > 220) {    
            clearInterval(player.ninjaJump.timerUpId); 
            player.ninjaJump.timerDownId = setInterval(() => {
            if (player.ninjaJumpBottom <= 40) {
                clearInterval(player.ninjaJump.timerDownId);
                player.ninjaJump.isJumping = false;
                $('#ninja-jumping').hide();
                $('#ninja-running').show();
            }
            player.ninjaJumpBottom -= 10;
            player.ninjaJump.style.bottom = player.ninjaJumpBottom + 'px';
        }, 15);
    }
    player.ninjaJump.isJumping = true;
    player.ninjaJumpBottom += 30;
    player.ninjaJumpBottom = player.ninjaJumpBottom * player.gravity;
    player.ninjaJump.style.bottom = player.ninjaJumpBottom + 'px';
}, 20); 
}, 
    
control: function(e) {
    if (e.key === " ") {
        e.preventDefault(); 
        if (game.isRunning){
            player.jump();        
        }
    }
},
    
init: () => {
    document.addEventListener('keydown', (e) => {
        if (game.isRunning === true) { 
            player.control(e); 
        }
    });
        // Press Enter Listener to Display Player Name  
    player.playerForm.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const nameValue = player.playerForm.value;
            if (nameValue !== "") {
              player.name = nameValue;
              player.playerName.textContent = player.name;
              $('#enter-player-name').hide();
            }
        }
      });

    $('#play-pause-btn').on('click', () => {
        const nameValue = player.playerForm.value;
        if (nameValue !== "") {
          player.name = nameValue;
          player.playerName.textContent = player.name;
          $('#enter-player-name').hide();
        }
    });

},
};

$(document).ready(function() {
    game.init();
    player.init();
});




