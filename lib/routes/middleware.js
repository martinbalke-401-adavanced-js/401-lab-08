'use strict';

module.exports = exports = {};

exports.logger = (req, res, next) => {
  req.timeStamp = Date.now();
  console.log(`
  Timestamp: ${req.timeStamp}
  Path: ${req.path}
  Method: ${req.method}
  `);
  next();
};

//Default express error handler from express documentation
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

exports.pageNotFound = (req, res) => {
  res.status(404).send('Error page not found');
};


