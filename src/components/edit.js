// edit.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// The useNavigate hook is part of the react-router-dom library and is used for programmatic navigation in React applications
// It provides a navigate function that to navigate to a different route
import { useNavigate } from 'react-router-dom';

// This is my edits page when user clicks the edit button they will be transferred to this page
// the function calls the object's id which allows them to spefically edit that game
export default function Edit(props) {
    let { id } = useParams();
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [developer, setDeveloper] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // making a GET request to a specific API endpoint using the Axios library in a React or JavaScript application
        axios.get('http://localhost:4000/api/game/' + id)
            .then((response) => {
                setTitle(response.data.title);
                setCover(response.data.cover);
                setDeveloper(response.data.developer);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newGame = {
            id: id,
            title: title,
            cover: cover,
            developer: developer
        };

        axios.put('http://localhost:4000/api/game/' + id, newGame)
            .then((res) => {
                console.log(res.data);
                // call navigate('/games'), it instructs the router to navigate to the /games route, to render corrensponding component
                navigate('/games');
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Game Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Game Cover: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Game Developer: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Game" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
