/**
 * Class representing a movable object with movement, collision, and state handling.
 */
class movableObject extends DrawableObject {
    speed = 3;
    speedY = 0;
    otherDirection = false;
    health = 100;
    lastHit = 0;
    groundPosition = 250;
    GRAVITY = 1000;
    type;

    /**
     * Create a new movableObject instance.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {number} width - The width of the object.
     * @param {number} height - The height of the object.
     * @param {SoundManager} soundManager - The sound manager for handling sounds.
     */
    constructor(x, y, width, height, soundManager) {
        super(x, y, width, height);
        this.soundManager = soundManager;
    }

    /**
     * Apply gravity to the object's vertical speed.
     * @param {number} deltaTime - The time elapsed since the last frame.
     */
    applyGravity(deltaTime) {
        const timeInSeconds = deltaTime / 1000;
    
        // If it's a ThrowableObject, apply gravity continuously
        if (this instanceof ThrowableObject) {
            this.speedY += (this.GRAVITY - 998) * timeInSeconds;
            this.y += this.speedY * timeInSeconds;
        }
        // Otherwise, check if the object is on the ground
        else if (this.isJumping || this.isAboveGround()) {
            this.speedY += this.GRAVITY * timeInSeconds;
            this.y += this.speedY * timeInSeconds;
            if (this.y > this.groundPosition) {
                this.isJumping = false;
                this.y = this.groundPosition;
                this.speedY = 0;
            }
        } 
    } 
    
    /**
     * Check if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        // Check if the Y position of the object is above the ground position
        return this.y < this.groundPosition;
    }

    /**
     * Make the object jump.
     */
    jump() {
        this.speedY = -650; // Set the vertical speed to jump upwards
        this.isJumping = true;
    }

    /**
     * Move the object to the right.
     */
    moveRight() {
        this.x += this.speed; 
    }

    /**
     * Move the object to the left.
     */
    moveLeft() {
        this.x -= this.speed; 
    }

    /**
     * Check if the object is colliding with another object.
     * @param {object} obj - The object to check collision with.
     * @returns {boolean} True if there is a collision, false otherwise.
     */
    isColliding(obj) {
        const collisionDetected = 
            (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) && 
            (this.y + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
    
        return collisionDetected;
    }
    
    
    /**
     * Handle when the object is hit.
     */
    hit() {
        if (!this.invulnerable) {
            this.health -= 20;
            if (this.health < 0) {
                this.health = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.becomeInvulnerable();
            }
        }
    }

    /**
     * Make the object invulnerable for a short duration.
     */
    becomeInvulnerable() {
        this.invulnerable = true;
        setTimeout(() => {
            this.invulnerable = false;
        }, 700);
    }

    /**
     * Check if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.health == 0;
    }

}