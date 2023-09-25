const Gameboard = (() => {
    const size = 9;
    const board = [
        '', '', '',
        '', '', '',
        '','',''
    ];
    return{ 
        viewer: function(){
            console.log(board);
        }
    };
})(); 

const playerFactory = (player, sign) => {
    // player and sign are passed in
    let spots = ['', '', '', 
        '', '', '',
        '', '', ''];

    // click spot
    // check if taken
    // check if win
    // if win => game ends
    // if not => next turn
    return {player, sign, spots}
};

function placeMark(player, position, sign){
    // check if spot on board is taken
    player.spots.splice(position, 0, sign); // keeps track of player array
}

function playGame(){
    const playerOne = playerFactory('one', 'x');

    //console.log(playerOne.spots);
    // enter value that will correspond to array
    let position = prompt('where would you like to place');
    placeMark(playerOne, position, playerOne.sign)

    console.log(playerOne.spots);
    //Gameboard.viewer();

}

playGame();