const Gameboard = (() => {
    const board = [
        '', '', '',
        '', '', '',
        '','',''
    ];
    const viewer = (() =>{
        console.log(board);
    })
    const placeMark = ((player, position, sign) =>{
        board.splice(position, 1, sign);
    })
    const checkSpot = ((position) =>{
        if(board[position] =='') return true // spot is open
        else return false // spot is taken
    });

    return{ 
        board,
        viewer,
        placeMark,
        checkSpot
    };
})(); 

const playerFactory = (player, sign) => {
    // player and sign are passed in
    // const playerBoard = ['', '', '', 
    //     '', '', '',
    //     '', '', ''];
    const spots = [];
    // click spot
    // check if taken
    // check if win
    // if win => game ends
    // if not => next turn
    return {player, sign, spots}
};


function trackPlayerSpots(player, position){
    // check if spot on board is taken
    // if htis player's position num has a marker in the corresponding game board array, then it is taken
    
    // reference gameboard
    if(Gameboard.checkSpot(position)){ // true if spot is open
        Gameboard.placeMark(player, position, player.sign);
        player.spots.push(position); // array that holds the player's position
    }
    //player.playerBoard.splice(position, 1, sign); // keeps track of player array

    Gameboard.viewer();

}

function playGame(){
    const playerOne = playerFactory('one', 'x');
    const playerTwo = playerFactory('two', 'o');

    // enter value that will correspond to array
    let position = prompt('where would you like to place');
    trackPlayerSpots(playerOne, position);
    
    Gameboard.placeMark(playerOne, position, playerOne.sign); // update board
    
    // let newPos = prompt('where would you like to place');
    // Gameboard.placeMark(playerTwo, newPos, playerTwo.sign);

    // console.log(playerOne.playerBoard);
    // console.log(playerOne.spots)
    //console.log('this is the gameboard')
    //Gameboard.viewer();
}

playGame();


// const test = [1, 2, ,'', 3]
// if(typeof test[2] === 'undefined') console.log('spot open')