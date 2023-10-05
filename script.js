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
        for(let i = 0; i < spots.length; i++){
            spots[i] = ''
        }
    });
    const name = player;
    const viewer = () =>{console.log(spots)}
    return {name, clearPlayerBoard, sign, spots, viewer}
};

const playerHolder = (() => {
    const playerOne = playerFactory('player one', 'x', false);
    const playerTwo = playerFactory('player two', 'o', false);
    return{playerOne, playerTwo}
})();

function updateGameboard(player, position){
    if(Gameboard.checkAvail(position)){ // true if spot is open
        Gameboard.placeMark(player, position, player.sign); // update gameboard
        player.spots.push(position); // array that holds the player's position

        // display on board
        const sq = document.getElementById(`sq-${position}`)
        sq.setAttribute('class', 'sq-item');
        sq.append(`${player.sign}`)
        //Gameboard.viewer()
        return true;
    }
    else{ // spot is taken
        //Gameboard.viewer();
        return false;
    } 
    
}

// checks spot
// updates gameboard
// check for winners
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

        if(Gameboard.isFull(Gameboard.board)){   
            console.log('no winner!')
            //break;
        }
    //}
}


// when game ends...
// display winner
// button to clear and restart
function endGame(player){
    // reference player objects
    const playerOne = playerHolder.playerOne;
    const playerTwo = playerHolder.playerTwo;

    console.log(player.name + ' wins')
    let gameover = document.getElementById('gameover');
    gameover.style.display = 'block';

    let winner = document.getElementById('winner');
    winner.innerHTML = `${player.name} wins!`

    let loser;
    switch(player){
        case playerOne:
            loser = playerTwo;
            break;
        case playerTwo:
            loser = playerOne;
            break;
    }
    console.log('the loser is ' + loser.name)

    // clear 
    let playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () =>{ //add click each time
        // clear arrays
        Gameboard.clearBoard(); 
        player.clearPlayerBoard(); 
        loser.clearPlayerBoard();

        Gameboard.viewer();
        console.log('player one spots are ' + playerOne.spots);
        console.log('player two spots are ' + playerTwo.spots)
        // console.log(Gameboard.board);
        // console.log(player.spots);
        // console.log(loser.spots);

        // clear gameboard dom
        clearGBDom();
    },{once:true});


}

function clearGBDom(){
    const squares = document.getElementsByClassName('sq-item');
    for(let i = 0; i < squares.length; i++){
        squares[i].innerHTML = '';
    }
}

function createGrid(){
    const gameContainer = document.getElementById('game-container');
    // reference player objects
    const playerOne = playerHolder.playerOne;
    const playerTwo = playerHolder.playerTwo;
    let currentPlayer = playerOne;

    // create rows
    for(i = 0; i < 9; i++ ){
        let square = document.createElement('div');
        square.setAttribute('id', `sq-${i}`)
        square.setAttribute('class', 'sq-item');
        const position = Number(square.id.charAt(3));
        
        // square functionality
        square.addEventListener('click', () =>{
            //console.log(`youve clicked on #${square.id.charAt(3)}`)
            switch(currentPlayer){
                case playerOne:
                    gameController(currentPlayer, position);
                    currentPlayer = playerTwo;
                    break;
                case playerTwo:
                    gameController(currentPlayer, position);
                    currentPlayer = playerOne; 
                    break;
            }
        });
        gameContainer.append(square);
    }
}

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    createGrid();
});