
//read
module.exports = {
    findDetenu : function(db, callback) {
          // Get the documents collection
          const collection = db.collection('Detenu');
          // Find some documents
          collection.find({}).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs)
                callback(docs);
          });
    }

}
