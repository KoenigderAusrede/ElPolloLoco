/**
 * The main game world class.
 */
class World {
    // Class properties
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    collectableObjects = [];
    enemiesDefeated = [];
    MAX_COINS = 30;
    MAX_BOTTLES = 10;
    isPaused = false;
    isMuted = false;
    readyToThrow = true;
    gameOver = false;
    currentLevel = 1;
    overlay = null;
    levels = null;
    gameCompletedShown = false;

    /**
     * Creates a new World instance.
     * @param {HTMLCanvasElement} canvas - The game canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        // Initialize canvas, context and keyboard
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        // Load levels and start the game loop
        this.loadLevels().then(() => {
            this.startLevel(this.currentLevel);
            this.collision = new Collision(this.character, this.enemies, this.collectableObjects, this.throwableObjects, this.soundManager, this.coinBar, this.bottleBar, this.healthBar, this.createExplosion.bind(this), this.explosions);
            this.gameLoop();
        });

        // Initialize current level
        this.enemies = [];
        this.clouds = [];
        this.boss = null;
        this.endBossDefeated = false;

        // Initialize collectable objects
        this.initializeCollectables();

        // Initialize game over graphic
        this.gameOverGraphic = new GameOverGraphic('img/9_intro_outro_screens/game_over/gameOvertransparent.png', this.canvas.width, this.canvas.height)

        // Initialize explosions and timers
        this.explosions = [];
        this.lastUpdateTime = 0;
        this.gameOverSoundPlayed = false;

        // Initialize status bars
        this.initializePanels();

        // Initialize mute button click event
        this.initializeMuteButton();

        // Initialize game components
        this.drawer = new Drawer(this);
        this.soundManager = new SoundManager();
        this.soundManager.playSound('backgroundmusic');
        this.character = new Character(120, 240, 200, 100, this, this.soundManager);
    }

    /** Initializes the mute button click event and sets the initial mute state. */
    initializeMuteButton() {
        this.isMuted = false;
        const muteButton = document.getElementById('mute-button');
        if (muteButton) {
            muteButton.addEventListener('click', () => this.toggleMute());
        }
    }

    /** Initializes collectable objects (coins and bottles) and populates the collectableObjects array. */
    initializeCollectables() {
        this.collectableObjects = [];
        for (let i = 0; i < this.MAX_COINS + this.MAX_BOTTLES; i++) {
            this.collectableObjects.push(i < this.MAX_COINS ? new Coin(this.soundManager) : new Bottle(this.soundManager));
        }
    }
    
    /** Initializes status bars (health, coins, bottles) and GameInfo (current level, points gathered & Boss HP). */
    initializePanels() {
        this.healthBar = new HealthBar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();
        this.gameInfo = new GameInfo(600, 40);
    }

    /** Initializes explosions with corresponding sounds */
    createExplosion(x, y) {
        const explosion = new Explosion(x, y, this.soundManager);
        this.explosions.push(explosion);
    }

    /** Asynchronously loads the game levels from separate modules and stores them in the `this.levels` array.
     * Also identifies and stores the boss level.
     * @returns {Promise<void>} A promise that resolves when all levels are loaded. */
    async loadLevels() {
        this.levels = [];
        const levelPromises = [];
    
        for (let i = 1; i <= 3; i++) {
            levelPromises.push(import(`../levels/level${i}.js`));
        }
    
        try {
            const importedLevels = await Promise.all(levelPromises);
            importedLevels.forEach(levelModule => {
                this.levels.push(levelModule.default);
            });
            this.identifyAndStoreBoss();
        } catch (error) {
            console.error('Fehler beim Laden der Levels:', error);
        }
    }

    /** Identifies and stores the boss enemy for the current level in the `this.boss` property. */
    identifyAndStoreBoss() {
        for (const level of this.levels) {
            const boss = level.enemies.find(enemy => enemy instanceof Finalboss);
            if (boss) {
                this.boss = boss;
                this.boss.setCharacter(this.character);
                break;
            }
        }
    }

