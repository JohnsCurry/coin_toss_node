var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('highScores');
  var collectionObject = collection.find();
  console.log(collectionObject);
  //collection.find({}, {}, function(e, docs){
  //  res.render('index', {
  //    "highScores": docs
  //  });
  //});
  res.render('index', { title: 'Express' });
});

module.exports = router;
