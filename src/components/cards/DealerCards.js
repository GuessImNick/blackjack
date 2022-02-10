import React from "react";
import './DealerCards.css';

const DealerCards = ({ dealerCards, dealerTurn }) => {
  let cardCount = 1;
  return (
    <div className="dealer-card-container">
      {dealerCards.map((card) => {
        return (
          <div
            key={`${card.value}--${card.suit}--${cardCount}`}
            className={`dealerCard-${cardCount++} dealer-cards cards`}
          >
            <img src={cardCount === 3 && dealerTurn === false ? "http://deckofcardsapi.com/static/img/back.png" : card.image} className="card-img" />
          </div>
        );
      })}
    </div>
  );
};

export default DealerCards;
