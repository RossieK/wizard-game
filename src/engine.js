let keys = {};

const initialState = () => ({
    player: {
        x: 150,
        y: 150,
        width: 0,
        height: 0,
        lastTimeFiredBall: 0
    },
    scene: {
        score: 0,
        lastCloudSpawn: 0,
        lastBugSpawn: 0,
        isActiveGame: true
    },
    clouds: [],
    attacks: [],
    bugs: []
});

const next = (state) => ({
    player: state.player,
    scene: state.scene,
    clouds: state.clouds,
    attacks: state.attacks,
    bugs: state.bugs
});

function isCollision(firstEl, secondEl) {
    let firstRect = firstEl.getBoundingClientRect();
    let secondRect = secondEl.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom || firstRect.bottom < secondRect.top || firstRect.right < secondRect.left || firstRect.left > secondRect.right);
}

function gameOverAction() {
    state.scene.isActiveGame = false;
    gameOver.classList.remove('hide');
}

function addFireball(player) {
    let fireball = document.createElement('div');

    fireball.classList.add('fireball');
    fireball.style.top = (state.player.y + state.player.height / 3 - 5) + 'px';
    fireball.x = state.player.x + state.player.width;
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