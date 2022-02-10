const deck_id = "23e28hmqkev7";

export const API_CALLS = {
  drawCards: async (numOfCards) => {
    return fetch(
      `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numOfCards}`
    );
  },

  shuffleCards: () => {
    fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
  },
};
