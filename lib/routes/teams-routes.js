'use strict';

const express = require('express');
const router = express.Router(); // app

//Importing and instantiating the teams model
const Teams = require('../models/teams.js');
let teams = new Teams();

//Middleware to show what route you're on
router.use((req, res, next) => {
  console.log('Using the /teams route');
  next();
});

/**
 * Homepage route for the site
 * @route GET /teams
 * @group teams routes
 * @returns {JSON} 200 - All of the teams records in the database
 * @returns {error} 500
 */
router.get('/', (req, res, next) => {
  teams.getByQuery({})
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});

/**
 * Route for creating a team record in the database
 * @route POST /teams
 * @group teams routes
 * @param req.body - The team you would like to create
 * @returns {JSON} 200 - The record for the team that was created
 * @returns {error} 500
 */
router.post('/', (req, res, next) => {
  teams.create(req.body)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});

/**
 * Route for updating a team in the database
 * @route PUT /teams/:id
 * @group teams routes
 * @param req.params.id - The record id you would like to update
 * @param req.body - The record data you would like to update
 * @returns {JSON} 200 - The record for the team that was updated
 * @returns {error} 500
 */
router.put('/:id', (req, res, next) => {
  teams.update(req.params.id, req.body)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});

/**
 * Route for deleting a team from the database
 * @route DELETE /teams/:id
 * @group teams routes
 * @param req.params.id - The record id you would like to delete
 * @returns {JSON} 200 - The record that was deleted
 * @returns {error} 500
 */
router.delete('/:id', (req, res, next) => {
  teams.delete(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
});
/**
 * Route for getting a count of the teams records in your database
 * @route GET /teams/count
 * @group teams routes
 * @param req.params - The name you want to search by
 * @returns {JSON} 200 - A count of the records in this collection
 * @returns {error} 500
 */
router.get('/count', async (req, res, next) => {
  let count = await teams.count();
  res.status(200).json(count);
});


/**
 * Route for getting a team by their id
 * @route GET /teams/:id
 * @group teams routes
 * @param req.params.id - The record id you would like to update
 * @returns {JSON} 200 - Any record that matches your request
 * @returns {error} 500
 */
router.get('/:id', async (req, res, next) => {
  let data = await teams.get(req.params.id);
  if (data && data._id) res.send(data);
  else next('route');
});

/**
 * Route for getting a team by their first and last names
 * @route GET /teams/:name
 * @group teams routes
 * @param req.params - The name you want to search by
 * @returns {JSON} 200 - Any record that matches your request
 * @returns {error} 500
 */
router.get('/:name', async (req, res, next) => {
  let data = await teams.getByQuery(req.params);
  res.send(data);
});


module.exports = router;
