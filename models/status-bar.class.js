/**
 * Base class for status bars displaying various information about the character.
 */
class StatusBar extends DrawableObject {

    /**
     * Create a status bar with the given images and position.
     * @param {string[]} images - An array of image paths for different percentage levels.
     * @param {number} x - The x-coordinate of the status bar on the canvas.
     * @param {number} y - The y-coordinate of the status bar on the canvas.
     */
    constructor(images, x, y){
        super();
        this.images = images;
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 40;
        this.setPercentage();
    }

    /**
     * Set the percentage and update the displayed image accordingly.
     * @param {number} percentage - The percentage to display on the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex(this.percentage)];
        this.image = this.imageCache[path];
    }

    /**
     * Resolve the image index based on the given percentage.
     * @param {number} percentage - The percentage to resolve an image index for.
     * @returns {number} - The index of the image to display.
     */
    resolveImageIndex(percentage){
        if(percentage == 100) {
            return 5;
        } else if (percentage > 79) {
            return 4;
        } else if (percentage > 59) {
            return 3;
        } else if (percentage > 39) {
            return 2;
        } else if (percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Draw the status bar on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

/**
 * Class representing the health bar of the character.
 */
class HealthBar extends StatusBar {
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
        ], 25, 20);
        this.setPercentage(100);
    }
}

/**
 * Class representing the coin bar of the character.
 */
class CoinBar extends StatusBar {
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ], 25, 50);   
    }
}

/**
 * Class representing the bottle bar of the character.
 */
class BottleBar extends StatusBar {
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ], 25, 80);
    }
}