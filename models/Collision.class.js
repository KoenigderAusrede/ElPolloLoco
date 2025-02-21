class Collision {
    constructor(character, enemies, collectableObjects, throwableObjects, soundManager, coinBar, bottleBar, healthBar, createExplosionCallback, explosions) {
        this.character = character;
        this.enemies = enemies;
        this.collectableObjects = collectableObjects;
        this.throwableObjects = throwableObjects;
        this.soundManager = soundManager;
        this.coinBar = coinBar;
        this.bottleBar = bottleBar;
        this.healthBar = healthBar;
        this.coinPercentage = 0;
        this.bottlePercentage = 0;
        this.createExplosion = createExplosionCallback;
        this.explosions = explosions;

    }

    /**
     * Checks for collisions between throwable bottles and enemies, triggering appropriate actions.
     */
    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    this.createExplosion(enemy.x, enemy.y);

                    switch (enemy.type) {
                        case 'boss':
                            enemy.handleFinalBossCollision(enemy);
                            break;
                        default:
                            enemy.startDeathAnimation(() => {
                                enemy.markForDeletion = true;
                            });
                            break;
                    }
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

    updateThrowableObjects(newThrowableObjects) {
        this.throwableObjects = newThrowableObjects;
    }

    /**
     * Checks for collisions between game objects such as enemies and collectables.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCollectableCollisions();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isJumping && this.handleJumpCollision(enemy)) {
                    // Handle character jumping on enemy
                } else if (!enemy.isDying) {
                    this.handleCharacterCollision(enemy);
                }
            }
        });

        // Remove enemies marked for deletion
        this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

        // Reset character's bounce flag if not jumping
        if (!this.character.isJumping) {
            this.character.hasBouncedOnEnemy = false;
        }
    }

    /**
     * Handles character collision with an enemy when not jumping.
     * @param {Enemy} enemy - The enemy that collided with the character.
     */
    handleCharacterCollision(enemy) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.health);
    }

    /**
     * Handles character collision with an enemy when jumping.
     * @param {Enemy} enemy - The enemy that collided with the character.
     * @returns {boolean} - True if the character successfully jumped on the enemy, false otherwise.
     */
    handleJumpCollision(enemy) {
        const isAboveEnemy = this.character.y + this.character.height > enemy.y;
        const isFalling = this.character.speedY > 0;

        if (isAboveEnemy && isFalling && !this.character.hasBouncedOnEnemy) {
            this.character.speedY = -250;
            this.soundManager.playSound('jumping_sound');
            this.character.hasBouncedOnEnemy = true;

            // Handle enemy based on its type
            switch (enemy.type) {
                case 'boss':
                    enemy.handleFinalBossCollision(enemy);
                    break;
                default:
                    enemy.startDeathAnimation(() => {
                        enemy.markForDeletion = true;
                    });
                    break;
            }

            return true; // Character successfully jumped on the enemy
        }

        return false; // Character did not jump on the enemy
    }


    /**
     * Checks for collisions between the character and collectable objects.
     */
    checkCollectableCollisions() {
        this.collectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.handleCollectableObjectCollision(object);
                this.collectableObjects.splice(index, 1);
            }
        });
    }

    /**
     * Handles collision between the character and a collectable object.
     * @param {CollectableObject} object - The collectable object that collided with the character.
     */
    handleCollectableObjectCollision(object) {
        object.collect(this.character);

        switch (object.objectType) {
            case "coin":
                this.character.collectCoin();
                this.coinPercentage = (this.character.coins / this.character.MAX_COINS) * 100;
                this.coinBar.setPercentage(this.coinPercentage);
                break;
            case "bottle":
                this.character.collectBottle();
                this.bottlePercentage = (this.character.bottles / this.character.MAX_BOTTLES) * 100;
                this.bottleBar.setPercentage(this.bottlePercentage);
                break;
        }
    }

    /**
     * Updates the game data with new sets of enemies, collectable objects, and throwable objects.
     * This function is used to refresh or change the game elements like enemies and objects during the game.
     * 
     * @param {Enemy[]} enemies - An array of enemy objects to be used in the game.
     * @param {CollectableObject[]} collectableObjects - An array of collectable objects for the player to collect.
     * @param {ThrowableObject[]} throwableObjects - An array of throwable objects that can be used by the player.
     */
    updateData(enemies, collectableObjects, throwableObjects) {
        this.enemies = enemies;
        this.collectableObjects = collectableObjects;
        this.throwableObjects = throwableObjects;
    }
}