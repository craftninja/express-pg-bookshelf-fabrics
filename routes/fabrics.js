var express = require('express');
var router = express.Router();

var Fabric = require('../app/models/fabric');

router.get('/', function(req, res, next) {
  Fabric.collection().fetch().then(function(collection) {
    var fabrics = collection.toJSON();
    res.render('fabrics/index', {fabrics: fabrics});
  });
});

module.exports = router;
