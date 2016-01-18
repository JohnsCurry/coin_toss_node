
To-do, things to think about:

- Sort function should probably not go in the "routes/index.js" file
- Do I even need a "sort" function? Wouldn't it be better to sort the highscore objects at the database level and then just grab the top 10?
- Learn Jade better, the current template is hideous, and only because my lack of knowledge of Jade
- Figure out why collection.insert({
    "name"  : userName,
    "score" : score
  }, function(err, doc) {
    if (err) {
      res.send("There was an error");
    } else {
      res.redirect('/');
    }
  });  works to add the record, however,

db.collection.insertOne({ 'name': "testUser", 'score': score},
//    function(err, r){
//      assert.equal(null, err);
//      res.send("Document inserted with an id");
//    }
//  );  Does NOT work. With this all I get is a 500 error which is extremely hard to debug.
