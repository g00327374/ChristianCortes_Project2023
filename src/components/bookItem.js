import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// this changes the url of my app
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookItem(props) {

    return (
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