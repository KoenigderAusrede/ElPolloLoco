/**
 * Initializes the game screen setup on window load.
 * Configures buttons, their styles, and event handlers for game interactions.
 */
window.onload = () => {
    const startScreen = document.getElementById('start-screen');
    const startGameButton = document.getElementById('start-game-button');
    const controlsScreen = document.getElementById('controls-screen');
    const controlsButton = document.getElementById('controls-button');
    const creditsScreen = document.getElementById('credits-screen');
    const creditsButton = document.getElementById('credits-button');
    const allButtons = [startGameButton, controlsButton, creditsButton];

    allButtons.forEach(button => {
        button.classList.add('directionbuttons');
    });
    

    const backButtons = document.getElementsByClassName('back-button');
    Array.from(backButtons).forEach(button => {
        button.classList.add('backbuttons');
    });


    startGameButton.onclick = () => {
        hideAllScreens();
        init();
        document.getElementById('buttonContainer').classList.remove('dNone')
    };

    controlsButton.onclick = () => {
        hideAllScreens();
        controlsScreen.style.display = 'flex';
    };

    creditsButton.onclick = () => {
        hideAllScreens();
        creditsScreen.style.display = 'flex';
    };

    Array.from(backButtons).forEach(button => {
        button.onclick = () => {
            hideAllScreens();
            startScreen.style.display = 'flex';
        };
    });
};



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("fullscreenBtn").addEventListener("click", toggleFullScreen);
});


/**
 * Toggles full screen mode for the game canvas.
 * This function is triggered when the full screen button is clicked.
 */
function toggleFullScreen() {
    let canvas = document.getElementById("fullscreen");
    document.getElementById('pollo').style.visibility = 'hidden';
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { /* Firefox */
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE/Edge */
        canvas.msRequestFullscreen();
    }
}

/**
 * Hides all screen elements.
 * This function is used to clear the screen before displaying a new screen.
 */
function hideAllScreens() {
    const screens = document.querySelectorAll('.controls-screen, .credits-screen, .start-screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
}

 