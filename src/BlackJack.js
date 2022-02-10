import React, { useEffect, useState, useRef } from "react";
import { PlayerCards } from "./components/cards/PlayerCards";
import { API_CALLS } from "./API.js";
import { getCardPoints } from "./helpers/GetCardPoints";
import DealerCards from "./components/cards/DealerCards";
import { Status } from "./components/status/Status";
import { Betting } from "./components/betting/Betting";

export const BlackJack = () => {
  // All of the state for the whole application
  const [playerCards, setPlayerCards] = useState([]);
  const [playerCardPoints, setPlayerCardPoints] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerCardPoints, setDealerCardPoints] = useState(0);
  const [bet, setBet] = useState(0);
  const [payout, setPayout] = useState(0);
  const [chips, setChips] = useState(parseInt(localStorage.getItem("blackjack_chips")));
  const [status, setStatus] = useState("Welcome To BlackJack");
  const [bust, setBust] = useState(false);
  const [blackjack, setBlackJack] = useState(false);
  const [dealerBlackjack, setDealerBlackjack] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [dealerBust, setDealerBust] = useState(false);
  const [startResults, setStartResults] = useState(false);

  //Function that Adds cards to the players hand
  //player must have less than 7 cards and less then 21 points to draw
  const getPlayerCards = async () => {
    if (playerCardPoints < 21 && playerCards.length < 7) {
      const res = await API_CALLS.drawCards(1);
      const res_1 = await res.json();
      setPlayerCards((playerCards) => [...playerCards, res_1.cards[0]]);
    }
  };

  //function that adds cards to the dealers hand
  //must have less than 7 cards to draw
  const getDealerCards = async () => {
    if (dealerCards.length < 7) {
      const res = await API_CALLS.drawCards(1);
      const res_1 = await res.json();
      setDealerCards((dealerCards) => [...dealerCards, res_1.cards[0]]);
    }
  };

  //Function below change the boolean value associated with them
  const dealersTurn = () => {
    setDealerTurn(!dealerTurn);
  };

  const busted = () => {
    setBust(!bust);
  };

  const dealBust = () => {
    setDealerBust(!dealerBust);
  };

  const startGame = () => {
    setGameStart(!gameStart);
  };

  const playerBlackJack = () => {
    setBlackJack(!blackjack);
  };

  const dealerBj = () => {
    setDealerBlackjack(!dealerBlackjack);
  }

  const startBet = (value) => {
    setBet(parseInt(value));
    setChips(parseInt(chips - value))
  }

  //When start is invoked it shuffles the deck and draws cards
  //for the dealer and player, also setting (gameStart) to true
  const start = () => {
    API_CALLS.shuffleCards();
    getPlayerCards();
    getDealerCards();
    getPlayerCards();
    getDealerCards();
    startGame();
  };

  //When restart game is invoked it sets all states to their original values
  const restartGame = () => {
    setGameStart(false);
    setBust(false);
    setBlackJack(false);
    setDealerTurn(false);
    setStartResults(false);
    setDealerBust(false);
    setDealerBlackjack(false);
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerCardPoints(0);
    setDealerCardPoints(0);
    setStatus('Welcome To Blackjack');
    setPayout(0);
    setBet(0);
    setChips(parseInt(localStorage.getItem("blackjack_chips")));
  };

  //Payout and Chips function
  const betPay = (payRate) => {
    setPayout(parseInt((bet*payRate)))
  }

  const setPay = (payRate) => {
    let payo = bet*payRate
    if(startResults === true){
      const pay = parseInt(chips + payo)
      localStorage.setItem('blackjack_chips', pay)
    }
  }
  //All game logic is handled in the useEffects below

  //This use effect manages hte players points and sets different checks
  //depending on the value
  useEffect(() => {
    setPlayerCardPoints(getCardPoints(playerCards));
    if (getCardPoints(playerCards) === 21) {
      playerBlackJack();
      setDealerTurn(true);
    } else if (getCardPoints(playerCards) > 21) {
      busted();
      setDealerTurn(true);
    }
  }, [playerCards]);

  //This useEffect manages dealer points and sets state depending on the outcome
  useEffect(() => {
    setDealerCardPoints(getCardPoints(dealerCards));
    if (
      getCardPoints(dealerCards) === 21 &&
      getCardPoints(playerCards) === 21
    ) {
      dealerBj();
      setDealerTurn(true);
      setStartResults(true);
    } else if (
      getCardPoints(dealerCards) === 21 &&
      getCardPoints(playerCards) !== 21
    ) {
      dealerBj();
      setDealerTurn(true);
      setStartResults(true);
    }
  }, [dealerCards]);


  //This useEffect manages the dealers actions based off of their points
  useEffect(() => {
    if(bust !== true){
    if (dealerTurn === true && dealerCardPoints <= 16) {
      getDealerCards();
    } else if (dealerTurn === true && dealerCardPoints >= 17) {
      if (dealerCardPoints > 21) {
        dealBust();
        setStartResults(true);
      } else {
        setStartResults(true);
      }
    }} else {
      setStartResults(true);
    }
    setDealerCardPoints(getCardPoints(dealerCards));
  }, [dealerTurn, dealerCardPoints]);

  //This use effect determines the winner and the payout
  useEffect(() => {
    if (startResults === true) {
      const playerPoints = playerCardPoints;
      const dealerPoints = dealerCardPoints;
      if (bust === true) {
        setPay(0);
        setStatus("You've Busted");
      } else if (dealerBust === true) {
        setPay(2);
        setStatus("The Dealer busted");
      } else if (blackjack === true && dealerBlackjack === true) {
        setPay(1);
        setStatus("Blackjack Tie! Take Your Chips");
      } else if (blackjack === true && dealerBlackjack === false) {
        setPay(2);
        setStatus('Player Blackjack! You Win!')
      } else if(blackjack === false && dealerBlackjack === true) {
        setPay(0);
        setStatus('Dealer Blackjack! You Lose Your Bet')
      } else if (dealerPoints === playerPoints) {
        setPay(0);
        setStatus("You Tied With The Dealer! You Lose!");
      } else if (dealerPoints > playerPoints && dealerBust === false) {
        setPay(0);
        setStatus("The Dealer Has More Points! You Lose!");
      } else if (playerPoints > dealerPoints) {
        setPay(2);
        setStatus("You Have More Points! You Win!");
      }
    }
  }, [startResults]);

  return gameStart === false ? (
    <div>
      <Status status={status} />
      <Betting start={start} chips={chips} bet={startBet} />
    </div>
  ) : (
    <div>
      <Status status={status} />
      <div className="main-content">
        <DealerCards dealerCards={dealerCards} dealerTurn={dealerTurn} />
        <PlayerCards
          dealersTurn={dealersTurn}
          draw={getPlayerCards}
          playerCards={playerCards}
          results={startResults}
          restart={restartGame}
        />
      </div>
    </div>
  );
};
