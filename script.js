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

    return{ 
        board,
        boardMax,
        viewer,
        placeMark,
        checkAvail,
        isFull,
        checkWin
    };
})(); 

const playerFactory = (player, sign) => {
    // spots contain the positions that the player holds on the gameboard
    const spots = [];
    const name = player;
    return {name, sign, spots}
};

function updateGameboard(player, position){
    if(Gameboard.checkAvail(position)){ // true if spot is open
        Gameboard.placeMark(player, position, player.sign); // update gameboard
        player.spots.push(position); // array that holds the player's position
        // display on board
        const sq = document.getElementById(`sq-${position}`)
        sq.setAttribute('class', 'sq-item');
        sq.append(`${player.sign}`)
        Gameboard.viewer()
        return true;
    }
    else{
        Gameboard.viewer();
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

        // enter value that will correspond to array
        //let pos = prompt('where would p1 like to place');
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
    console.log(player.name + ' wins')
    let gameover = document.getElementById('gameover');
    gameover.style.display = 'block'

}

const gameContainer = document.getElementById('game-container');

function createGrid(){
    const playerOne = playerFactory('player one', 'x', false);
    const playerTwo = playerFactory('player two', 'o', false);
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
            if(currentPlayer == playerOne){
                gameController(currentPlayer, position);
                currentPlayer = playerTwo; // update to next player
            }
            else if(currentPlayer == playerTwo){
                gameController(currentPlayer, position);
                currentPlayer = playerOne; // update to next player
            }
        });
        gameContainer.append(square);
    }
}
//const sq1 = document.getElementById('sq-0');

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    createGrid();
    //playGame();
});