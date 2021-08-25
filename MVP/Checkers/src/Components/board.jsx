import React, { useState }  from 'react';
import Square from './square.jsx';


const Board = (props) => {
  const seedArray = new Array(8).fill(0);
  var availableMoves;
  const [turnStatus, setTurnStatus] = useState('whichPiece');
  const [currentPeice, setCurrentPeice] = useState(null);
  const [boardStatus, setBoardStatus] = useState([
    [null,'r',null,'r',null,'r',null,'r'],
    ['r',null,'r',null,'r',null,'r',null],
    [null,'r',null,'r',null,'r',null,'r'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['b',null,'b',null,'b',null,'b',null],
    [null,'b',null,'b',null,'b',null,'b'],
    ['b',null,'b',null,'b',null,'b',null]
  ]);

  var availableMoves = (thisRow, thisCol) => {
    //function that defines available moves
    availableMoves = [];
    //move 1 space moves
    var move1space = [[thisRow-1,thisCol-1],[thisRow-1,thisCol+1],[thisRow+1,thisCol-1],[thisRow+1,thisCol+1]];
    //console.log('move1array', move1space);
    for (var spot of move1space){
      //console.log('the spot is?!', spot);
      if (boardStatus[spot[0]][spot[1]] === null){
        //console.log('the spot is available!');
        availableMoves.push(spot);
      }
    }
    console.log('first iteration of available moves', availableMoves);
    //jump moves
    var moveJumpspace = move1space.filter((spot) => {
      var opponent = props.player === 'r'? 'b':'r';
      return boardStatus[spot[0]][spot[1]] === opponent;
    }).map((spot)=>{
      return [2*(thisRow - spot[0]) + thisRow, 2*(thisCol - spot[1]) + thisCol];
    })
    console.log('moveJump Space', moveJumpspace);
    for (var spot of moveJumpspace){
      if (boardStatus[spot[0]][spot[1]] === null){
        availableMoves.push(spot);
      }
    }

    console.log('these are availableMoves' , availableMoves);

    //is it a queen moves
  }

  var clickSquare = (row,col) => {
    if (turnStatus === 'whichPiece' && boardStatus[row][col] === props.player){
      console.log('I see you row ', row , 'and col ', col );
      availableMoves(row, col);
      setCurrentPeice( [row, col] );
      setTurnStatus( 'movePiece' );
    } else if (turnStatus === 'movePiece') {
      //move peice
      console.log('I see you row ', row , 'and col ', col );
      console.log('can i move? ', availableMoves.indexOf([row, col]))
      if ( availableMoves.indexOf([row, col]) > -1 ){
        var newBoard = boardStatus.slice();
        newBoard[thisRow,thisCol] === null;
        newBoard[spot[0]][spot[1]] === props.player;
        setBoardStatus(newBoard);
      }
    } else {
      console.log('do nothing!');
    }
  }
  var currentBoard = (board) => {
    return seedArray.map( (a, j) => {
      return  (
        <div key={`row${j}`}
             style={{position: 'relative',
                     display: 'inline-block',
                     margin: '0px 10vw 0px',
                     width: '80%'}}>
          {seedArray.map( (b, i) => {
            if ((j + i) % 2 === 1) {
              return <Square key={`${i}and${j}`}
                             row={j} col={i}
                             clickHandler={clickSquare}
                             turn={turnStatus}
                             color='black'
                             playerFill={boardStatus[j][i]?boardStatus[j][i]:null}/>;
            } else if ( (j + i) % 2 === 0) {
              return <Square key={`${i}and${j}`}
                             row={j} col={i}
                             clickHandler={clickSquare}
                             turn={turnStatus}
                             color='white'
                             playerFill={boardStatus[j][i]?boardStatus[j][i]:null}/>;
            }
          })}
        </div>
      );
    })
  };

  return (
    <div>
      {currentBoard(boardStatus)}
    </div>
  );
}

export default Board;