import { useState } from "react";
import axios from "axios";

function Create() {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [developer, setDeveloper] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const game = {
            title: title,
            cover: cover,
            developer: developer
        };

        axios.post('http://localhost:4000/api/game', game)
            .then(() => {
                setMessage('Game added successfully!');
                // Clear input fields after successful submission
                setTitle('');
                setCover('');
                setDeveloper('');
            })
            .catch((error) => {
                console.log(error);
                setMessage('Error adding game.');
            });
    }

    return (
        <div>
            <br></br>
            <h2>This is the Games Creation Component</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Game Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
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
                <div>
                    <input type="submit" value="Add Game" />
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Create;
