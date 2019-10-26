'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
  }

  getFromField(query) {
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

  create(record) {}

  update(_id, record) {}

  delete(_id) {}

  count(query) {}
}

module.exports = Model;
