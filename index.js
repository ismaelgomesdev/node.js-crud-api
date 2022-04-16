const express = require('express');

const server = express();

server.use(express.json());

const geeks = [];

function checkGeekExists(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({error: 'geek name is required'});
    }
    return next();
}

function checkGeekInArray(req, res, next) {
    const geek = geeks[req.params.index];

    if(!geek) {
        return res.status(400).json({error: 'geek does not exists'});
    }

    req.geek = geek;

    return next();
}

server.get('/geeks', (req, res) => {
    return res.json(geeks)
});

server.get('/geeks/:index', checkGeekInArray, (req, res) => {
    return res.json(req.user);
})


server.post('/geeks', checkGeekExists, (req, res) => {
    const { name } = req.body;
    geeks.push(name);
    return res.json(geeks);
})

server.put('/geeks/:index', checkGeekInArray, checkGeekExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    geeks[index] = name;
    return res.json(geeks);
});

server.delete('/geeks/:index', (req, res) => {
    const { index } = req.params;
    geeks.splice(index, 1);

    return res.send();
})

server.listen(3000);