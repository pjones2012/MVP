import React, { useState }from 'react';
import Board from './Components/board.jsx';

const App = (props) => {
  const [currentTurn, setTurm] = useState('r');
  return (
    <div> Welcome to Checkers! <br/>
      <Board player={currentTurn}/>
    </div>
  );
}

export default App;