const Gameboard = (() => {
    const boardMax = 9;
    const board = [
        '', '', '',
        '', '', '',
        '','',''
    ];
    const viewer = (() =>{
        console.log(board);
    })

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
            // console.log('the current win condition is ' + winArr); 
            // console.log('the player is at ' + playerSpots);

            // winArr is each win condition arry like [0, 1, 2], [0, 3, 6]...
            // tests if all elements in playerspots arr meet conditions

            // player spots has values inside a winning array
            // if(winArr.every(n => (playerSpots.find(x => x == n) !== undefined))){ 
            //     return true;
            // }

            //winArr.every(n => (playerSpots.includes(n))) 
            return winArr.every(n => (playerSpots.find(x => x == n) !== undefined));
        }) //winConditions
    }) //checkWin

    const clearBoard = (() =>{
        for(let i = 0; i < boardMax; i++){
            board[i] = ''
        }
    });

    return{ 
        board,
        boardMax,
        viewer,
        placeMark,
        checkAvail,
        isFull,
        checkWin,
        clearBoard
    };
})(); 

function playerFactory(player, sign){
    // spots contain the positions that the player holds on the gameboard
    const spots = [];
    const clearPlayerBoard = (() =>{
        spots.length = 0;
    });
    const name = player;
    const viewer = () =>{console.log(spots)}
    return {name, clearPlayerBoard, sign, spots, viewer}
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

    const displayMark = (player, position) =>{
        //console.log('the player to display is ' + player.sign)
        const sq = document.getElementById(`sq-${position}`)
        //sq.setAttribute('class', 'sq-item');
        sq.append(`${player.sign}`); 
    }

    const gameOver = (winner, loser) =>{
        let gameover = document.getElementById('gameover');
        gameover.style.display = 'block';

        //ModifyDom.header.innerHTML = `${winner.name} wins!`;

        let winnerText = document.getElementById('winner');
        winnerText.innerHTML = `${winner.name} wins!`

        // let loserText = document.getElementById('loser');
        // loserText.innerHTML = `${loser.name} loses!`
    }

    const restartGame = () =>{
        // let gameover = document.getElementById('gameover');
        // gameover.style.display = 'none';
    }

    const clearDisplay = () =>{
        const squares = document.getElementsByClassName('sq-item');
        for(let i = 0; i < squares.length; i++){
            squares[i].innerHTML = '';
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
    // check if win condition is met
    let winStatus = false;
    // while(!winStatus){
        //for(let i = 0; i <= 9; i++){ //for testing

        // gameboard is updated with player's mark
        updateGameboard(player, pos)
        winStatus = Gameboard.checkWin(player.spots);
        if(winStatus) {
            endGame(player);
            //break;
        } 

        else if(Gameboard.isFull(Gameboard.board)){   
            console.log('no winner!')
            endGame();
            //break;
        }
    //}
}

function playAgain(player, loser){
    // clear 
    let playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () =>{ 
        Gameboard.clearBoard(); 
        player.clearPlayerBoard(); 
        loser.clearPlayerBoard();

        //Gameboard.viewer();
        // console.log(player.spots);
        // console.log(loser.spots);

        // clear gameboard dom
        ModifyDom.clearDisplay();

        // clear winner text
        ModifyDom.restartGame();
    },{once:true});
}

function endGame(player){
    if(player == null) player = playerHolder.none;
    // reference player objects
    const playerOne = playerHolder.playerOne;
    const playerTwo = playerHolder.playerTwo;
    const none = playerHolder.none;
    
    let loser;
    switch(player){
        case playerOne:
            loser = playerTwo;
            break;
        case playerTwo:
            loser = playerOne;
            break;
        case none:
            loser = none;
    }
    ModifyDom.gameOver(player, loser);

    // remove event from squares
    const squares = document.getElementsByClassName('sq-item');
    for(let i = 0; i < squares.length; i++){
        //squares[i].removeEventListener('click', getCurrent());
        //console.log(squares[i])
    }
    playAgain(player, loser);
}

function switchPlayers(currentPlayer, position){
    const playerOne = playerHolder.playerOne;
    const playerTwo = playerHolder.playerTwo;
    let playerUpdate;
    console.log('the current player is ' + currentPlayer)

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
    // console.log('the new player is ' + playerUpdate)
    return playerUpdate;
}

function createGrid(){
    // reference player objects
    // const playerOne = playerHolder.playerOne;
    // const playerTwo = playerHolder.playerTwo;
    let currentPlayer = playerHolder.currentPlayer;

    // create rows
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
// const startBtn = document.getElementById('start-btn');
// startBtn.addEventListener('click', () => {
//     createGrid();
// },{once:true});