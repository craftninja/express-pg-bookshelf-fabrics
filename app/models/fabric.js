var bookshelf = require('../../db/bookshelf');

var Fabric = bookshelf.Model.extend({
    tableName: 'fabrics'
});

module.exports = Fabric;
