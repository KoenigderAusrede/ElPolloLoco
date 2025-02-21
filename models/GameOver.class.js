/**
 * Represents the "Game Over" screen and restart button.
 */
class GameOverGraphic extends DrawableObject {
    opacity = 0;
    buttonCreated = false;

    /**
     * Creates an instance of the GameOverGraphic class.
     * @param {string} imagePath - The path to the image for the "Game Over" screen.
     * @param {number} canvasWidth - The width of the canvas.
     * @param {number} canvasHeight - The height of the canvas.
     */
    constructor(imagePath, canvasWidth, canvasHeight) {
        super();
        this.loadImage(imagePath);
        this.img.onload = () => {
            this.width = 600; 
            this.height = 350;
            this.x = (canvasWidth - this.width) / 2; 
            this.y = (canvasHeight - this.height) / 2;
            this.zIndex = 100;
        };
    }

    /**
     * Fades in the "Game Over" screen and creates the restart button.
     */
    fadeIn() {
        if (this.opacity < 1) {
            this.opacity += 0.001;
            this.createRestartButton();
            this.buttonCreated = true;
        }
    }

    /**
     * Draws the "Game Over" screen with opacity.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }
    
    /**
     * Creates the restart button and attaches it to the DOM.
     */
    createRestartButton() {
        if (!document.getElementById('restart-button')) {
            const canvasContainer = document.getElementById('canvasContainer');
            const restartButton = document.createElement('button');
            restartButton.id = 'restart-button';
            restartButton.innerText = 'Restart Game';
            restartButton.style.position = 'absolute';
            restartButton.style.left = '50%';
            restartButton.style.top = '70%';
            restartButton.style.transform = 'translateX(-50%)';
            restartButton.style.zIndex = '1002';
            restartButton.classList.add('directionbuttons');
    
            restartButton.onclick = () => {
                location.reload();
            };
            canvasContainer.appendChild(restartButton);
        }
    }
    
}
