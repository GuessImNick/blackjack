import React from 'react';
import { GameStart } from './components/gameStart/GameStart';


export const GameHome = ({ start }) => {
  return(  
      <div>
          <GameStart start={start} />
      </div>
  );
};
