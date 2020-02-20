'use strict';

const express = require('express');

const app = express();

const morgan = require('morgan');

const { top50 }  = require('./data/top50');

const { books } = require('./data/books');

const PORT = process.env.PORT || 8000;

const title = "Top 50 Songs Streamed on Spotify";

// function findBook(id){
//     app.get(`/book#/${id}`, (req, res) =>{
//         res.render('pages/bookpage', {
//             title: "Book Page",
//             books: books,
//             id: id
//         });
//     });
// }

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/', (req, res) => {
    res.render('pages/top50', {
        title: "Top 50 Songs Streamed on Spotify",
        top50: top50
    });
});

// app.get(`/top50/popularartist`, (req, res) => {
//     res.render ('pages/popular-artists', {
//         title: "Most Popular Artist",
//         top50: top50
// });
// });

app.get('/top50/song/:number', (req, res) => {
    const number = req.params.number;
    const song = top50[number-1];

    if (number >= 1 && number <=50){
    res.render ('pages/song#', {
        number: number,
        title: `Song #${number}`,
        top50: top50,
        song: song
    })}
    
    else {
        res.render('pages/fourOhFour', {
            title: 'Not a Song',
            path: req.originalUrl
        });
    };
    });

app.get('/booklist', (req, res) =>{
    res.render('pages/booklist', {
        title: "Book List",
        books: books
    });
});

app.get('/book/:id', (req,res) =>{
    const id = req.params.id;
    const book = books[id-101];

    if (id>=101 && id <= 125){
        res.render('pages/bookpage', {
            title: `Book# ${id}`,
            id: id,
            book: book
        })
    }
    else {
        res.render('pages/fourOhFour', {
            title: 'Not a Book',
            path: req.originalUrl
        })
    }
});

app.get('/:type', (req, res) => {
    const type = req.params.type;
    // const currentType = books.find(book => book['type'] === type);
    res.render('pages/booktype', {
        title: `Book Type: ${type}`,
        books:books,
        type: type
    });

});

// handle 404s
app.get('*', (req, res) => {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
