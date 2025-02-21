/**
 * Represents a Chicken enemy in the game, extending the movableObject class.
 */
class Chicken extends movableObject {
    width = 70;
    height = 65;
    otherDirection = false;
    isDying = false;
    animationFrameId = null;
    x = 0;
    y = 370;
    type;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Constructs a Chicken object with a specified horizontal position and speed.
     * @param {number} x - The horizontal position to spawn the chicken.
     * @param {number} speed - The movement speed of the chicken.
     */
    constructor(x = 200, speed = 0.15) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = speed + Math.random() * 0.5;
        this.x = x + Math.random() * 4300 + 600;
        this.animate();
        this.markForDeletion = false;
    }

    /**
     * Controls the animation loop of the chicken.
     * If the chicken is not dying, it moves to the left and cycles through its walking animations.
     */
    animate() {
        if (this.isDying) {
            return; // Verhindert weitere Animationen, wenn das Huhn stirbt
        }
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * Initiates the death animation of the chicken and calls the provided callback after a delay.
     * @param {Function} callback - A callback function to be called after the death animation is complete.
     */
    startDeathAnimation(callback) {
        this.isDying = true;
        this.speed = 0;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.image = this.loadImage(this.DEAD[0]);
        setTimeout(() => {
            callback();
        }, 2000);
    }
}

/**
 * Represents a SmallChicken enemy in the game, which is a smaller version of a Chicken with jumping capabilities.
 */
class SmallChicken extends Chicken {
    width = 50;
    height = 35;
    IMAGES_HOPPING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png']
    
    /**
     * Constructs a SmallChicken object with a specified horizontal position and speed.
     * @param {number} x - The horizontal position to spawn the small chicken.
     * @param {number} speed - The movement speed of the small chicken.
     */
    constructor(x, speed) { 
        super(x, speed);
        this.y = 390;
        this.loadImages(this.IMAGES_HOPPING);
        this.isJumping = false;
        this.onGround = true;
        this.speedY;
        this.gravity = 0.2;
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        this.setupJumping();
    }

    /**
     * Controls the animation loop of the small chicken.
     * If the chicken is not dying, it hops and cycles through its hopping animations.
     */
    animate() {
        if (this.isDying) {
            return;
        } 
            if (!this.onGround) {
                this.y += this.speedY;
                this.speedY += this.gravity;
                if (this.y > 390) {
                    this.y = 390;
                    this.onGround = true;
                }
            }    

        this.playAnimation(this.IMAGES_HOPPING);
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * Sets up the jumping behavior of the small chicken with randomized timing.
     */
    setupJumping() {
        let startDelay = Math.random() * 2000;
        setTimeout(() => {
            setInterval(() => {
                if (!this.isDying && this.onGround) {
                    this.jump();
                }
            }, 2000 + Math.random() * 1000);
         }, startDelay);
    }

    /**
     * Causes the small chicken to jump with a randomized upward speed and marks it as not on the ground.
     */
    jump() {
        if (this.onGround) {
            this.speedY = - 5 - Math.random() * 5; // Geschwindigkeit nach oben setzen
            this.onGround = false; // Nicht mehr am Boden
        }
    }

    /**
     * Initiates the death animation of the small chicken and calls the provided callback after a delay.
     * This overrides the startDeathAnimation from the Chicken class.
     * @param {Function} callback - A callback function to be called after the death animation is complete.
     */
    startDeathAnimation(callback) {
        super.startDeathAnimation(() => {
            this.image = this.loadImage(this.DEAD[0]);
            callback();
        });        
    }
}