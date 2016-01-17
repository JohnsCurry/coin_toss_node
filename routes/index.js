var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('highScores');
  collection.find({}, {}, function(e, docs){
    console.log(docs);
    console.log("clear clear clear");
    docs.sort(compareObjs);
    res.render('index', {
      "highScores": docs
    });
  });
  //res.render('index', { title: 'Express' });
});


//This function should probably NOT be here, I just don't know where to put it yet.
function compareObjs(a, b){
  if (a.score > b.score){
    return -1;
  } else if ( a.score < b.score){
    return 1;
  } else {
    return 0;
  }
}


module.exports = router;
