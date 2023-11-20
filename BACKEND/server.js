// don't need semicolons at the end of each line unless
// I want to seperate multiple statements on a single line
// where as each of these lines is a complete statement
const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const cors = require('cors');
// incoming HTTP requests and extracts data from it
// it is essential when handling data submitted through 
// forms or when receiving data from API requests
const bodyParser = require('body-parser');

// this code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application
// CORS is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page
// tt is enforced by the browser, and without proper configuration, requests from a different origin may be blocked
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// confugires the body-parser to handle URL form data from
// incoming HTTP requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// getting-started.js
// connect to the mongo db
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// the async funtion is used to define an asynchronous function 
// this means that the function will always return a Promise
async function main() {
    // replace url with the link from mongodb.com database
    await mongoose.connect('mongodb+srv://admin:admin@g00327374.onfefpl.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// create my schema called bookSchema
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
})

// create a Mongoose model for a MongoDB collection named "books" using a specified schema called bookSchema
// mongoose.model('books', bookSchema) creates a Mongoose model named bookModel for the "books" collection based on the provided schema (bookSchema). 
// this model can be used to interact with the MongoDB collection "books" using the defined schema.
// it allows you to perform CRUD (Create, Read, Update, Delete) operations on the documents in the "books" collection through the Mongoose API
const bookModel = mongoose.model('books', bookSchema);

// post method to parase the body of this post request
// listening at port 4000 and sends back a book message
app.post('/api/book', (req, res) => {
    console.log(req.body);

    // create a document for bookModel
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
        .then(
            () => {
                res.send("Data Received!")
            }
        )
        .catch(
            () => {
                res.send("Data NOT received!")
            }
        )
})

// uses 'app' object which represents an instance of an
// application to define a route for handling HTTP GET requests
app.get('/name', (req, res) => {
    // req.query.fname is used to access the value of a query
    // parameter named fname from incoming HTTP request
    // query parameters are part of the URL and are used to 
    // pass data to the server from the client
    console.log(req.query.fname);
    // res.send() is a method to send a response to an HTTP client
    res.send('Hello ' + req.query.fname + " " + req.query.lname);
})

// sends a post request to the path /name route
app.post('/name', (req, res) => {
    res.send('Hello ' + req.body.fname + " " + req.body.lname);
})

app.get('/', (req, res) => {
    // method to listen to the url
    // execute request and response
    // print out hello world in port:3000
    res.send('Welcome to Data Representationn & Querying')
})

// example of app.get
app.get('/whatever', (req, res) => {
    res.send("Goodbye");
})

app.get('/hello/:name', (req, res) => {
    console.log(req.params.name)
    res.send("Hello " + req.params.name);
})

// connect to mongodb
app.get('/api/books', async (req, res) => {
    let books = await bookModel.find({});
    console.log(books);
    res.json(books);
})

app.get('/api/book/:id', async (req, res) => {
    console.log(req.params.id);
    let book = await bookModel.findById({ _id: req.params.id })
    res.send(book);
})

// listen to http request from client
app.put('/api/book/:id', async (req, res) => {
    console.log("Edit: " + req.params.id);
    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// listen to a particular http request at a particular port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
