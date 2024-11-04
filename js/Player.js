class Player {
    constructor(gameInstance, image, gameCtx) {
        this.gameInstance = gameInstance;
        this.image = image;
        this.gameCtx = gameCtx;

        this.isAlive = true;
        this.x =  gameCanvas.width / 3;
        this.y =  gameCanvas.height / 2;
        this.g =  0.05;
        this.l =  -3;
        this.v =  0;
        this.w =  60;
        this.h =  60;
        this.oX =  this.w / 2;
        this.oY =  this.h / 2;
    }

    flap() {
        this.v = this.l;
    }

    updatePlayer() {
        this.v += this.g;
        this.y += this.v;

        if (this.y <= 0) {
            this.y = 0;
            this.v = 0;
        }

        if (this.y + this.h >= gameCanvas.height) {
            this.isAlive = false;
        }
    }
    
    drawPlayer() {
        this.gameInstance.playerNew.forEach(player => {
            if (player.isAlive) {
                this.gameCtx.save();
                this.gameCtx.translate(player.x + player.oX, player.y + player.oY);
                this.gameCtx.drawImage(player.image, -player.oX, -player.oY, player.w, player.h);
                this.gameCtx.restore();
            }
        });

    }
    
    resetPlayer() {
        this.x = gameCanvas.width / 3;
        this.y = gameCanvas.height / 2;
        this.v = 0;
        this.isAlive = true;
    }
}

export default Player;