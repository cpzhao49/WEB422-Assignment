/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Chongpu Zhao Student ID: 105157875 Date: 9/14/2022
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/

const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
require('dotenv').config();
//Middle:
app.use(cors());
app.use(express.json())

//Routes:
//This route uses the body of the request to add a new "Movie" document to the collection and return the newly created movie object / fail message to the client.
app.post('/api/movies', (req, res) => {
    db.addNewMovie(req.body).then(() => {
        res.status(201).send("New movie created");
    }).catch((err) => {
        res.status(204).send(err);
    })
})
//This route must accept the numeric query parameters "page" and "perPage" as well as the (optional) string parameter "title", ie: /api/movies?page=1&perPage=5&title=The Avengers.  It will use these values to return all "Movie" objects for a specific "page" to the client as well as optionally filtering by "title", if provided (in this case, it will show both “The Avengers” films).
app.get('/api/movies/', (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, PaymentRequest.query.title).then((movies) => {
        res.status(200).json(movies);
    }).catch((err) => {
        res.status(204).send(err);
    })
});

app.get('/api/movies/:id', (req, res) => {
    db.getMovieById(req.params.id).then((movie) => {
        res.status(200).json(movie);
    }).catch((err) => {
        res.status(204).send(err);
    })
});

app.put('/api/movie/:id', (req, res) => {
    db.updateMovieById(req.body, req.params.id).then(() => {
        res.status(200).send('Movie update successed');
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.delete('/api/movies/:id', (req, res) => {
    db.deleteMovieById(req.params.id).then(() => {
        res.status(200).send("Movie deleted :" + req.params.id);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.get('/', (res, req) => {
    res.json({ message: "API Listening" });
});
//init
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});


