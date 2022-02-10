import React from 'react';
import './PlayerCards.css'

export const PlayerCards = ({ draw, dealersTurn, playerCards, results, restart}) => {
  let cardCount = 1
  return(
      <div className='player-card-container'>
        {
          playerCards.map((card) => {
            return <div key={`${card.value}--${card.suit}--${cardCount}`} className={`card-${cardCount++} player-cards cards`} >
            <img  src={card.image} className='card-img' />
            </div>
          })
        }
        {results === false ? 
        <div className='btn-container'>
        <button onClick={draw} className='btn' >Hit Me!</button>
        <button className='btn' onClick={dealersTurn} >Stand</button>
        </div> 
        :
        <div className='btn-container'>
        <button onClick={restart} className='btn' >Play Again!</button>
        </div>
        } 
      </div>
  );
};
