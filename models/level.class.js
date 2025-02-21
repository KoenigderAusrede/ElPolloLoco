/**
 * Class representing a game level.
 */
class Level{
    /**
     * Array of enemies in the level.
     * @type {Array}
     */
    enemies;
    
    /**
     * Array of clouds in the level.
     * @type {Array}
     */
    clouds;
    
    /**
     * Maximum number of coins in the level.
     * @type {number}
     */
    MAX_COINS;

    /**
     * Maximum number of bottles in the level.
     * @type {number}
     */
    MAX_BOTTLES;

    /**
     * Array of background objects in the level.
     * @type {Array}
     */
    backgroundOjects;

    /**
     * Width of the background image.
     * @type {number}
     */
    BACKGROUND_WIDTH = 719;

    /**
     * The x-coordinate where the level starts.
     * @type {number}
     */
    level_start_x;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 5 * this.BACKGROUND_WIDTH;

    /**
     * Create a new Level instance.
     * @param {Array} enemies - Array of enemies in the level.
     * @param {Array} clouds - Array of clouds in the level.
     * @param {Array} backgroundObjects - Array of background objects in the level.
     * @param {number} levelStartX - The x-coordinate where the level starts.
     * @param {number} levelEndX - The x-coordinate where the level ends.
     * @param {number} maxCoins - Maximum number of coins in the level.
     * @param {number} maxBottles - Maximum number of bottles in the level.
     */
    constructor(enemies, clouds, backgroundOjects, levelStartX, levelEndX, maxCoins, maxBottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundOjects = backgroundOjects;
        this.level_start_x = levelStartX;
        this.level_end_x = levelEndX;
        this.MAX_COINS = maxCoins,
        this.MAX_BOTTLES = maxBottles
    }
}