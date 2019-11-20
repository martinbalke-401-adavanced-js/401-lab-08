'use strict';

const Model = require('./model.js');

const schema = require('./team-schema');
/**
 * Teams model that extends our data model
 * @class Teams
 */
class Teams extends Model {
/**
* @param schema - Mongoose schema model
*/
  constructor() {
    super(schema);
  }
}

module.exports = Teams;
