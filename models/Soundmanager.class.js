/**
 * Class responsible for managing sounds in the game.
 */
class SoundManager {
    constructor() {
        // Initialize all sounds that need to be controlled
        this.sounds = {
            backgroundmusic: new Audio('audio/el_pollo_loco.mp3'),
            nobottle: new Audio('audio/nobottle.mp3'),
            tadaa: new Audio('audio/win_tadaa.mp3'),
            gameOverSound: new Audio('audio/gameOver.mp3'),
            walking_sound: new Audio('audio/walking.mp3'),
            jumping_sound: new Audio('audio/jump.mp3'),
            snorring: new Audio('audio/snorring.mp3'),
            ouch: new Audio('audio/damage.mp3'),
            dying: new Audio('audio/dying.mp3'),
            coin_sound: new Audio('audio/collect_coin.mp3'),
            bottle_sound: new Audio('audio/collect_bottle.mp3'),
            tossIt: new Audio('audio/throw.mp3'),
            explosion_sound: new Audio('audio/breaking_glass.mp3'),
            bossmusic: new Audio('audio/bossfight.mp3')
        };
        this.sounds.backgroundmusic.loop = true;
        this.isMuted = false;
        this.isPlaying = {};
        for (let key in this.sounds) {
            this.isPlaying[key] = false;
            this.sounds[key].onended = () => {
                this.isPlaying[key] = false;
            };
        } 
    }

    /**
     * Play a sound if it's not muted and not currently playing.
     * @param {string} soundName - The name of the sound to play.
     */
    playSound(soundName) {
        let sound = this.sounds[soundName];
        if (sound && !this.isMuted && !this.isPlaying[soundName]) {
            sound.play();
            this.isPlaying[soundName] = true;
        }
    }
    
    /**
     * Pause a sound and reset its playback position.
     * @param {string} soundName - The name of the sound to pause.
     */
    pauseSound(soundName) {
        let sound = this.sounds[soundName];
        if (sound && this.isPlaying[soundName]) {
            sound.pause();
            sound.currentTime = 0;
            this.isPlaying[soundName] = false;
        }
    }
    
    
    /**
     * Toggle the mute state of all sounds.
     */
    toggleMute() {
        // Toggle the 'isMuted' state based on the current state of any sound
        this.isMuted = !this.isMuted;

        // Toggle the mute state for all sounds
        for (let key in this.sounds) {
            if (this.sounds.hasOwnProperty(key)) {
                this.sounds[key].muted = this.isMuted;
            }
        }

        // Update the text of the mute button
        const muteButton = document.getElementById('mute-button');
        muteButton.innerText = this.isMuted ? 'Unmute' : 'Mute';
    }
}