'use strict';

module.exports = function(app) {
  const bookshelf = app.get('bookshelf');
  
  const Model = bookshelf.Model.extend({
    tableName: 'rooms',
  });

  return bookshelf.model('Rooms', Model);
}