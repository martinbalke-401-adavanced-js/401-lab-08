'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const peopleRoutes = require('./routes/people-routes.js');
const middleware = require('./routes/middleware');

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
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

app.use('/people', peopleRoutes);

app.get('*', middleware.pageNotFound);


module.exports = {
  server: app,
  start: start
};
