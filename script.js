const winningCombo = ["012","345","678","036","147","258","048","246"];
let xCount = "";
let oCount = "";
let gameBoard = {};
let gameBoardState = [null,null,null,null,null,null,null,null,null];
gameBoard.gameBoardState = gameBoardState;

function createUser (name, playerSymbol){

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {name, playerSymbol, getScore, addScore};

}

const Player1 = createUser("Player1", "X");
const Player2 = createUser("Player2", "O");

let xTurn = true;


const board = document.querySelector(".game-board");

board.addEventListener("click", (event) => {
    const isGameButton = event.target.classList.contains("game-button");
    
    if(isGameButton){

        console.log(event.target.id);
        let img;

        xCount = "";
        oCount = "";

        if(xTurn){
            img = new Image()
            img.src = "./img/x.png"
            gameBoard.gameBoardState.splice(event.target.id, 1, "X");
        } else {
            img = new Image()
            img.src = "./img/o.png"
            img.classList.add = event.target.id;
            gameBoard.gameBoardState.splice(event.target.id, 1, "O");
        }

        event.target.replaceWith(img);

        for(let i = 0; i < gameBoard.gameBoardState.length; i++){

            if(gameBoard.gameBoardState[i] == "X"){
                xCount += i;
            } else if (gameBoard.gameBoardState[i] == "O"){
                oCount += i;
            }
        
        }
        
        for(i = 0; i < winningCombo.length; i++){

            let arr = winningCombo[i].split("");

            if(arr.every(v => xCount.includes(v))){
                Player1.addScore();
                console.log("Game Over! X wins! Total Score: X: " + Player1.getScore() + " O: " + Player2.getScore());
                
            } else if (arr.every(v => oCount.includes(v))){
                Player2.addScore();
                console.log("Game Over! O wins! Total Score: X: " + Player1.getScore() + " O: " + Player2.getScore());
            };

        }

    }

});

function clearBoard(){
    xCount = "";
    oCount = "";

}

function endGame(){

}