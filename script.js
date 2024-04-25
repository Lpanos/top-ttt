const winningCombo = ["012","345","678","036","147","258","048","246"];
let xCount = "";
let oCount = "";
let turnNum = 0;
let xTurn;
let gameBoard = {};

gameBoard.gameBoardState = [null,null,null,null,null,null,null,null,null];

function createUser (name, playerSymbol){

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {name, playerSymbol, getScore, addScore};

}

const Player1 = createUser("player1", "X");
const Player2 = createUser("player2", "O");

const dialog = document.querySelector("dialog");
const submitBtn = document.getElementById("submitBtn");
const container = document.querySelector(".container");


dialog.showModal();

submitBtn.addEventListener("click", (event) => {
    const form = document.getElementById("start-form");

    Player1.name = form.playerOneName.value;
    Player2.name = form.playerTwoName.value;

    if(form.playerOneStarts.checked == true){
        xTurn = true;
    } else {
        xTurn = false;
    }

    dialog.close();

    form.reset();

    event.preventDefault();

    createBoard();
  });




container.addEventListener("click", (event) => {
 
    const isGameButton = event.target.classList.contains("game-button");
    
    if(isGameButton){

        let img;
        let gameOver = false;

        xCount = "";
        oCount = "";

        turnNum++

        if(xTurn){
            img = new Image()
            img.src = "./img/x.png"
            img.classList.add(event.target.id);
            gameBoard.gameBoardState.splice(event.target.id, 1, "X");

            xTurn = false;
        } else {
            img = new Image()
            img.src = "./img/o.png"
            img.classList.add(event.target.id);
            gameBoard.gameBoardState.splice(event.target.id, 1, "O");

            xTurn = true;
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
                let winner = Player1.name + " wins!";
                gameOver = true;
                showWinner(winner);
                
            } else if (arr.every(v => oCount.includes(v))){
                Player2.addScore();
                let winner = Player2.name + " wins!";
                gameOver = true;
                showWinner(winner);
            };

        }

        if (turnNum == 9 && gameOver == false){
            let winner = "It's a tie :P";
            showWinner(winner);
        }

    }

});

function createBoard(){

    resetBoard();

    const gameScore = document.querySelector(".game-score");
    const playerOneText = document.createElement("div");
    const playerTwoText = document.createElement("div");
    const playerOneScore = document.createElement("div");
    const playerTwoScore = document.createElement("div");

    const padOne = document.createElement("div");
    const padTwo = document.createElement("div");
    const padThree = document.createElement("div");
    const padFour = document.createElement("div");



    playerOneText.textContent = Player1.name + ":";
    playerTwoText.textContent = Player2.name + ":";

    playerOneScore.textContent = "0";
    playerTwoScore.textContent = "0";

    playerOneScore.classList.add("xScore");
    playerOneScore.classList.add("score-num");
    playerTwoScore.classList.add("oScore");
    playerTwoScore.classList.add("score-num");
    
    gameScore.appendChild(padOne);
    gameScore.appendChild(playerOneText);
    gameScore.appendChild(playerTwoText);
    gameScore.appendChild(padTwo);
    gameScore.appendChild(padThree);
    gameScore.appendChild(playerOneScore);
    gameScore.appendChild(playerTwoScore);
    gameScore.appendChild(padFour);

};

function resetBoard(){

    const board = document.querySelector(".game-board");

    while (board.lastChild){
        board.removeChild(board.lastChild);
    }

    for(i = 0; i < 9; i++){
        const newDiv = document.createElement("div");
        const newBtn = document.createElement("button");

        newDiv.classList.add("game-square");
        newDiv.classList.add(i);
        newBtn.classList.add("game-button");
        newBtn.id = i;

        newDiv.appendChild(newBtn);

        board.appendChild(newDiv);
    };
};

function updateScore(){
    const xScoreDisplay = document.querySelector(".xScore");
    const oScoreDisplay = document.querySelector(".oScore");

    xScoreDisplay.textContent = Player1.getScore();
    oScoreDisplay.textContent = Player2.getScore();
};

function showWinner(winner){

    const modal = document.getElementById("modal");
    const modalTitle = document.createElement("div");
    const modalText = document.createElement("div");
    const modalBtn = document.createElement("button");

    modalTitle.textContent = "Game Over!";
    modalText.textContent = winner;
    modalBtn.textContent = "New Game";

    modal.classList.remove("modal-hidden")
    modal.classList.add("modal-visible");
    modalTitle.classList.add("modal-title");
    modalText.classList.add("modal-text");
    modalBtn.classList.add("modal-button");

    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modal.appendChild(modalBtn);
}

container.addEventListener("click", (event) => {
    const isModalButton = event.target.classList.contains("modal-button")

    if (isModalButton){
        endGame();
    };
})

function resetModal(){
    const modal = document.getElementById("modal");

    while (modal.lastChild){
        modal.removeChild(modal.lastChild);
    }

    modal.classList.add("modal-hidden");
    modal.classList.remove("modal-visible");
}

function resetVariables(){
    xCount = "";
    oCount = "";
    turnNum = 0;
    xTurn = true;
    gameOver = false;

    gameBoard.gameBoardState = [null,null,null,null,null,null,null,null,null];
}

function endGame(){

    resetBoard();
    updateScore();
    resetVariables();
    resetModal();

};