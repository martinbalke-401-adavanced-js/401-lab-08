'use strict';


/**
 * @class Model - Defines the model class for our basic data modeling
 */
class Model {
  constructor(schema) {
  /**
   * Create a model
   * @param {object} schema - The mongoose schema used for defining a model
   */
    this.schema = schema;
  }
  /**
  * Create a new record in the database
  * @param {object} item - the record you would like to add to your collection
  * @returns {Promise<object>} - The new record that was saved
  */
  create(item) {
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  /**
   * Get a record by id or return all records in the collection
   * @param {string} _id - the id of a record you would like to search for
   * @returns {object} - The results from the search
   */
  get(_id) {
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }

  /**
   * GetByQuery is a method called on the datamodel that allows you to search a collection
   * for all records matching the parameters given to the function
   * @param {object} query - The terms you would like to search for
   * @returns {object} - Any records matching the query on the model
   */
  getByQuery(query) {
    return this.schema.find(query);
  }

  /**
  * Update finds a record by id and modifies it with the given record information
  * @param {string} _id - ID of the record you are looking to update
  * @param {object} item - Information about the record you would like to update
  * @returns {object} - The updated record
  */
  update(id, item) {
    let updated = this.schema.findByIdAndUpdate(id, item);
    return updated ? updated : {};
  }


  /**
  * Delete finds a record by id and removes it from the collection
  * @param {string} _id - ID of the item you want to delete
  * @returns {object} - The record that was removed from the database
  */
  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }

  /**
   * Count counts all of the records in this models collection
   * @returns {string} - The number of documents found 
   */
  async count(){
    let count = await this.schema.countDocuments();
    return count;
  }
}

module.exports = Model;
