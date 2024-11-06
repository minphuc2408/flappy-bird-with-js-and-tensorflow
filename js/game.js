import Player from "./Player.js";
import GameConstructor from "./GameConstructor.js";
import GameDrawer from "./GameDrawer.js"
import GameUpdate from "./GameUpdater.js";
import GameKeyHandler from "./GameKeyHandler.js";
import GameReset from "./GameReset.js";
import ObstacleHandler from "./GameObstacles.js";

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function main() {  
    class Game {
        constructor() {
            this.GameConstructor = new GameConstructor(this);
            this.keyHandler = new GameKeyHandler(this); // Khởi tạo KeyHandler
            this.spaceShip = new Player(this, this.spaceShipImage, gameCtx);
            this.spaceShip1 = new Player(this, this.spaceShip1Image, gameCtx);
            this.spaceShip3 = new Player(this, this.spaceShip3Image, gameCtx);
            this.player = [this.spaceShip, this.spaceShip1, this.spaceShip3];
            this.playerInGame = [...this.player];
            this.obstacleHandler = new ObstacleHandler(this, gameCtx);
            this.gameReset = new GameReset(this);
            this.gameUpdate = new GameUpdate(this);
            this.gameDrawer = new GameDrawer(this, gameCtx);
            this.gameScreen = gameScreen(this);
            this.gameScreen.drawStartScreen();

            
        }
    
        startGame() {
            this.isGameStarted = true;
            this.isGameover = false;
            this.updateGame();
        }
        
        updateGame() { 
            this.gameUpdate.update();
        }
        
        drawGame() {
            this.gameDrawer.draw();
        }
        
        resetGame() {
            this.gameReset.reset();
        }
    
    }

    const game = new Game();

    const images = [
        game.spaceShipImage,
        game.spaceShip1Image,
        game.spaceShip3Image,
        game.spaceBackground,
    ];
    
    let imagesLoaded = 0;
    for (let i = 0; i < images.length; i++) {
        images[i].onload = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                // Tất cả các hình ảnh đã được tải xong
                game.resetGame();
            }
        };

        images[i].onerror = () => {
            console.error(`Failed to load image ${i}`);
        };
    }
}
main();





// function spaceKeyHandler1 (gameInstance) {
//     function handleKeyDown (event) {
//         const header = document.getElementById("header");
//         const tutorial = document.querySelector(".tutorial");

//         if (event.code === "Space" && !gameInstance.spacePressed) {
//             if (header && !header.classList.contains("hidden")) {
//                 event.preventDefault();
//                 return;
//             }

//             if (tutorial && !tutorial.classList.contains("hidden")) {
//                 event.preventDefault();
//                 return;
//             }
//             gameInstance.spacePressed = true;
//             gameInstance.spaceShip1.flap();
//         }
//     }

//     function handleKeyUp(event) {
//         if (event.code === 'Space') {
//             gameInstance.spacePressed = false; 
//         }
//     }
    
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

// }




function resizeCanvas() {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
}


function gameScreen(gameInstance) {
    let gameOverDisplayed = false;

    function drawBlurredBackground() {
        gameCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function drawStartScreen () {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(gameInstance.spaceBackground, 0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.fillStyle = 'white';
        gameCtx.font = '30px Arial';
        gameCtx.textAlign = 'center';
        gameCtx.fillText('Press Enter to start', gameCanvas.width / 2, gameCanvas.height / 2);
    }

    function drawGameOverScreen () {
        if(gameOverDisplayed) return;

        gameInstance.isGameStarted = false;
        gameOverDisplayed = true;

        drawBlurredBackground(gameCtx, gameCanvas);

        const gameOverContainer = document.createElement("div");
        gameOverContainer.className = "game-over-container";

        const gameOverTitle = document.createElement("div");
        gameOverTitle.className = "game-over-title";
        gameOverTitle.innerText = "Game Over"
        gameOverContainer.appendChild(gameOverTitle);

        const scoreText = document.createElement('div');
        scoreText.className = 'score-text';
        scoreText.innerText = `Score: ${gameInstance.score}`;
        gameOverContainer.appendChild(scoreText);

        const playAgainText = document.createElement('div');
        playAgainText.className = 'play-again-text';
        playAgainText.innerText = 'Play Again?';
        gameOverContainer.appendChild(playAgainText);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const yesButton = document.createElement('button');
        yesButton.className = 'restart-btn';
        yesButton.innerText = 'YES';
        yesButton.onclick = () => {
            gameInstance.resetGame();
            drawStartScreen();
            document.body.removeChild(gameOverContainer);
            gameOverDisplayed = false;
        };
        buttonContainer.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.className = 'restart-btn';
        noButton.innerText = 'NO';
        noButton.onclick = () => {
            gameInstance.resetGame();
            document.querySelector('.header').classList.remove('hidden');
            document.querySelector('.header').classList.add('visible');
            document.body.removeChild(gameOverContainer);
            gameOverDisplayed = false;
        };
        buttonContainer.appendChild(noButton);

        gameOverContainer.appendChild(buttonContainer);

        document.body.appendChild(gameOverContainer);
    }

    return {
        drawBlurredBackground,
        drawStartScreen,
        drawGameOverScreen
    };
}