    /** The game loop that handles updating and rendering the game.
     * @param {number} timestamp - The current timestamp from requestAnimationFrame. */
    gameLoop(timestamp) {
        if (this.isPaused) {
            return;
        }
        if (!timestamp) {
            this.lastUpdateTime = performance.now();
        } else {
            const deltaTime = Math.min(timestamp - this.lastUpdateTime, 50);
            this.lastUpdateTime = timestamp;

            if (this.gameOver) {
                this.handleGameOver();
            } else {
                this.updateAndDraw(deltaTime);
            }
        }
        this.animationFrameId = requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    /* Handles the game over state, including displaying game over graphics and sounds. */
    handleGameOver() {
        if (!this.gameOverSoundPlayed) {
            this.soundManager.playSound('gameOverSound');
            this.gameOverSoundPlayed = true;
        }
        this.soundManager.pauseSound('backgroundmusic');
        this.soundManager.pauseSound('bossmusic')
        this.gameOverGraphic.fadeIn();
        this.gameOverGraphic.draw(this.ctx);
    }


    /* Updates and draws the game based on the elapsed time (deltaTime).
     * @param {number} deltaTime - The time elapsed since the last frame in milliseconds. */
    updateAndDraw(deltaTime) {
        if (!isNaN(deltaTime) && deltaTime > 0) {
            this.update(deltaTime);
            this.drawer.draw();
        }
    }

    /* Pauses the game loop and cancels the animation frame. */
    pauseGameLoop() {
        this.isPaused = true;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /** Updates the game state based on the elapsed time.
    * @param {number} deltaTime - The time elapsed since the last frame in milliseconds. */
    update(deltaTime) {
        if (this.isPaused) {
            return;
        }
        this.collision.checkCollisions();
        this.checkThrowObjects();
        this.collision.checkBottleCollisions();
        this.character.applyGravity(deltaTime);
        this.throwableObjects.forEach(obj => {
            obj.updateTO(deltaTime);
        });
        this.throwableObjects = this.throwableObjects.filter(obj => !obj.markForDeletion);
        this.explosions.forEach(explosion => {
            explosion.animate();
        });
        this.explosions = this.explosions.filter(explosion => !explosion.animationEnd);
        this.updateEnemies();
        this.checkGameStatus();
        this.checkBossState();
        this.updateGameInfo();
    }

    /* Checks the state of the boss enemy and performs actions accordingly. */
    checkBossState() {
        if (this.boss) {
            switch (this.boss.state) {
                case 'alerted':
                    // Pause background music and play boss entry and boss music
                    this.soundManager.pauseSound('backgroundmusic');
                    this.soundManager.playSound('boss_entry');
                    this.soundManager.playSound('bossmusic');
                    break;
                case 'dead':
                    // Pause boss music, remove the boss enemy, mark endBossDefeated, and end the game as a win
                    this.soundManager.pauseSound('bossmusic');
                    this.endBossDefeated = true;
                    this.endGame('win');
                    break;
                case 'hurt':
                    if (this.boss.x -70 < this.character.x) {
                        this.boss.speed = 0;
                        setTimeout(() => this.boss.speed = 4, 20000);   
                    } 
            }
        }
    }

    updateGameInfo(){
        this.gameInfo.updateLevel(this.currentLevel)
        let score = this.calculateScore();
        this.gameInfo.updateScore(score);
        if (this.boss) {
            this.gameInfo.updateBossHealth(this.boss.health);
        }
    }

    calculateScore() {
        const coinPoints = 10;
        const bottlePoints = 5;
        const enemyPoints = 25;
    
        let scoreFromCoins = this.character.coins * coinPoints;
        let scoreFromBottles = this.character.bottles * bottlePoints;
        let scoreFromEnemies = this.enemiesDefeated.length * enemyPoints;
    
        return scoreFromCoins + scoreFromBottles + scoreFromEnemies;
    }
    

    /** Updates the enemies array by removing any enemy that has been marked for deletion.
     * This method filters out all enemies that have a truthy value for their `markForDeletion` property,
     * effectively cleaning up the enemies array and removing them from the game world. */
    updateEnemies() {
        this.enemies.forEach(enemy => {
            if (enemy.markForDeletion && !this.enemiesDefeated.includes(enemy)) {
                this.enemiesDefeated.push(enemy);
            }
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);
    }

    /** Starts a new game level.
    * @param {number} currentLevel - The current level to start. */
    startLevel(currentLevel) {
        this.isPaused = false;
        const level = this.levels[currentLevel - 1];
        this.MAX_COINS = level.MAX_COINS;
        this.MAX_BOTTLES = level.MAX_BOTTLES;
        this.collectableObjects = [];
        for (let i = 0; i < this.MAX_COINS; i++) {
            this.collectableObjects.push(new Coin(this.soundManager));
        }
        for (let i = 0; i < this.MAX_BOTTLES; i++) {
            this.collectableObjects.push(new Bottle(this.soundManager));
        }
        this.enemies = level.enemies;
        this.clouds = level.clouds;
        this.level = level;
        this.character.coins = 0;
        this.character.bottles = 0;
        this.character.health = 100;
        this.character.x = 100;
        this.coinBar.setPercentage(0);
        this.bottleBar.setPercentage(0);
        this.healthBar.setPercentage(100);
        this.soundManager.playSound('backgroundmusic');
        this.setupFullscreenChangeListeners();
        this.adjustCanvasSize();
        if (currentLevel > 1) {
            this.collision.updateData(this.enemies, this.collectableObjects, this.throwableObjects);
        }
    }

    /* Proceeds to the next game level. */
    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel <= 4) {
            this.startLevel(this.currentLevel);
        }
    };

    /* Checks if the character can throw objects and handles the throwing action as well as handling the inventory. */
    checkThrowObjects() {
        if (this.keyboard.D && this.readyToThrow) {
            if (this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100, 40, 40, this.soundManager);
                this.collision.updateThrowableObjects(this.throwableObjects);
                bottle.throw();
                this.soundManager.playSound('throw')
                this.throwableObjects.push(bottle);
                this.character.bottles--;
                this.bottlePercentage = (this.character.bottles / this.MAX_BOTTLES) * 100 + 10;
                this.bottleBar.setPercentage(this.bottlePercentage);
                this.readyToThrow = false;
                setTimeout(() => {
                    this.readyToThrow = true;
                }, 500);
            } else {
                this.soundManager.playSound('nobottle');
            }
        }
    }

