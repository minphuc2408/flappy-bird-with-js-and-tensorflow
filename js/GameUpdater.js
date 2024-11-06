class GameUpdate {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
    }

    update() {
        // GameStart
        if (!this.gameInstance.isGameStarted) {
            return;
        }

        this.gameInstance.drawGame();

        //Player
        this.gameInstance.playerInGame.forEach(player => {
            player.updatePlayer();
            console.log(player.y);
        });

        this.gameInstance.playerInGame = this.gameInstance.playerInGame.filter(player => player.isAlive);

        if(this.gameInstance.playerInGame.length === 0) {
            this.gameInstance.isGameOver = true;
            this.gameInstance.player.forEach(player => {
                player.resetPlayer();
            });
            this.gameInstance.playerInGame = this.gameInstance.player;
        }
  
        this.gameInstance.framesSinceLastObstacle += 1/144;

        if (this.gameInstance.framesSinceLastObstacle >= this.gameInstance.obstacleInterval) {
            this.gameInstance.obstacleHandler.createRandomObstacleColumn();
            this.gameInstance.framesSinceLastObstacle = 0;
        }

        this.gameInstance.obstacleHandler.updateObstacles();

        // GameOver
        if (this.gameInstance.isGameOver) {
            this.gameInstance.gameScreen.drawGameOverScreen(); 
            return;
        }

        requestAnimationFrame(() => this.update());
    }
}

export default GameUpdate;