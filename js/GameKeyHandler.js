class GameKeyHandler {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.keysPressed = {};

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown(event) {
        if (gameCanvas && !gameCanvas.classList.contains("visible")) {
            
            this.keysPressed[event.code] = true;

            this.gameInstance.player.forEach(player => {
                if (event.code === "KeyA" && player === this.gameInstance.spaceShip1) {
                    if (this.gameInstance.isGameOver || this.gameInstance.gameScreen.gameOverDisplayed) {
                        event.preventDefault();
                        return;
                    }
                    player.flap();
                } 
                if (event.code === "Space" && player === this.gameInstance.spaceShip) {
                    if (this.gameInstance.isGameOver || this.gameInstance.gameScreen.gameOverDisplayed) {
                        event.preventDefault();
                        return;
                    }
                    player.flap();
                }
            });
            
            if(event.code === 'Enter' && !this.gameInstance.isGameStarted) {
                this.gameInstance.isGameStarted = true;
                this.gameInstance.startGame();
            }
        }

    }

    handleKeyUp(event) {
        if (event.code === "Space" || event.code === "KeyA") {
            this.keysPressed[event.code] = false;
        }
    }

    destroy() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }
}

export default GameKeyHandler;