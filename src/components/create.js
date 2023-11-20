import { useState } from "react";
import axios from "axios";

function Create() {

    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [author, setAuthor] = useState('');

    // e.preventDefault();: This line prevents the default behavior of the event. In the context of a form submission, this prevents the default form submission behavior
    // when a form is submitted, the browser typically reloads the page or performs a full-page refresh
    // by calling e.preventDefault(), you're stopping this default behavior, allowing you to handle the form submission manually using custom logic
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Title: " + title +
            " Cover: " + cover +
            " Author: " + author);
        const book = {
            title: title,
            cover: cover,
            author: author
        };

        // this request uses an object after the request URL to define
        // the properties you want to create for your user
        axios.post('http://localhost:4000/api/book', book)
            .then()
            .catch();
    }

    return (
        <div>
            <h2>Hello from create Component!</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Book Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Book Author: </label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit"
                        value="Add Book">
                    </input>
                </div>
            </form>
        </div>
    );

}
export default Create;