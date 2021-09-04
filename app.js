'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const Dig = require('./lib/Dig');


app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, '/public'), {
    maxAge: 0,
    dotfiles: 'ignore',
    etag: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname) + '/views/index.html');
});

app.post('/api/lookup', async (req, res) => {
    const { domain, type } = req.body;
    const dig = new Dig(domain, type);
    try {
        const lookup = await dig.lookup();
        res.send(lookup);
    } catch(err) {
        res.send(err);
    }
});


if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
});

app.listen(port);