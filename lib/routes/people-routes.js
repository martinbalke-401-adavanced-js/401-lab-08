'use strict';

const express = require('express');
const router = express.Router(); // app

const People = require('../models/people.js');
let people = new People();

router.use( (req, res, next) => {
  console.log('Using the /people route');
  next();
});

// GET with Promises
router.get('/', (req, res, next) => {
  people.getByQuery({})
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});


router.post('/', (req, res, next) => {
  people.create(req.body)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});

router.put('/', (req, res, next) => {
  people.update(req.body._id, req.body)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});

router.delete('/', (req, res, next) => {
  people.delete(req.body)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});


// GET :id with Async/Await
// people/Sarah
router.get('/', async (req, res, next) => {
  let data = await people.get(req.params.id);
  if (data && data._id) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get('/:firstName-:lastName', async (req, res, next) => {
  let data = await people.getFromField(req.params);
  res.send(data);
});

router.get('/count', (req, res, next) => {

});

module.exports = router;
