// GameItem.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

function GameItem(props) {
    // This line initializes a state variable voted using the useState hook, it is set to false initially
    // The setVoted function is the updater function for the voted state variable
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
        // This checks if the user has not already voted (when voted is false)
        // If the user hasn't voted, it proceeds with the voting logic
        if (!voted) {
            // :id is replaced with the ID of the specific game (props.myGame._id)
            axios.post(`http://localhost:4000/api/game/vote/${props.myGame._id}`) // This line makes a POST request to the server endpoint
                // If the POST request is successful, the code inside the then block is executed
                .then(() => {
                    // updates the state, indicating that the user has voted
                    setVoted(true);
                    // calls a function (reload) passed as a prop to the component, triggers a reload or update of the game list
                    props.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // My card containers and including what to be displayed in Library Page on the webpage
    return (
        <div className="game-item-card" style={{ width: '250px', margin: '40px' }}>
            <Card>
                <Card.Header><p>NAME: {props.myGame.title}</p></Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myGame.cover} alt={props.myGame.title} style={{ width: '100%' }} />
                        <footer>
                            <p>Developer: {props.myGame.developer}</p>
                            <p>Price: ${props.myGame.price}</p>
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to={'/edit/' + props.myGame._id} className="btn btn-primary">Edit</Link>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        axios.delete('http://localhost:4000/api/game/' + props.myGame._id)
                            .then(() => {
                                props.reload();
                            })
                            .catch();
                    }}
                    variant='danger'>
                    Delete
                </Button>
                <Button variant="info" onClick={handleVote} disabled={voted}>
                    {voted ? 'Voted!' : 'Vote As Top 5 Games'}
                </Button>

            </Card>
        </div>
    );
}

export default GameItem;
