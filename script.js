const Gameboard = (() => {
    const boardMax = 9;
    const board = [
        '', '', '',
        '', '', '',
        '','',''
    ];

    // returns new board with mark placed
    const placeMark = ((player, position, sign) =>{
        board.splice(position, 1, sign);
    })

    // check if position in board is open
    const checkAvail = ((position) =>{
        if(board[position] =='') return true // spot is open
        else return false // spot is taken
    });

    // if a player's spots array match any of these then that player wins
    const winConditions = [
        [0, 1, 2], [0, 3, 6], 
        [1, 4, 7], [2, 5, 8],
        [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6] ];

    const isFull = (board) => {
        return board.every(n => n != '')
    }

    // make sure the winning array combo is within the player's array
    const checkWin = ((playerSpots) =>{
        return winConditions.some(winArr =>{ // iterate through all win conditions
            return winArr.every(n => (playerSpots.find(x => x == n) !== undefined));
        }) //winConditions
    }) //checkWin

    const clearBoard = (() =>{
        for(let i = 0; i < boardMax; i++){
            board[i] = ''
        }
    });

    const boardSquares = document.getElementsByClassName('sq-item');

    return{ 
        board,
        boardMax,
        placeMark,
        checkAvail,
        isFull,
        checkWin,
        clearBoard,
        boardSquares
    };
})(); 

function playerFactory(player, sign){
    // spots contain the positions that the player holds on the gameboard
    const spots = [];
    const clearPlayerBoard = (() =>{
        spots.length = 0;
    });
    const name = player;
    return {name, clearPlayerBoard, sign, spots}
};

const playerHolder = (() => {
    const playerOne = playerFactory('player one', 'x', false);
    const playerTwo = playerFactory('player two', 'o', false);
    const none = playerFactory('no one');
    let currentPlayer = playerOne;
    return {playerOne, playerTwo, none, currentPlayer}
})();

const ModifyDom = (() => {
    const gameContainer = document.getElementById('game-container');
    const header = document.getElementById('header');
    let gameover = document.getElementById('gameover');

    const displayMark = (player, position) =>{
        const sq = document.getElementById(`sq-${position}`)
        if(player == playerHolder.playerOne) sq.classList.add('diamond');
        else if(player == playerHolder.playerTwo) sq.classList.add('heart');
        //sq.append(`${player.sign}`); 
    }

    const gameOver = (winner) =>{
        gameover.style.display = 'block';
        let winnerText = document.getElementById('winner');
        winnerText.innerHTML = `${winner.name} wins!`
    }

    const restartGame = () =>{
        gameover.style.display = 'none';
    }

    const clearDisplay = () =>{
        const squares = document.getElementsByClassName('sq-item');
        for(let i = 0; i < squares.length; i++){
            squares[i].classList.remove('heart', 'diamond')
        }
    }
    return{gameContainer, header, displayMark, gameOver, restartGame, clearDisplay}
})();

function updateGameboard(player, position){
    if(Gameboard.checkAvail(position)){ // true if spot is open
        Gameboard.placeMark(player, position, player.sign); // update gameboard
        player.spots.push(position); // array that holds the player's position
        ModifyDom.displayMark(player, position);
        return true;
    }
    else{ // spot is taken
        return false;
    } 
}

function gameController(player, pos){
    let winStatus = false;
    // while(!winStatus){
    //for(let i = 0; i <= 9; i++){ //for testing

    // gameboard is updated with player's mark
    updateGameboard(player, pos)
    winStatus = Gameboard.checkWin(player.spots);
    if(winStatus) endGame(player);
    else if(Gameboard.isFull(Gameboard.board)) endGame();
}

function playAgain(){
    let playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () =>{ 
        Gameboard.clearBoard(); 
        playerHolder.playerOne.clearPlayerBoard(); 
        playerHolder.playerTwo.clearPlayerBoard();

        //Gameboard.viewer();
        // console.log('the cleared board for p1 is ' + playerHolder.playerOne.spots);
        // console.log('the cleared board for p2 is ' + playerHolder.playerTwo.spots);

        for(let sq of Gameboard.boardSquares){
            sq.classList.remove('sq-disabled');
        }
        
        // clear gameboard dom
        ModifyDom.clearDisplay();

        // clear winner text
        ModifyDom.restartGame();
    },{once:true});
}

function endGame(winner){
    if(winner == null) winner = playerHolder.none;
    ModifyDom.gameOver(winner);
    // disable gamne board from being modified 

    for(let sq of Gameboard.boardSquares){
        sq.classList.add('sq-disabled');
    }
    playAgain();
}

function switchPlayers(currentPlayer, position){
    const playerOne = playerHolder.playerOne;
    const playerTwo = playerHolder.playerTwo;
    let playerUpdate;
    switch(currentPlayer){
        case playerOne:
            gameController(currentPlayer, position);
            ModifyDom.header.innerHTML = 'Player 2\'s Turn'
            playerUpdate = playerTwo;
            break;
        case playerTwo:
            gameController(currentPlayer, position);
            ModifyDom.header.innerHTML = 'Player 1\'s Turn'
            playerUpdate = playerOne; 
            break;
    }
    return playerUpdate;
}

function createGrid(){
    let currentPlayer = playerHolder.currentPlayer;
    for(i = 0; i < 9; i++ ){
        let square = document.createElement('div');
        square.setAttribute('id', `sq-${i}`)
        square.setAttribute('class', 'sq-item');
        const position = Number(square.id.charAt(3));

        // functionality to squares
        square.addEventListener('click', () =>{
           currentPlayer = switchPlayers(currentPlayer, position)});
        ModifyDom.gameContainer.append(square);
    }
}

createGrid();
