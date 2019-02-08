'use strict';

const bookshelf = require('../../database');

const Model = bookshelf.Model.extend({
  tableName: 'rooms',
});

module.exports = bookshelf.model('Rooms', Model);