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

const nextClouds = (state) => (state.clouds);
const nextPlayer = (state) => (state.player);
const nextScene = (state) => (state.scene);
const nextAttacks = (state) => (state.attacks);
const nextBugs = (state) => (state.bugs);

const next = (state) => ({
    player: nextPlayer(state),
    scene: nextScene(state),
    clouds: nextClouds(state),
    attacks: nextAttacks(state),
    bugs: nextBugs(state)
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