let keys = {};

let player = {
    x: 150,
    y: 150,
    width: 0,
    height: 0,
    lastTimeFiredBall: 0
};

let scene = {
    score: 0,
    lastCloudSpawn: 0,
    lastBugSpawn: 0,
    isActiveGame: true
}


function isCollision(firstEl, secondEl) {
    let firstRect = firstEl.getBoundingClientRect();
    let secondRect = secondEl.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom || firstRect.bottom < secondRect.top || firstRect.right < secondRect.left || firstRect.left > secondRect.right);
}

function gameOverAction() {
    scene.isActiveGame = false;
    gameOverPoints.textContent = Number(gamePoints.textContent) + 1 + " points earned";
    gameOver.classList.remove('hide');
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