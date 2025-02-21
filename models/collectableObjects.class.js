/**
 * A base class for objects that can be collected by the character in the game.
 * Extends DrawableObject to include drawing capabilities.
 */
class CollectableObjects extends DrawableObject {
    // Class properties
    objectType = 'default';
    collectableObjectWidth = 0;
    collectableObjectHeight = 0;
    
    /**
     * Constructs a collectable object with given image paths and a sound manager.
     * @param {string[]} imgPaths - Array of image paths for the object's animation.
     * @param {SoundManager} soundManager - SoundManager instance to play sounds.
     */
    constructor(imgPaths, soundManager) {
        super();
        this.soundManager = soundManager;
        this.loadImages(imgPaths);
        this.x = this.getRandomX();
        this.y = this.getRandomY();
    }

    collect(character) {
        // To be implemented in subclasses
    }

    getRandomX() {
        let min = 200; // Minimale X-Koordinate
        let max = canvas.width*5 - this.collectableObjectWidth; // Maximale X-Koordinate
        return Math.random() * (max - min) + min;
    }
    
    getRandomY() {
        let min = 110; // Minimale Y-Koordinate
        let max = canvas.height - this.collectableObjectHeight - 80; // Maximale Y-Koordinate
        return Math.random() * (max - min) + min;
    }
}

/**
 * Represents a Coin object in the game, which the character can collect.
 */
class Coin extends CollectableObjects {
    objectType = "coin";

    constructor(soundManager) {
        super([
            'img/8_coin/coin_1.png',
            'img/8_coin/coin_2.png',
        ], soundManager);
        this.height = 100;
        this.width = 120;
        this.playAnimation(['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']);
    }

    /**
     * Draws the coin animation and calls the draw method of the parent class.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        this.playAnimation(['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']);
        super.draw(ctx);
    }

    /**
     * Handles the collection of the coin and plays a sound.
     * @param {Character} character - The character collecting the coin.
     */
    collect(character) {
        super.collect(character);
        this.soundManager.playSound('coin_sound');;
    }
}

/**
 * Represents a Bottle object in the game, which the character can collect.
*/
class Bottle extends CollectableObjects {
    objectType = "bottle";

    /**
    * Constructs a Bottle object with a specified sound manager.
    * Randomly selects an image for the bottle animation.
    * @param {SoundManager} soundManager - SoundManager instance to play bottle sound.
    */
    constructor(soundManager) {
        const imagePaths = [
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        ];

        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        const randomImage = imagePaths[randomIndex];

        super([randomImage], soundManager);
        this.height = 70;
        this.width = 50;
    }

    /**
    * Handles the collection of the bottle and plays a sound.
    * @param {Character} character - The character collecting the bottle.
    */
    collect(character) {
        super.collect(character);
        this.soundManager.playSound('bottle_sound');
    }
    
    /**
    * Overrides the getRandomY method to return a fixed Y-coordinate value
    * representing the ground level where the bottle will be placed.
    * @returns {number} The Y-coordinate for the ground level.
    */
    getRandomY() {
        return 360; // Der Wert für den Boden
    }
}