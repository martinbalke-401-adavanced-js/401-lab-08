'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const peopleRoutes = require('./routes/people-routes.js');
const teamsRoutes = require('./routes/teams-routes.js');
const middleware = require('./routes/middleware');

/**
 * Function start
 * Exported and used to initialize our server connection as well
 * as our mongoose database connection
 * @param {number} port - The port on which to run our server
 */
const start = port => {

  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(process.env.MONGODB_URI, config);
};

// Models

// App Level MW
app.use(express.json());
app.use(middleware.logger);
app.use(middleware.errorHandler);

// Routes

/**
 * Homepage route for the site
 * @route GET /
 * @returns {string} 200 - A welcome message to show you're on the Homepage
 */
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

//Setting up the people routes
app.use('/people', peopleRoutes);

//Setting up the teams routes
app.use('/teams', teamsRoutes);

//404 error handler
app.use('*', middleware.pageNotFound);


module.exports = {
  server: app,
  start: start,
};
