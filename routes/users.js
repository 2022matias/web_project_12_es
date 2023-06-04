const routerUser = require('express').Router();
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../data/users.json');

const doesUserExist = (req, res, next) => {
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    const users = JSON.parse(data);
    const user = users.find((user) => user._id === req.params.id);

    if (!user) {
      res.status(404).send({ message: 'ID de usuario no encontrado' });
      return;
    }

    req.user = user;
    next();
  });
};

routerUser.get('/', (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

routerUser.get('/:id', doesUserExist, (req, res) => {
  res.send(req.user);
});

module.exports = routerUser;
