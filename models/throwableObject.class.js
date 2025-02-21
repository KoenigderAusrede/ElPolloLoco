
/**
 * Class representing a throwable object.
 */class ThrowableObject extends movableObject {
    isMuted;
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    currentRotationIndex = 0;
    
    /**
     * Create a throwable object with the specified position, dimensions, and sound manager.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {number} width - The width of the throwable object.
     * @param {number} height - The height of the throwable object.
     * @param {SoundManager} soundManager - The sound manager for handling sounds.
     */
    constructor(x, y, width, height, soundManager){
        super(x, y, width, height, soundManager);
        this.loadImage(this.IMAGES_ROTATION[this.currentRotationIndex]);
        this.loadImages(this.IMAGES_ROTATION);
        this.soundManager = soundManager;
        this.height = 40;
        this.width = 40;
    }

    /**
     * Update the throwable object's position and apply gravity.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    updateTO(deltaTime) {
        this.y += this.speedY * deltaTime;
        this.x += this.speedX * deltaTime;
        this.applyGravity(deltaTime)
        this.rotateBottle()
    }

    /**
     * Throw the throwable object by setting its speed and rotation.
     */
    throw(){
        this.speedY = - 0.75;
        this.speedX = 0.4;
        this.rotateBottle();
        this.soundManager.playSound('tossIt')
    }
    
    /**
     * Rotate the throwable object to the next image in the rotation.
     */
    rotateBottle() {    
        this.currentRotationIndex++;
        if (this.currentRotationIndex >= this.IMAGES_ROTATION.length) {
            this.currentRotationIndex = 0;
        }
        this.playAnimation(this.IMAGES_ROTATION);
        // this.image = this.loadImage(this.IMAGES_ROTATION[this.currentRotationIndex]);
    }
}
