import React, { useEffect, useState } from "react";
import axios from "axios";

// Initialises a state variable topGames using the useState hook
// it's an empty array initially, where the fetched top games will be stored
function Content() {
    const [topGames, setTopGames] = useState([]);
    const [topCheapestGames, setTopCheapestGames] = useState([]);

    // This hook fetches data from the server
    // callback function inside useEffect contains the code to be executed
    useEffect(() => {
        // Axios GET request fetches data from the specified API endpoint 
        axios.get('http://localhost:4000/api/games/top5')
            .then((response) => {
                setTopGames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:4000/api/games/top5/cheapest')
            .then((response) => {
                setTopCheapestGames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Displays 3 containers, each showing different materials: Greeting, time, and the vote poll
    return (
        <div>
            <div className="row-container">
                <h1>Welcome to the Home Page</h1>
            </div><br></br>
            <div className="row-container">
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div><br></br>
            <div className="row-container">
                <h3>Top 5 Most Voted Games:</h3><br></br>
                <div className="game-item-container">
                    {topGames.map((game) => (
                        <div key={game._id} className="game-details">
                            <h4>{game.title}</h4>
                            <img src={game.cover} alt={game.title} />
                            <p>Developer: {game.developer}</p>
                            <p>Price: ${game.price}</p>
                            <p>Votes: {game.votes}</p>
                        </div>
                    ))}
                </div>
                <div className="row-container">
                    <h3>Top 5 Cheapest Games:</h3><br></br>
                    <div className="game-item-container">
                        {topCheapestGames.map((game) => (
                            <div key={game._id} className="game-details">
                                <h4>{game.title}</h4>
                                <img src={game.cover} alt={game.title} />
                                <p>Developer: {game.developer}</p>
                                <p>Price: ${game.price}</p>
                                <p>Votes: {game.votes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
