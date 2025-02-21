/**
 * Represents an explosion animation for the character's thrown objects.
 */
class Explosion extends DrawableObject {

    /**
     * Creates an instance of the Explosion class.
     * @param {number} x - The X-coordinate of the explosion.
     * @param {number} y - The Y-coordinate of the explosion.
     * @param {SoundManager} soundManager - The sound manager for playing explosion sound.
     */
    constructor(x, y, soundManager) {
        super(x, y, 70, 70);
        if (!soundManager) {
            throw new Error('SoundManager ist nicht definiert im Explosion-Konstruktor');
        }
        this.soundManager = soundManager;
        this.loadImages([
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ]);
        this.images = Object.values(this.imageCache);
        this.animationEnd = false;
        this.currentImage = 0;
   
    }

    /**
     * Animates the explosion by displaying a sequence of images.
     */
    animate() {
        if (!this.animationEnd) {
            this.playAnimation(this.images);
            if (this.currentImage === this.images.length - 1) {
                this.animationEnd = true;
                this.playExplosionSound();
            }
        }
    }

    /**
     * Plays the explosion animation by displaying a sequence of images.
     */
    playAnimation() {
        this.animationFrameCounter++;
        if (this.animationFrameCounter % 5 === 0) {
            if (this.currentImage < this.images.length) {
                this.img = this.images[this.currentImage];
                this.currentImage++;
            } else {
                this.currentImage = 0;
            }
        }
    }

    /**
     * Plays the explosion sound.
     */
    playExplosionSound() {
        if (!this.soundManager) {
            return;
        }
        this.soundManager.playSound('explosion_sound');
    }
    
}
