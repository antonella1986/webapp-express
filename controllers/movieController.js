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
        if(results.lenght === 0) return res.status(404).json({ message: 'Movie not found' });

        const movie = results[0]
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err.message });
            movie.reviews = reviews;
            console.log(movie.reviews);
        })

        res.json(movie);
    })
}

module.exports = { index, show }