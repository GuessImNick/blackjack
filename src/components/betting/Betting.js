import React, { useState } from "react";
import "./Betting.css";

export const Betting = ({ start, chips, bet }) => {
  const [currentBet, setCurrentBet] = useState(2);

  const buttonClick = () => {
    if (currentBet < 2) {
      window.alert("Please Place A Bet Of 2 Or More");
    } else if (currentBet > 500) {
      window.alert("Max Bet Is 500 Chips");
    } else if (currentBet > chips) {
      window.alert("Not Enough Chips");
    } else if (isNaN(currentBet)) {
      window.alert("Please Enter A Number");
    } else {
      start();
      bet(parseInt(currentBet));
    }
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      buttonClick();
      console.log('click')
    }
  };

  return (
    <div className="betting-container">
      <button className="game-start-button" onClick={buttonClick}>
        Click To Start
      </button>
      <fieldset className="bet-field">
        <label className="chip-label" htmlFor="chips">
          Current Chips
        </label>
        <input readOnly name="chips" id="chips" placeholder={chips}></input>
        <lable htmlFor="bet" className="bet-label">
          Bet Amount
        </lable>
        <input
          type="number"
          name="bet"
          id="bet"
          min="2"
          max="500"
          value={currentBet}
          onKeyPress={onEnter}
          onInput={(e) => setCurrentBet(parseInt(e.target.value))}
        />
      </fieldset>
    </div>
  );
};
