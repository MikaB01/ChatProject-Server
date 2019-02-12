'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(app) {
  const bookshelf = app.get('bookshelf');
  
  const Model = bookshelf.Model.extend({
    tableName: 'rooms',
  });

  return Model;
}