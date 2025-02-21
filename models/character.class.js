/**
 * Represents the main character in the game, extending the movableObject class.
 */
class Character extends movableObject {

    // Character's properties and state variables
    world; // Reference to the game world
    speed = 5; // Movement speed of the character
    isJumping = false; // Is the character currently jumping
    isSleeping = false; // Is the character currently sleeping
    coins = 0; // Number of collected coins
    bottles = 0; // Number of collected bottles
    MAX_COINS = 30; // Maximum number of collectable coins
    MAX_BOTTLES = 10; // Maximum number of collectable bottles
    invulnerable = false; // Is the character currently invulnerable
    lastFrameChangeTime = 0; // Time since the last frame change for animations
    frameInterval = 200; // Interval between frame changes for animations
    hasBouncedOnEnemy = false; // Has the character bounced on an enemy
    offset = { // Offset for collision detection
        top: 120,
        bottom: 30,
        left: 40,
        right: 30,
    };

    // Arrays containing the image paths for character animations

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_SLEEPY = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    /**
    * Constructs the Character object with initial position, dimensions, world reference, and sound manager.
    * @param {number} x - The initial x-coordinate of the character.
    * @param {number} y - The initial y-coordinate of the character.
    * @param {number} height - The height of the character.
    * @param {number} width - The width of the character.
    * @param {World} world - The game world object that the character exists in.
    * @param {SoundManager} soundManager - The sound manager for handling character sounds.
    */
    constructor(x, y, height, width, world, soundManager) {
        super(x, y, width, height, soundManager);
        this.x = 120;
        this.y = 240;
        this.height = 200;
        this.width = 100;
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPY);
        this.applyGravity = this.applyGravity.bind(this);
        this.world = world;
        this.deadTriggered = false;
        this.animate = this.animate.bind(this);
        this.groundPosition = 240;
        this.speed = 7;
        this.lastMoveTime = Date.now();
        this.handleWalkingSound = this.handleWalkingSound.bind(this);
    }

    /**
     * Controls the main animation loop for the character.
     * This function updates the character's state and triggers various actions
     * such as walking sound, movement, jumping, other animations, and sleeping based on time intervals.
     * It also adjusts the camera position relative to the character's movement.
     */
    animate() {
        let now = Date.now();
        // Check if it's time to update the frame based on the interval.
        if (now - this.lastFrameChangeTime > this.frameInterval) {
            this.lastFrameChangeTime = now; // Update the time for the last frame change.

            // Handle various character actions.
            this.handleWalkingSound(); // Play walking sound if applicable.
            this.handleMovement(); // Handle character movement.
            this.handleJumping(); // Handle character jumping.
            this.handleAnimations(); // Handle character animations.
            this.handleSleeping(); // Handle character sleep state.

            // Update camera position to follow the character.
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
    * Handles the character's sleeping state and plays a snoring sound if the character is sleeping.
    */
    handleSleeping() {
        if (this.isSleeping) {
            this.soundManager.playSound('snorring');
        } else {
            this.soundManager.pauseSound('snorring');
        }
    }

    /**
     * Handles the sound of the character walking.
     * If the character is moving left or right, the walking sound is played and the sleeping state is reset.
     */
    handleWalkingSound() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.soundManager.playSound('walking_sound');
            this.isSleeping = false;
        } else {
            this.soundManager.pauseSound('walking_sound');
        }
    }

    /**
    * Handles the character's movement based on keyboard input.
    * Moves the character right or left depending on which key is pressed.
    */
    handleMovement() {
        if (this.world.keyboard.RIGHT) {
            this.moveCharacterRight();
        } else if (this.world.keyboard.LEFT) {
            this.moveCharacterLeft();
        }
    }

    /**
    * Moves the character to the right while checking the level boundaries.
    * Updates the movement flag and the time of the last movement.
    */
    moveCharacterRight() {
        this.hasMoved = true;
        if (this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMoveTime = Date.now();
        } else {
            this.x = this.world.level.level_end_x;
        }
    }

    /**
    * Moves the character to the left while checking the level boundaries.
    * Updates the movement flag and the time of the last movement.
    */
    moveCharacterLeft() {
        if (this.x > this.world.level.level_start_x) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMoveTime = Date.now();
        }
    }

    /**
    * Handles the character's jumping action.
    * If the jump key (SPACE) is pressed and the character is not already jumping, it triggers a jump.
    */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isJumping) {
            this.jump();
            this.isJumping = true;
            this.isSleeping = false;
            this.soundManager.playSound('jumping_sound');
            this.lastMoveTime = Date.now();
        }
    }

    /**
    * Handles the animations of the character based on its current state.
    * It updates the character's animation to reflect actions such as idle, walking, jumping, sleeping, hurt, or dead.
    */
    handleAnimations() {
        const currentTime = Date.now();
        const timeSinceLastMove = currentTime - this.lastMoveTime;

        // Reset movement flag after checking
        if (this.hasMoved) {
            this.hasMoved = false;
        }

        // Handle death animation and sound
        if (this.isDead() && !this.deadTriggered) {
            this.playAnimation(this.IMAGES_DEAD);
            this.soundManager.playSound('dying');
            this.soundManager.pauseSound('walking_sound');
            this.deadTriggered = true;
        }
        // Handle hurt animation and sound
        else if (this.isHurt() && !this.deadTriggered) {
            this.playAnimation(this.IMAGES_HURT);
            this.soundManager.playSound('ouch');
        }
        // Handle sleepy animation after a period of inactivity
        else if (timeSinceLastMove > 10000) {
            this.playAnimation(this.IMAGES_SLEEPY);
            this.isSleeping = true;
        }
        // Handle jumping animation
        else if (this.isAboveGround()) {
            this.frameInterval = 20;
            this.playAnimation(this.IMAGES_JUMPING);
        }
        // Handle walking animation if moving right or left
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.frameInterval = 20;
            this.playAnimation(this.IMAGES_WALKING);
        }
        // Default to idle animation if none of the above conditions are met
        else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
    * Checks if the character is hurt based on the time passed since the last hit.
    * Resets the sleeping state and returns a boolean indicating hurt status.
    * @returns {boolean} True if the character is hurt, false otherwise.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differnce in ms 
        timepassed = timepassed / 1000;
        this.isSleeping = false;
        return timepassed < 0.7;
    }

    /**
    * Increases the character's coin count by one.
    */
    collectCoin() {
        this.coins++;
    }

    /**
    * Increases the character's bottle count by one.
    */
    collectBottle() {
        this.bottles++;
    }
}