const connection = require('../data/db.js');

function index(req, res) {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'No movies found' });
        console.log(results);
        res.json(results);
    })
}

function show(req, res) {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if(results.length === 0) return res.status(404).json({ message: 'Movie not found' });

        const movie = results[0]
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err.message });
            movie.reviews = reviews;
            console.log(movie.reviews);
            res.json(movie);
        })

    })
}

function post(req, res) {
    const movieId = req.params.id;
    const { username, title, review, vote } = req.body;

    if (!username || !title || !review || !vote) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newReview = {
        //genero un id univoco
        id: Date.now(),
        movieId, //associo la recensione al film
        username,
        title,
        review,
        vote,
    };

    //salvo la recensione nel db
    reviews.push(newReview);
    res.status(201).json(newReview);
};

module.exports = { index, show, post }