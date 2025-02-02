import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cardData, setCardData] = useState([]);

  const addCard = (newCard) => {
    setCardData([...cardData, newCard]);
  };

  const removeCard = (index) => {
    setCardData(cardData.filter((_, i) => i !== index));
  };

  return (
    <CardContext.Provider value={{ cardData, addCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => {
  return useContext(CardContext);
};
