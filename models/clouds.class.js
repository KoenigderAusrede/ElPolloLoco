/**
 * Represents the clouds in the game's background, extending the movableObject class.
 */
class Clouds extends movableObject {
    
    /**
     * The vertical position of the clouds within the game world.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud image.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud image.
     * @type {number}
     */
    height = 200;

    /**
     * The speed at which the clouds move, simulating wind.
     * @type {number}
     */
    speed = Math.random() * 2;

    /**
     * Constructs a Clouds object and initializes it with a random horizontal position.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png'); // Load the cloud image.
        this.x = Math.random() * 5700; // Set a random horizontal position for the clouds.
    }
}
