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
    height: 0,
    lastTimeFiredBall: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4,
    fireballMultiplier: 5,
    fireInterval: 1000,
    cloudSpawnInterval: 3000,
    bugSpawnInterval: 2000
};
let scene = {
    score: 0,
    lastCloudSpawn: 0,
    lastBugSpawn: 0
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

function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');

    //apply gravitation
    let isInAir = (player.y + player.height) <= gameArea.offsetHeight;
    if (isInAir) {
        player.y += game.speed;
    }

    scene.score++;

    //add bugs
    if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
        let bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';

        gameArea.appendChild(bug);
        scene.lastBugSpawn = timestamp;
    }

    //add clouds
    if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';

        gameArea.appendChild(cloud);
        scene.lastCloudSpawn = timestamp;
    }

    //modify bugs position
    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= game.speed * 3;
        bug.style.left = bug.x + 'px';

        if (bug.x + bug.offsetWidth <= 0) {
            bug.parentElement.removeChild(bug);
        }
    });

    //modify clouds position
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.parentElement.removeChild(cloud);
        }
    });

    //modify fireballs position
    let fireballs = document.querySelectorAll('.fireball');
    fireballs.forEach(fireball => {
        fireball.x += game.speed * game.fireballMultiplier;
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

    if (keys.Space && timestamp - player.lastTimeFiredBall > game.fireInterval) {
        wizard.classList.add('wizard-fire');

        // add fireball
        addFireball(player);
        player.lastTimeFiredBall = timestamp;

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