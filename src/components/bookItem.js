import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// this changes the url of my app
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookItem(props) {

    return (
        // renders the title of the book within a Card.Header component 
        // uses the props.myBook.title to access the title of the book passed as a prop to this component
        // <img src={props.myBook.cover}></img>: renders an image tag with the source (src) attribute set to props.myBook.cover
        // cover is a property of the myBook object containing the URL of the book cover image
        // create a link to the '/edit/:id' route, where :id is replaced with the _id of the current book
        <div>
            <Card>
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myBook.cover}></img>
                        <footer>
                            {props.myBook.author}
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to={'/edit/' + props.myBook._id} className="btn btn-primary">Edit</Link>
                <Button onClick={(e) => {
                    // this prevents the form from being submitted
                    e.preventDefault();
                    // uses the Axios library to send an HTTP DELETE request to the specified URL ('http://localhost:4000/api/book/' + props.myBook._id)
                    axios.delete('http://localhost:4000/api/book/' + props.myBook._id)
                        // If the DELETE request is successful, the .then block is executed
                        .then(()=>{
                            props.reload();
                        })
                        .catch();
                }} variant='danger'>Delete</Button>
            </Card>
            {/* <h3>{props.myBook.title}</h3>
            <img src={props.myBook.thumbnailUrl}></img>
            <p>{props.myBook.authors[0]}</p> */}
        </div>
    );
}

export default BookItem;