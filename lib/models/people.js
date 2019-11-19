'use strict';

const Model = require('./model.js');

const schema = require('./people-schema.js');

/**
 * The people class extending our data model
 * @class People
 * 
 */
class People extends Model {
  /**
   * @param schema - Mongoose schema model
   */
  constructor() {
    super(schema);
  }
}

module.exports = People;
