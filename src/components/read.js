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
    // when invoked, sends an HTTP GET request to 'http://localhost:4000/api/books' using the Axios library
    const ReloadData = (e) => {
        // uses Axios to make an HTTP GET request to the specified URL ('http://localhost:4000/api/books')
        // to return a list of books
        axios.get('http://localhost:4000/api/books')
            // extracts the data from it using response.data, and then calls a function named setData with the retrieved data
            .then(
                (response) => {
                    setData(response.data)
                }
            )
            // if there's an error during the GET request, the .catch block is executed
            // it logs the error to the console using console.log.
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }
    // Display Heading of Read Component Page
    // React component called Books
    return (
        // holds an array of book objects
        // Reload={ReloadData}: passes the ReloadData function as a prop named Reload
        // allows the Books component to trigger a reload of data 
        <div>
            <h2>Welcome To The Games Library</h2>
            <Books myBooks={data} Reload={ReloadData}></Books>
        </div>
    );

}

export default Read;