const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const moviesRouter = require('./routes/movies.js');
const serverError = require('./middleware/serverError');
const notFound = require('./middleware/notFound');

//MIDDLEWARES
//middleware cors, serve perché porcoddio
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173'
    }
));

//body parser (serve a parsare i dati che arrivano dal client cioè che porcoddio significa diocane)
app.use(express.json());

//static assets (serve a rendere disponibili i file statici, come le immagini)
app.use(express.static('public'));

//listen (serve a mettere il server in ascolto sulla porta 3000)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

//routes
app.get('/', (req, res) => {
    res.send('Movies API server running');
})

app.use('/movies', moviesRouter);

//middleware for server errors
app.use(serverError)

//middleware for 404 errors
app.use(notFound)