    /** Adds an object to the map and draws it on the context.
     * If the object is oriented in the other direction, the image is flipped first.
     * @param {object} mo - The object to be drawn. This should have methods like `draw` and properties like `otherDirection`. 
     **/
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageback(mo)
        }
    }

    /** Flips the image of an object horizontally.
     * @param {object} mo - The object to be flipped. This object should have properties like `width` and `x`. */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** Reverts the flipped image of an object to its original state.
     * This function is called after using `flipImage` to reset the original orientation.
     * @param {object} mo - The object whose flip is to be reverted. It should have the property `x`. */
    flipImageback(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /** Adds a list of objects to the map.
     * This function iterates over an array of objects and adds each one to the map.
     * @param {object[]} objects - An array of objects to be added to the map. Each object should be compatible with `addToMap`. */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**Checks the current status of the game and updates game states accordingly.
     * The game ends if the character runs out of health, or if certain conditions are met,
     * such as collecting all coins in the first two levels or defeating the end boss in the third level. */
    checkGameStatus() {
        if (this.character.health <= 0) {
            this.gameOver = true;
        } else if (this.currentLevel < 3 && this.character.coins === this.MAX_COINS) {
            this.endGame("clear");
        } else if (this.currentLevel === 3 && this.endBossDefeated) {
            this.endGame("win");
        }
    }

    /**Ends the game and handles the game state based on the result.
     * Depending on the result, different sounds are played and different messages are displayed.
     * @param {string} result - The result of the game, which can be either "clear" or "win". */
    endGame(result) {
        switch (result) {
            case "clear":
                this.soundManager.pauseSound('backgroudmusic')
                this.soundManager.pauseSound('walking_sound')
                this.soundManager.playSound('tadaa')
                this.levelTransitionGraphic.show('Level Completed!', 'Next Level');
                this.pauseGameLoop();
                break;

            case "win":
                this.soundManager.pauseSound('walking_sound')
                this.soundManager.playSound('tadaa')
                this.soundManager.pauseSound('bossmusic')
                this.levelTransitionGraphic.show('Congratulations You Win!', 'Restart Game');
                setTimeout(() => {
                    this.pauseGameLoop();
                }, 1425);
                break;
        }
    }

    /**Sets up event listeners for fullscreen changes and window resizing.
     * This function adds listeners to different fullscreen change events for various browsers and a window resize event.
     * When these events are triggered, the canvas size is adjusted accordingly.
     * This function ensures that listeners are only added once to prevent duplicate handlers.*/
    setupFullscreenChangeListeners() {
        if (!this.fullscreenChangeListenersAdded) {
            document.addEventListener('fullscreenchange', this.adjustCanvasSize.bind(this));
            document.addEventListener('webkitfullscreenchange', this.adjustCanvasSize.bind(this));
            document.addEventListener('mozfullscreenchange', this.adjustCanvasSize.bind(this));
            document.addEventListener('MSFullscreenChange', this.adjustCanvasSize.bind(this));
            window.addEventListener('resize', this.adjustCanvasSize.bind(this));
            this.fullscreenChangeListenersAdded = true;
        }
    }

    /**
     * Adjusts the size of the canvas based on the current fullscreen state and window size.
     * If the document is in fullscreen mode, the canvas is scaled to fit the window while maintaining its aspect ratio.
     * If the document is not in fullscreen, the canvas is returned to its original size. */
    adjustCanvasSize() {
        let canvas = document.getElementById('canvas');
        if (canvas) {
            if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
                let scale = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
                canvas.style.transform = 'scale(' + scale + ')';
                canvas.style.transformOrigin = 'center';
            } else {
                canvas.style.transform = 'none';
            }
        }
    }

    /** Toggles the mute state of the game's sound manager. */
    toggleMute() {
        this.soundManager.toggleMute();
    }
}