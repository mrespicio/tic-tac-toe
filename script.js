const Gameboard = (() => {
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

    const checker = (arr, target) =>{
        target.every(num => arr.includes(num))
    }

    // compare player spots to winning spots
    // currently: only checking if array matches exactly
    // todo: need to just make sure the winning array combo is
    // within the player's array

    // spots is player arr
    // arr is winning array

    const checkWin = ((playerSpots) =>{
        winConditions.some(winArr =>{ // iterate through all win conditions
            console.log('the current win condition is ' + winArr); 
            console.log('the player is at ' + playerSpots);

            // winArr is each win condition arry like [0, 1, 2], [0, 3, 6]...
            // tests if all elements in playerspots arr meet conditions

            // player spots has values inside a winning array
            if(winArr.every(n => (playerSpots.find(x => x == n) !== undefined))){ 
                console.log('found all of win arr inside of player spots')
                return true;
            }

        }) //winConditions
    }) //checkWin

    return{ 
        board,
        viewer,
        placeMark,
        checkAvail,
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
    //while(!winStatus){
        for(let i = 0; i <= 3; i++){ //for testing
        // enter value that will correspond to array
        let position = prompt('where would you like to place');

        // gameboard is updated with player's mark
        updateGameboard(playerOne, position);
        console.log(Gameboard.checkWin(playerOne.spots));
        winStatus = Gameboard.checkWin(playerOne.spots);
        if(winStatus == true) break;
    }
    
    //if(playerOne.checkWin(playerOne.spots)) console.log('player wins')

    
    // let newPos = prompt('where would you like to place');
    // Gameboard.placeMark(playerTwo, newPos, playerTwo.sign);

    // console.log(playerOne.playerBoard);
    // console.log(playerOne.spots)
    //console.log('this is the gameboard')
    //Gameboard.viewer();
}

playGame();