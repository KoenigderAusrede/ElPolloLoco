/**
 * Represents a drawable object in the game with the ability to display images.
 */
class DrawableObject {
    img; // The image to be displayed
    imageCache = {}; // Cache of loaded images
    currentImage = 0; // Index of the current image in an animation
    height; // Height of the drawable object
    width; // Width of the drawable object
    animationFrameCounter = 0; // Counter for animation frames
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    } // Offset properties for the object's bounding box

    /**
     * Constructs a DrawableObject with the specified position, width, and height.
     * @param {number} x - The X-coordinate of the object's position.
     * @param {number} y - The Y-coordinate of the object's position.
     * @param {number} width - The width of the drawable object.
     * @param {number} height - The height of the drawable object.
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
            if (this.img) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
    }

        
    /**
     * Loads an image from the specified path and assigns it to the img property.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images and caches them for animations. Sets the initial image.
     * @param {string[]} arr - Array of image paths for animation.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        this.img = this.imageCache[arr[0]];
    }

    /**
     * Plays an animation by updating the current image based on a sequence of images.
     * @param {string[]} images - Array of image paths for animation.
     */
    playAnimation(images) {
        this.animationFrameCounter++;
        if (this.animationFrameCounter % 5 === 0) {  // Ändere das Bild alle 5 Aufrufe
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
}