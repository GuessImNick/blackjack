export const getCardPoints = (cardsArr) => {
  let points = 0;
  const cardList = [];
  for (const cards of cardsArr) {
    if (cards.value === "ACE") {
      cardList.push(cards);
    } else {
      cardList.unshift(cards);
    }
  }

  for (const card of cardList) {
    if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK" ||
      card.value === "10"
    ) {
      points += 10;
    } else if (
      card.value === "2" ||
      card.value === "3" ||
      card.value === "4" ||
      card.value === "5" ||
      card.value === "6" ||
      card.value === "7" ||
      card.value === "8" ||
      card.value === "9"
    ) {
      points += parseInt(card.value);
    } else if (card.value === "ACE" && points + 11 > 21) {
      points += 1;
    } else {
      points += 11;
    }
  }
  return points;
};
