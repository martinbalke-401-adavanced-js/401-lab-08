'use strict';

module.exports = exports = {};

/**
 * Logger for the routes, Adds a timestamp and logs certain
 * information about a request the client is making
 */
exports.logger = (req, res, next) => {
  req.timeStamp = Date.now();
  console.log(`
  Timestamp: ${req.timeStamp}
  Path: ${req.path}
  Method: ${req.method}
  `);
  next();
};

/**
 * Error handler for express
 * @param err - The error object
 * @param {object} res - Response data sent back to the client
 * @throws - Will throw an error whenever a specified path does not exist
 */
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

/**
 * 404 status page middleware
 * @param {object} res - The response sent back to the client
 * @throws - Throws an error indicating the requested resource is not found
 */
exports.pageNotFound = (req, res) => {
  res.status(404).send('Error page not found');
};


