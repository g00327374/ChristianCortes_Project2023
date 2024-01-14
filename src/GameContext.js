// GameContext.js
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [top5Games, setTop5Games] = useState([]);

  const addTop5Game = (game) => {
    setTop5Games((prevTop5Games) => [...prevTop5Games, game]);
  };

  return (
    <GameContext.Provider value={{ top5Games, addTop5Game }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};