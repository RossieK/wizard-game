const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = gameScore.querySelector('.points');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};
let player = {
    x: 150,
    y: 150,
    width: 0,
    height: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4
};
let scene = {
    score: 0
}

function onGameStart() {
    gameStart.classList.add('hide');
    const wizard = document.createElement("div");
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);
    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;
    window.requestAnimationFrame(gameAction);
}

function gameAction() {
    const wizard = document.querySelector('.wizard');

    //apply gravitation
    let isInAir = (player.y + player.height) <= gameArea.offsetHeight;
    if (isInAir) {
        player.y += game.speed;
    }

    scene.score++;

    //Modify fireballs position
    let fireballs = document.querySelectorAll('.fireball');
    fireballs.forEach(fireball => {
        fireball.x += game.speed;
        fireball.style.left = fireball.x + 'px';

        if (fireball.x + fireball.offsetWidth > gameArea.offsetWidth) {
            fireball.parentElement.removeChild(fireball);
        }
    });

    // register user input 
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }

    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space) {
        wizard.classList.add('wizard-fire');

        // add fireball
        addFireball(player);

    } else {
        wizard.classList.remove('wizard-fire');
    }


    //apply movement
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';


    //apply score
    gamePoints.textContent = scene.score;


    window.requestAnimationFrame(gameAction);
}

function addFireball(player) {
    let fireball = document.createElement('div');

    fireball.classList.add('fireball');
    fireball.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px';

    gameArea.appendChild(fireball);
}

function onKeyDown(e) {
    e.preventDefault();
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}