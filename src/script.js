const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};
let player = {
    x: 150,
    y: 300
};
let game = {
    speed: 2
};

function onGameStart() {
    gameStart.classList.add('hide');
    const wizard = document.createElement("div");
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);

    window.requestAnimationFrame(gameAction);
}

function gameAction() {
    const wizard = document.querySelector('.wizard');

    if (keys.ArrowUp) {
        player.y -= game.speed;
        wizard.style.top = player.y + 'px';
    }

    if (keys.ArrowDown) {

    }

    if (keys.ArrowLeft) {

    }

    if (keys.ArrowRight) {

    }

    window.requestAnimationFrame(gameAction);
}

function onKeyDown(e) {
    e.preventDefault();
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}