// GameItem.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

function GameItem(props) {
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
        if (!voted) {
            axios.post(`http://localhost:4000/api/game/vote/${props.myGame._id}`)
                .then(() => {
                    setVoted(true);
                    props.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="game-item-card" style={{ width: '250px', margin: '40px' }}>
            <Card>
                <Card.Header>{props.myGame.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myGame.cover} alt={props.myGame.title} style={{ width: '100%' }} />
                        <footer>
                            {props.myGame.developer}
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
