// End overlay logic for Mario game
// Shows a victory or game over image at the end

var VIDEOPATH = typeof VIDEOPATH !== 'undefined' ? VIDEOPATH : 'video/';

function showEndOverlay(type, options) {
    var overlay = document.getElementById('endOverlay');
    var img = document.getElementById('endImage');
    var video = document.getElementById('overlayVideo');
    var button = document.getElementById('overlayActionButton');
    var message = document.getElementById('overlayMessage');

    if (!overlay || !img || !video || !button || !message)
        return;

    if (window.activeLevel && typeof window.activeLevel.pause === 'function') {
        window.activeLevel.pause();
    }

    if (window.keys && typeof window.keys.reset === 'function') {
        window.keys.reset();
    }

    img.style.display = 'none';
    video.style.display = 'none';
    button.style.display = 'none';
    message.textContent = '';
    button.onclick = null;

    overlay.style.display = 'flex';

    if (type === 'level1') {
        message.textContent = options && options.title ? options.title : 'Level 1 Complete!';
        video.src = options && options.videoSrc ? options.videoSrc : VIDEOPATH + 'videoforend.mp4';
        video.style.display = 'block';
        video.currentTime = 0;
        video.play().catch(function () {
            // autoplay may be blocked; still show the video controls
        });

        button.style.display = 'inline-block';
        button.textContent = options && options.buttonText ? options.buttonText : 'Start Level 2';
        button.onclick = function (event) {
            event.stopPropagation();
            hideEndOverlay();
            startNextLevel();
        };

        return;
    }

    if (type === 'win') {
        img.src = 'Content/mario-peach.png';
        img.alt = 'You Win!';
    } else {
        img.src = 'Content/3.png';
        img.alt = 'Game Over';
    }

    img.style.display = 'block';
    button.style.display = 'inline-block';
    button.textContent = type === 'win' ? 'Play Again' : 'Restart';
    button.onclick = function (event) {
        event.stopPropagation();
        if (type === 'win') {
            restartGame();
        } else {
            restartGame();
        }
    };
}

function hideEndOverlay() {
    var overlay = document.getElementById('endOverlay');
    var video = document.getElementById('overlayVideo');

    if (overlay)
        overlay.style.display = 'none';

    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

function startNextLevel() {
    if (!window.activeLevel)
        return;

    var level = window.activeLevel;
    var settings = {};

    for (var i = level.figures.length; i--; ) {
        if (level.figures[i] instanceof Mario) {
            settings.lifes = level.figures[i].lifes;
            settings.coins = level.figures[i].coins;
            settings.state = level.figures[i].state;
            settings.marioState = level.figures[i].marioState;
            break;
        }
    }

    level.reset();
    level.load(definedLevels[level.id + 1]);

    for (var j = level.figures.length; j--; ) {
        if (level.figures[j] instanceof Mario) {
            level.figures[j].setLifes(settings.lifes || 0);
            level.figures[j].setCoins(settings.coins || 0);
            level.figures[j].setState(settings.state || size_states.small);
            level.figures[j].setMarioState(settings.marioState || mario_states.normal);
            break;
        }
    }

    level.start();
}

function restartGame() {
    window.location.href = 'game.html';
}

window.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('overlayActionButton');

    if (button) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});
