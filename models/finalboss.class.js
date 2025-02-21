/**
 * Represents the Final Boss character with specific behavior and animations.
 */
class Finalboss extends movableObject {

    y = 180;
    x = 3500;
    width = 250;
    height = 280;
    speed = 0;
    health = 100;
    type = 'boss';
    state = 'walking'; // Possible states: 'walking', 'alerted', 'attacking', 'hurt', 'dead'
    health = 100;
    alertedTimer = 0;
    timebeforeAttack = 300;
    forward = true;
    offset = { // Offset for collision detection
        top: 120,
        bottom: 30,
        left: 0,
        right: 30,
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERTED = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of the Finalboss class.
     */
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_ALERTED)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.setupAnimation();
        this.forward = true;
        this.movementCounter = 0;
        this.setRandomMovementThreshold();
    }
    
    /**
     * Sets up the animation loop for the Final Boss.
     */
    setupAnimation() {
        setInterval(() => {
            this.animate();
        }, 1000 / 10);
    }

    /**
     * Animates the Final Boss based on its current state.
     */
    animate() {
        switch (this.state) {
            case 'walking':
                this.playAnimation(this.IMAGES_WALKING);
                this.moveConstantly()
                break;
            case 'alerted':
                this.playAnimation(this.IMAGES_ALERTED);
                this.moveBackAndForth()
                break;
            case 'attacking':
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed = 2.5;
                break;
            case 'hurt':
                this.playAnimation(this.IMAGES_HURT);
                this.speed = 4;
                break;
            case 'dead':
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                break;
        }
    }
    

    /**
     * Makes the Final Boss move constantly.
     */
    moveConstantly() {
        this.speed = 0.2;
    }

    /**
     * Sets a random movement threshold for the Final Boss to change direction.
     */
    setRandomMovementThreshold() {
        this.movementThreshold = 5 + Math.random() * 10;
    }

    /**
     * Makes the Final Boss move back and forth within its movement threshold.
     */
    moveBackAndForth() {
        this.movementCounter++;
        if (this.movementCounter >= this.movementThreshold) {
            this.forward = !this.forward;
            this.setRandomMovementThreshold();
            this.movementCounter = 0;
        }

        if (!this.forward) {
            this.speed = 2;
        } else {
            this.speed = -2;
        }
    }

    /**
     * Handles collision with the Final Boss, reducing its health and changing its state.
     */
    handleFinalBossCollision() {
        this.health -= 10;
        this.state = 'alerted';
        if (this.health < 1) {
            this.state = 'dead';
        } else if (this.health < 30) {
            this.state = 'hurt'
        } else if (this.health < 70) {
            this.state = 'attacking';
        }
    }   
    
    /*
     * Makes character properties available in finalboss.class for interaction.
     */
    setCharacter(character) {
        this.character = character;
    }
}