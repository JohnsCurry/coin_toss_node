var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('highScores');
  collection.find({}, {}, function(e, docs){
    docs.sort(compareObjs);
    res.render('index', {
      "highScores": docs
    });
  });
});

router.post('/addScore', function(req, res){
  var db = req.db;
  var collection = db.get('highScores');
  var userName = req.body.user;
  var score = req.body.score;
  console.log(score + " Is the score for this player");

  collection.insert({
    "name"  : userName,
    "score" : score
  }, function(err, doc) {
    if (err) {
      res.send("There was an error");
    } else {
      res.redirect('/');
    }
  });

//  db.collection.insertOne({ 'name': "testUser", 'score': score},
//    function(err, r){
//      assert.equal(null, err);
//      res.send("Document inserted with an id");
//    }
//  );
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
