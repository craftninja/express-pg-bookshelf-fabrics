var express = require('express');
var router = express.Router();

var Fabric = require('../app/models/fabric');

router.get('/', function(req, res, next) {
  Fabric.collection().fetch().then(function(collection) {
    var fabrics = collection.toJSON();
    res.render('fabrics/index', {fabrics: fabrics});
  });
});

router.get('/new', function(req, res, next) {
  res.render('fabrics/new');
});

router.post('/', function(req, res, next) {
  Fabric.forge({
    name: req.body['fabric[name]'],
    content: req.body['fabric[content]'],
    width_in_inches: req.body['fabric[width_in_inches]'],
    yardage_available: req.body['fabric[yardage_available]'],
    domestic: req.body['fabric[domestic]']
  })
  .save()
  .then(function(fabric) {
    res.redirect('/fabrics');
  })
  .catch(function(err) {
    return console.error(err);
  });
});

module.exports = router;
