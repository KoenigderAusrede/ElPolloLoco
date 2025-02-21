
/**
 * Base class for the status displaying  information about the game to the user.
 */
class GameInfo extends DrawableObject {

    currentLevel = 1;
    playerScore = 0;
    bossHealth = 0;
    /**
     * Create information with the given images and position.
     * @param {string[]} images - An array of image paths for different percentage levels.
     * @param {number} x - The x-coordinate of the status bar on the canvas.
     * @param {number} y - The y-coordinate of the status bar on the canvas.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 400;
        this.height = 40;
        this.bossHealthIconLoaded = false;
    }

    /**
     * Draw the status bar on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        super.draw(ctx);

        ctx.font = "25px Fantasy";
        ctx.fillStyle = "darkorange";
        ctx.fillText(`Level: ${this.currentLevel}`, this.x, this.y + 5);
        ctx.fillText(`Score: ${this.playerScore}`, this.x, this.y + 25);

        if (this.currentLevel === 3) {
            if (!this.bossHealthIconLoaded) {
                this.loadBossHealthIcon();
            }
            if (this.bossHealthIconLoaded) {
                let iconWidth = 50;
                let iconHeight = 50;
                ctx.fillStyle = 'white'; // Farbe des Rahmens
                let barX = this.x - 100; // X-Position des Balkens
                let barY = this.y + this.height + 25; // Y-Position des Balkens
                let barWidth = 200; // Die Breite des Balkens
                let barHeight = 20; // Die Höhe des Balkens
                let borderRadius = 10; // Der Radius der abgerundeten Ecken

                // Zeichne den Rahmen mit abgerundeten Ecken
                this.drawRoundedRectangle(ctx, barX, barY, barWidth, barHeight, borderRadius);

                // Zeichne den Lebensbalken des Bosses innerhalb des Rahmens
                let healthBarWidth = this.bossHealth * 2; // Breite basierend auf der Gesundheit des Bosses
                ctx.fillStyle = 'red';
                this.drawRoundedRectangle(ctx, barX, barY, healthBarWidth, barHeight, borderRadius);
                ctx.drawImage(this.bossHealthIcon, this.x + 70, this.y + 50, iconWidth, iconHeight);
            };
        }
    }

    loadBossHealthIcon() {
        this.bossHealthIcon = new Image();
        this.bossHealthIcon.onload = () => {
            this.bossHealthIconLoaded = true;
        };
        this.bossHealthIcon.src = 'img/7_statusbars/3_icons/icon_health_endboss.png';
    }

    drawRoundedRectangle(ctx, x, y, width, height, borderRadius) {
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.lineTo(x + width - borderRadius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
        ctx.lineTo(x + width, y + height - borderRadius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
        ctx.lineTo(x + borderRadius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
        ctx.lineTo(x, y + borderRadius);
        ctx.quadraticCurveTo(x, y, x + borderRadius, y);
        ctx.closePath();
        ctx.fill();
    }

    updateLevel(newLevel) {
        this.currentLevel = newLevel;
    }

    updateScore(newScore) {
        this.playerScore = newScore;
    }

    updateBossHealth(newHealth) {
        this.bossHealth = newHealth;
    }

}