/**
 * Class representing the level transition graphic.
 */
class LevelTransitionGraphic extends DrawableObject {
    /**
     * Create a new LevelTransitionGraphic instance.
     * @param {World} world - The game world.
     * @param {number} canvasWidth - The width of the game canvas.
     * @param {number} canvasHeight - The height of the game canvas.
     */
    constructor(world, canvasWidth, canvasHeight) {
        super();
        this.world = world;
        this.width = 600;
        this.height = 350;
        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - this.height) / 2;
        this.isVisible = false;
        this.text = ''; // Platzhalter
        this.buttonText = ''; // Platzhalter
    }

    /**
     * Show the level transition graphic with specified text and button text.
     * @param {string} text - The text to display.
     * @param {string} buttonText - The text for the button.
     */
    show(text, buttonText) {
        this.text = text;
        this.buttonText = buttonText;
        this.isVisible = true;
        this.createButton();
    }

    /**
     * Hide the level transition graphic and remove the button.
     */
    hide() {
        this.isVisible = false;
        this.removeButton();
    }

    /**
     * Create the button for the level transition graphic.
     */
    createButton() {
        if (!document.getElementById('transition-button')) {
            const canvasContainer = document.getElementById('canvasContainer');
            const button = document.createElement('button');
            button.id = 'transition-button';
            button.innerText = this.buttonText;
            button.style.position = 'absolute';
            button.style.left = '50%';
            button.style.top = '70%';
            button.style.transform = 'translate(-50%, -50%)';
            button.style.zIndex = '1002';
            button.classList.add('directionbuttons');
            button.onclick = (event) => {
                this.onButtonClick(event, this.world);
            };
            canvasContainer.appendChild(button);
        }
    }
    
    /**
     * Handle button click events.
     * @param {Event} event - The click event.
     * @param {World} world - The game world.
     */
    onButtonClick(event, world) {
        if (this.text === 'Level Completed!' && world) {
            world.nextLevel();
            this.hide();
            world.gameLoop();
        }
        else {
            location.reload();
        }
    }
    
    /**
     * Remove the button element from the DOM.
     */
    removeButton() {
        const button = document.getElementById('transition-button');
        if (button) {
            button.remove();
        }
    }

    /**
     * Draw the level transition graphic on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.isVisible) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Zeichne den Text für das Overlay
            ctx.fillStyle = 'white';
            ctx.font = '30px fantasy';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
        }
    }
}
