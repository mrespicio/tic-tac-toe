const Gameboard = (() => {
    const size = 9;
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

    return{ 
        viewer,
        placeMark,
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
    //player.playerBoard.splice(position, 1, sign); // keeps track of player array
    player.spots.push(position); // array that holds the player's position
    Gameboard.board
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
    console.log('this is the gameboard')
    Gameboard.viewer();


}

playGame();