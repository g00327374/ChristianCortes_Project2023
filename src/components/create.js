// create.js
// This line imports the useState hook from the React library
// The useState hook is a React hook that allows functional components to manage state
import { useState } from "react";
import axios from "axios";

function Create() {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [developer, setDeveloper] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const game = {
            title: title,
            cover: cover,
            developer: developer,
            price: price
        };

        console.log('Game Data:', game);

        // This code snippet uses the Axios library to make a POST request to the specified URL 
        axios.post('http://localhost:4000/api/game', game)
            .then((response) => {
                console.log('Response:', response.data);
                setMessage('Game added successfully!');
                // Clear input fields after successful submission
                setTitle('');
                setCover('');
                setDeveloper('');
                setPrice('');
            })
            .catch((error) => {
                console.log('Error:', error);
                setMessage('Error adding game.');
            });
    }

    return (
        <div>
            <br></br>
            <h2>This is the Games Data Creation Page</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Game Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        // This is a React event handler that is triggered when the value of an input element changes
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Game Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Game Developer: </label>
                    <input type="text"
                        className="form-control"
                        value={developer}
                        onChange={(e) => { setDeveloper(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Game Price: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Game" />
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Create;
