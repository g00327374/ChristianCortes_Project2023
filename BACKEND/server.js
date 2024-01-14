// server.js
const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@g00327374.onfefpl.mongodb.net/?retryWrites=true&w=majority');
}

const gameSchema = new mongoose.Schema({
    title: String,
    cover: String,
    developer: String,
    votes: { type: Number, default: 0 } // field for votes
});

const gameModel = mongoose.model('games', gameSchema);

app.delete('/api/game/:id', async (req, res) => {
    console.log("Delete: " + req.params.id);
    let game = await gameModel.findByIdAndDelete(req.params.id);
    res.send(game);
});

app.post('/api/game/vote/:id', async (req, res) => {
    const game = await gameModel.findById(req.params.id);

    if (!game) {
        return res.status(404).send("Game not found");
    }

    game.votes += 1;
    await game.save();

    res.send(game);
});

app.get('/api/games/top5', async (req, res) => {
    const topGames = await gameModel.find({}).sort({ votes: -1 }).limit(5);
    res.json(topGames);
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

app.put('/api/game/:id', async (req, res) => {
    console.log("Edit: " + req.params.id);
    let game = await gameModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(game);
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
