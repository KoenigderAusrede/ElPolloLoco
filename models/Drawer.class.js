/**
 * Handles the drawing of game elements on the canvas.
 */
class Drawer {
    
    /**
     * Creates a Drawer instance associated with a specific game world.
     * @param {World} world - The game world to which the drawer is connected.
     */
    constructor(world) {
        this.world = world
    }

    /**
     * Draws the game elements on the canvas, including background, objects, characters, and more.
     */
    draw() {
        // Refresh canvas
        this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height)
        this.world.ctx.translate(this.world.camera_x, 0)
        this.world.addObjectsToMap(this.world.level.backgroundOjects)
        this.world.level.clouds.forEach(cloud => {
            cloud.moveLeft();
            this.world.addToMap(cloud);
            if (cloud.x + cloud.width < 0) {
                cloud.x = 720;
            }
        });

        this.world.ctx.translate(-this.world.camera_x, 0)
        // --------------- Space for Fixed Objects ---------------------
        this.world.addToMap(this.world.healthBar);
        this.world.addToMap(this.world.coinBar);
        this.world.addToMap(this.world.bottleBar);
        this.world.addToMap(this.world.gameInfo)

        // --------------- Space for Fixed Objects ---------------------
        this.world.ctx.translate(this.world.camera_x, 0)

        this.world.addObjectsToMap(this.world.collectableObjects);
        this.world.addObjectsToMap(this.world.throwableObjects);
        this.world.explosions.forEach(explosion => {
            explosion.draw(this.world.ctx);
        });
        
        this.world.enemies.forEach(chicken => {
            if (!chicken.markForDeletion) {
            chicken.moveLeft();
            this.world.addToMap(chicken);
            }
        });

        this.world.collectableObjects.forEach(obj => {
            obj.draw(this.world.ctx);
        });

        this.world.addToMap(this.world.character)
        this.world.ctx.translate(-this.world.camera_x, 0)
        this.world.levelTransitionGraphic.draw(this.world.ctx);

        this.world.character.animate();
    }

}