// Games.js
import React from "react";
import GameItem from "./gameItem";

function Games(props) {
  return (
    <div className="game-item-container">
      {props.myGames.map((game) => (
        <GameItem key={game._id} myGame={game} reload={props.Reload} />
      ))}
    </div>
  );
}

export default Games;