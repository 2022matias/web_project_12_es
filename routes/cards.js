const routerCards = require('express').Router();
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../data/cards.json');

routerCards.get('/', (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = routerCards;
