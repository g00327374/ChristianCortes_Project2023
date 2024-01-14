// server.js
const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Sets up Cross-Origin Resource Sharing (CORS) middleware in an Express.js application
// CORS is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page
// Prevent potential security vulnerabilities, such as Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS)
app.use(cors());
app.use(function (req, res, next) { // sets specific CORS headers for every incoming HTTP request
    res.header("Access-Control-Allow-Origin", "*"); // allows any domain to make requests to my server, the "*" wildcard means any origin is permitted
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // allows these HTTP methods when making requests to the server
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"); // lists the allowed HTTP headers that can be used when making requests
    next(); // allows the request to continue processing
});

// Used to parse the body of incoming HTTP requests, making the data available in the req.body object
// configures the middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //  parse JSON-encoded data

// Imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// Mongoose provides a higher-level abstraction for working with MongoDB, allowing the use of schemas, models, and other features
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// Initiate the connection to the MongoDB database using the mongoose.connect() method
// the main function is declared as an asynchronous function to allow the use of await inside it
// the await keyword is used to wait for the completion of the mongoose.connect() method before proceeding
async function main() {
    // contains the username, password, cluster address, and other parameters required to establish a connection to the MongoDB database
    await mongoose.connect('mongodb+srv://admin:admin@g00327374.onfefpl.mongodb.net/?retryWrites=true&w=majority');
}

// Defines a Mongoose schema for a "game" document in a MongoDB database
const gameSchema = new mongoose.Schema({ // creates a new instance of the Mongoose Schema class, representing the schema for the "game" documents
    title: String,
    cover: String,
    developer: String,
    price: Number,
    votes: { type: Number, default: 0 } // field for votes
});

// Used to compile a Mongoose schema into a model. A Mongoose model is a constructor function that has methods for querying and interacting with a MongoDB collection
// the first argument to mongoose.model is the name of the collection in the MongoDB database that this model is associated with specified as 'games'
const gameModel = mongoose.model('games', gameSchema);

app.delete('/api/game/:id', async (req, res) => {
    console.log("Delete: " + req.params.id);
    // uses Mongoose to find a game in the MongoDB database with the provided ID (req.params.id) and deletes it
    let game = await gameModel.findByIdAndDelete(req.params.id);
    res.send(game);
});

// post method to parse the body of this post request
app.post('/api/game', async (req, res) => {
    console.log('Received POST request to /api/game');
    console.log(req.body);

    gameModel.create({
        title: req.body.title,
        cover: req.body.cover,
        developer: req.body.developer,
        price: req.body.price 
    })
    .then(
        () => {
            console.log('Game Data Received!');
            res.send("Game Data Received!");
        }
    )
    .catch(
        (error) => {
            console.error(error);
            console.log('Error: Game Data NOT received!');
            res.send("Error: Game Data NOT received!");
        }
    );
});

// Defines a route in Express.js backend for handling the voting of games
app.post('/api/game/vote/:id', async (req, res) => {
    // uses Mongoose to find a game in the MongoDB database based on the provided id
    const game = await gameModel.findById(req.params.id);
    // error handling
    if (!game) {
        return res.status(404).send("Game not found");
    }
    // if the game is found it increments the votes property of the game by 1
    game.votes += 1;
    // method is called to persist the updated game in the database
    await game.save();

    res.send(game);
});

// Retrieve top 5 games
app.get('/api/games/top5', async (req, res) => { //  listens for requests to the /api/games/top5 endpoint
    // retrieves all documents in the collection
    // sorts the results in descending order based on the votes field
    // limits the number of results to 5
    const topGames = await gameModel.find({}).sort({ votes: -1 }).limit(5);
    // sends a JSON response containing an array of the top 5 voted games
    res.json(topGames);
});

// Retrieve top 5 cheapest games
app.get('/api/games/top5/cheapest', async (req, res) => {
    try {
        // Retrieves the top 5 cheapest games from the database
        const topCheapestGames = await gameModel.find({}).sort({ price: 1 }).limit(5);
        // Sends a JSON response containing an array of the top 5 cheapest games
        res.json(topCheapestGames);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/name', (req, res) => {
    console.log(req.query.fname);
    res.send('Hello ' + req.query.fname + " " + req.query.lname);
});

app.post('/name', (req, res) => {
    res.send('Hello ' + req.body.fname + " " + req.body.lname);
});

app.get('/', (req, res) => {
    res.send('Welcome to Game Representation & Querying');
});

app.get('/whatever', (req, res) => {
    res.send("Goodbye");
});

app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send("Hello " + req.params.name);
});

app.get('/api/games', async (req, res) => {
    let games = await gameModel.find({});
    console.log(games);
    res.json(games);
});

app.get('/api/game/:id', async (req, res) => {
    console.log(req.params.id);
    let game = await gameModel.findById({ _id: req.params.id });
    res.send(game);
});

// Defines a route in an Express.js application that handles the update (editing) of a game in a MongoDB database
// sets up a route that listens for HTTP PUT requests at the endpoint /api/game/:id
app.put('/api/game/:id', async (req, res) => { // an asynchronous arrow function that handles the incoming PUT request
    console.log("Edit: " + req.params.id);
    // method to find a game in the MongoDB database with the provided ID (req.params.id) and update its properties based on the data in req.body
    let game = await gameModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ensures that the method returns the modified document rather than the original one
    res.send(game);
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// This method is used to bind and listen for connections on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
