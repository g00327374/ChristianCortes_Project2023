import React, { useEffect, useState } from "react";
import axios from "axios";

function Content() {
    const [topGames, setTopGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/games/top5')
            .then((response) => {
                setTopGames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="row-container">
                <h1>Hello World!</h1>
            </div>
            <div className="row-container">
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
            <div className="row-container">
                <h3>Top 5 Voted Games:</h3>
                <div className="game-item-container">
                    {topGames.map((game) => (
                        <div key={game._id} className="game-details">
                            <h4>{game.title}</h4>
                            <img src={game.cover} alt={game.title} />
                            <p>Developer: {game.developer}</p>
                            <p>Votes: {game.votes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Content;
