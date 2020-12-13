const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = gameScore.querySelector('.points');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onGameStart() {
    gameStart.classList.add('hide');
    const wizard = document.createElement("div");
    wizard.classList.add('wizard');
    wizard.style.top = state.player.y + 'px';
    wizard.style.left = state.player.x + 'px';
    gameArea.appendChild(wizard);
    state.player.width = wizard.offsetWidth;
    state.player.height = wizard.offsetHeight;
    window.requestAnimationFrame(frame(0));
}

const frame = t1 => t2 => {
    if (t2 - t1 > game.frameLength) {
        gameAction(t2);
        state.scene.isActiveGame && window.requestAnimationFrame(frame(t2));
    } else {
        window.requestAnimationFrame(frame(t1));
    }
}

function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');

    //apply gravitation
    let isInAir = (state.player.y + state.player.height) <= gameArea.offsetHeight;
    if (isInAir) {
        state.player.y += game.speed;
    }

    state.scene.score++;

    //add bugs
    if (timestamp - state.scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
        let bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';

        gameArea.appendChild(bug);
        state.scene.lastBugSpawn = timestamp;
    }

    //add clouds
    if (timestamp - state.scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';

        gameArea.appendChild(cloud);
        state.scene.lastCloudSpawn = timestamp;
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
    if (keys.ArrowUp && state.player.y > 0) {
        state.player.y -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowDown && isInAir) {
        state.player.y += game.speed * game.movingMultiplier;
    }

    if (keys.ArrowLeft && state.player.x > 0) {
        state.player.x -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowRight && state.player.x + state.player.width < gameArea.offsetWidth) {
        state.player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space && timestamp - state.player.lastTimeFiredBall > game.fireInterval) {
        wizard.classList.add('wizard-fire');

        // add fireball
        addFireball(state.player);
        state.player.lastTimeFiredBall = timestamp;

    } else {
        wizard.classList.remove('wizard-fire');
    }

    //Collision detection
    bugs.forEach(bug => {
        if (isCollision(wizard, bug)) {
            gameOverAction();
        };

        fireballs.forEach(fireball => {
            if (isCollision(fireball, bug)) {
                state.score += game.bugKillBonus;
                bug.parentElement.removeChild(bug);
                fireball.parentElement.removeChild(fireball);
            }
        })
    });

    //apply movement
    wizard.style.top = state.player.y + 'px';
    wizard.style.left = state.player.x + 'px';


    //apply score
    gamePoints.textContent = state.scene.score;
}