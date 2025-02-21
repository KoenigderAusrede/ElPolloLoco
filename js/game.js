let canvas;
let world;
let keyboard = new Keyboard();
const touchController = new TouchController(keyboard);
let isInitialized = false;

/**
 * Initializes the game by retrieving the canvas element and configuring the world.
 * Loads the levels and sets up the level transition graphics.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.levelTransitionGraphic = new LevelTransitionGraphic(world, canvas.width, canvas.height);
};

/**
 * Event listener for keydown events.
 * Updates the state of the `keyboard` object when specific keys are pressed.
 * @param {KeyboardEvent} e - The keyboard event that triggered the listener.
 */
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            break;
        case " ":
            keyboard.SPACE = true;
            event.preventDefault();
            break;
        case "d":
            keyboard.D = true;
            break;    
    }
});

/**
 * Event listener for keyup events.
 * Resets the state of the `keyboard` object when specific keys are released.
 * @param {KeyboardEvent} e - The keyboard event that triggered the listener.
 */
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            break;
        case " ":
            keyboard.SPACE = false;
            break;
        case "d":
            keyboard.D = false;
            break;
    }
});
