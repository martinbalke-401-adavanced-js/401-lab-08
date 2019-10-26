'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const peopleRoutes = require('./routes/people-routes.js');

const start = port => {
  let port = port || process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGODB_URI, config);
};

// Models

// App Level MW
app.use(express.json());

app.use('/people', peopleRoutes);
// Routes
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Error Handling

module.exports = {
  server: app,
  start: start
};
