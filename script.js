//constants
const GAME_STATE_STARTED=0;
const GAME_STATE_ENDED=1;

//html elements
const playerSpan=document.getElementById("player")
const gameTable=document.getElementById('game')

const game={
    state: GAME_STATE_STARTED,
    turn : 'X',
    move: 0

}

function restartGame(){
    game.turn='X';
    game.move=0;
    game.state=GAME_STATE_STARTED;
    Array.from(document.getElementsByTagName('td')).forEach( i =>{
        i.textContent="";
    })
}

function endGame(winner ){
    if(winner){
        
        setTimeout(function() {
            alert("GAME OVER || Winner is "+winner)
          },2);
    }
    else {
        
        setTimeout(function() {
            alert("GAME OVER || DRAW ");
          },2);
    }
    
    game.state=GAME_STATE_ENDED;
}
function nextTurn(){
    if(game.state==GAME_STATE_ENDED) return; 
    game.move++;
    if(game.turn==='X') game.turn='O';
    else game.turn='X';
    if(game.move==9){
        endGame();
    }
    playerSpan.textContent=game.turn;
}

function isRowCaptured(row){
    let tableRow=Array.from(gameTable.children[0].children[row-1].children)
    let winningCombo=game.turn+game.turn+game.turn;
    console.log("wining",winningCombo)
    if(tableRow.map(x => x.textContent).join('')=== winningCombo){
       endGame(game.turn)
    }

}
function isColCaptured(col){
    let tableCol=[ gameTable.children[0].children[0].children[col-1],
        gameTable.children[0].children[1].children[col-1],
        gameTable.children[0].children[2].children[col-1]
    ]
    let winningCombo=game.turn+game.turn+game.turn;
    console.log("wining",winningCombo)
    if(tableCol.map(x => x.textContent).join('')=== winningCombo){
        endGame(game.turn)
    }


}

function isDiagCaptured(row,col){
    let diag1=[gameTable.children[0].children[0].children[0],
            gameTable.children[0].children[1].children[1],
            gameTable.children[0].children[2].children[2]
    ]
    let diag2=[gameTable.children[0].children[2].children[0],
            gameTable.children[0].children[1].children[1],
            gameTable.children[0].children[0].children[2]
    ]
    let winningCombo=game.turn+game.turn+game.turn;
    
    if(row==2 && col==2){
        console.log("here1",winningCombo)
        if(diag1.map(x => x.textContent).join('')=== winningCombo){
            endGame(game.turn)
            }
        if(diag2.map(x => x.textContent).join('')=== winningCombo){
            endGame(game.turn)
            }
     
    }
    else if(row==1){
        if(col==1){
            if(diag1.map(x => x.textContent).join('')=== winningCombo){
                endGame(game.turn)
                    }
        }
        else {
            if(diag2.map(x => x.textContent).join('')=== winningCombo){
                endGame(game.turn)
                    }
        }
    }
    else if(row==3) {
        if(col==3){
            if(diag1.map(x => x.textContent).join('')=== winningCombo){
                endGame(game.turn)
                    }
        }
        else{
            if(diag2.map(x => x.textContent).join('')=== winningCombo){
                endGame(game.turn)
                    }
        }

    }
}
function boxClick(row,col){
    if(game.state==GAME_STATE_ENDED){
        alert("Game is over!! Click RESTART to play again")
        return;
    }
    console.log("box clicked : "+row + " "+ col)
    let clickedBox=gameTable.children[0].children[row-1].children[col-1];
    if(clickedBox.textContent==""){
        clickedBox.textContent=game.turn;
        setTimeout( isRowCaptured(row),2)
       
        isColCaptured(col);
        isDiagCaptured(row,col);
        nextTurn();
    }
    
   
   
}