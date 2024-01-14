// Games.js
import React from "react";
import GameItem from "./gameItem";

function Games(props) {
  // Uses the map function on props.myGames. props.myGames is expected to be an array containing game objects
  // The entire game object is passed as the myGame prop to the GameItem component.
  return (
    <div className="game-item-container">
      {props.myGames.map((game) => (
        <GameItem key={game._id} myGame={game} reload={props.Reload} />
      ))}
    </div>
  );
}

export default Games;
