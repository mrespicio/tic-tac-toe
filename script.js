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
            console.log('the current win condition is ' + winArr); 
            console.log('the player is at ' + playerSpots);

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
    return {player, sign, spots}
};

function updateGameboard(player, position){
    if(Gameboard.checkAvail(position)){ // true if spot is open
        Gameboard.placeMark(player, position, player.sign); // update gameboard
        player.spots.push(position); // array that holds the player's position
    }
    Gameboard.viewer();
}

function playGame(){
    const playerOne = playerFactory('one', 'x');
    const playerTwo = playerFactory('two', 'o');

    // check if win condition is met
    let winStatus = false;
    while(!winStatus){
        //for(let i = 0; i <= 2; i++){ //for testing

        // enter value that will correspond to array
        let position = prompt('where would p1 like to place');
        // gameboard is updated with player's mark
        updateGameboard(playerOne, position);
        winStatus = Gameboard.checkWin(playerOne.spots);
        if(winStatus) {
            console.log('p1 wins!')
            break;
        }

        let newPos = prompt('where would p2 like to place');
        updateGameboard(playerTwo, newPos);
        winStatus = Gameboard.checkWin(playerTwo.spots);
        if(winStatus) {
            console.log('p2 wins!')
            break;
        }

        if(Gameboard.isFull(Gameboard.board)){
            console.log('no winner!')
            break
        } ;

    }
}

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', playGame);