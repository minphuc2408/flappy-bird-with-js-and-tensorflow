class GameUpdate {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
    }

    update() {
        // GameStart
        if (!this.gameInstance.isGameStarted) {
            return;
        }

        //Player
        this.gameInstance.playerNew.forEach(player => {
            player.updatePlayer();
        });

        this.gameInstance.playerNew = this.gameInstance.playerNew.filter(player => player.isAlive);
        if(this.gameInstance.playerNew.length === 0) {
            this.gameInstance.isGameOver = true;
            this.gameInstance.player.forEach(player => {
                player.resetPlayer();
            });
            this.gameInstance.playerNew = this.gameInstance.player;
        }

        // GameOver
        if (this.gameInstance.isGameOver) {
            this.gameInstance.gameScreen.drawGameOverScreen(); 
            return;
        }
        
        this.gameInstance.drawGame();

        this.gameInstance.framesSinceLastObstacle += 1/144;

        if (this.gameInstance.framesSinceLastObstacle >= this.gameInstance.obstacleInterval) {
            this.gameInstance.obstacleHandler.createRandomObstacleColumn();
            this.gameInstance.framesSinceLastObstacle = 0;
        }

        this.gameInstance.obstacleHandler.updateObstacles();

        requestAnimationFrame(() => this.update());
    }
}

export default GameUpdate;