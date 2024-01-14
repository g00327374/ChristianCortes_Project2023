// read.js
import { useEffect, useState } from "react";
import axios from "axios";
import Games from "./games";

// This component will be the web page that contains all information about each games
// created and stored from MongoDB
function Read() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/games')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const reloadData = () => {
        axios.get('http://localhost:4000/api/games')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Title
    return (
        <div>
            <br></br>
            <h2>Welcome To The Games Library and Poll</h2>
            <br></br>
            <Games myGames={data} Reload={reloadData}></Games>
            
        </div>
    );
}

export default Read;