/**
 * Represents a background object in the game.
 * This class extends 'movableObject' and is used to create and manage background elements.
 */
class BackgroundObject extends movableObject{
    
     /**
     * Width of the background object.
     * @type {number}
     */
    width = 720;

     /**
     * Height of the background object.
     * @type {number}
     */
    height = 480;


        /**
     * Creates a new background object.
     * @param {string} imagePath - Path to the image file for the background object.
     * @param {number} x - The x-coordinate where the background object is placed.
     * @param {number} [y=480 - this.height] - The y-coordinate where the background object is placed. Defaults to align with the bottom of the screen.
     */
    constructor(imagePath, x, y){
        super().loadImage(imagePath)// Loads the image using the method from the parent class.
        this.x = x;                  // Set the x-coordinate.
        this.y =  480 - this.height; // Set the y-coordinate.
    }
}