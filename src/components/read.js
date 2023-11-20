import { useEffect, useState } from "react";
import axios from "axios";
import Books from "./books";

function Read() {
    // const [data, setData] = useState([]);: This line initializes a state variable data using the useState hook. The initial value of data is an empty array ([])
    // the setData function is a function provided by the useState hook to update the value of the data state
    const [data, setData] = useState([]);

    useEffect(
        () => {
            // this uses the Axios library to make an HTTP GET request to the specified URL
            // axios is a popular JavaScript library for making HTTP requests.
            axios.get('http://localhost:4000/api/books')
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )

        }, []
    );
 
    return (
        <div>
            <h2>Hello from Read Component!</h2>
            <Books myBooks={data}></Books>
        </div>
    );

}

export default Read;