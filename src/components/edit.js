import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Edit(props) {
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.
    let { id } = useParams();
    // update arrays using the React useState()
    // and without the Array objects push() method
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");
    // useNavigate return a function that we can use to navigate
    const navigate = useNavigate();
    //useEffect Hook is similar componentDidMount
    useEffect(() => {
        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the
        //url.
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign Response data to the arrays using useState.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    // handleSubmit handles form submissions
    const handleSubmit = (event) => {
        // prevents the default behavior of the form submission
        // in a web form, when a user submits the form, the page typically gets refreshed
        // preventDefault() method ensures that the page doesn't refresh
        // allows you to handle the form submission using custom logic
        event.preventDefault();
        // create a javascript object called newBook
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };
        // sends a PUT request to the specified URL with ID URL path
        // newBook object is sent as the data payload in the request
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            // (res) is a promise chain. 
            // specifies that once the PUT request is successfully completed
            // the function inside the then block will be executed
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            });
    }
    // returns a form for submission when 
    // navigate function redirects the user to the '/read' route after the 
    // PUT request is successful
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Add Release Year: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Add Poster Url: </label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
