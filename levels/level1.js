// Constants for background and level dimensions
/** @constant {number} BACKGROUND_WIDTH - Width of each background segment in pixels. */
const BACKGROUND_WIDTH = 719;

/** @constant {number} LEVEL_WIDTH - Number of segments in the level. */
const LEVEL_WIDTH = 6; // Level Segment = 719px

/** @constant {number} level_end_x - X-coordinate for the end of the level. */
let level_end_x = BACKGROUND_WIDTH * LEVEL_WIDTH;

/**
 * Creates background segments for the level.
 * @param {number} segmentCount - The number of segments to create.
 * @returns {BackgroundObject[]} Array of background segment objects.
 */
function createBackgroundSegments(segmentCount) {
    const segments = [];
    for (let i = 0; i < segmentCount; i++) {
        // Creating multiple layers for each segment
        segments.push(new BackgroundObject('img/5_background/layers/air.png', BACKGROUND_WIDTH * i));
        segments.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${(i % 2) + 1}.png`, BACKGROUND_WIDTH * i));
        segments.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${(i % 2) + 1}.png`, BACKGROUND_WIDTH * i));
        segments.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${(i % 2) + 1}.png`, BACKGROUND_WIDTH * i));
    }
    return segments;
}

// Level 1 definition
/** 
 * Represents the first level of the game.
 * Includes enemies, clouds, background segments, and game level parameters.
 */
const level1 = new Level(
    // Array of enemies
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ],
    // Array of clouds
    [
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
    ],
    // Background segments
    createBackgroundSegments(LEVEL_WIDTH),
    100,  // level_start_x
    level_end_x = (LEVEL_WIDTH - 1) * BACKGROUND_WIDTH + 100, // level_end_x calculation
    30, // MAX_COINS
    10 // MAX_BOTTLES
);

export default level1;  
