
module.exports = {
    readAllDetenu : function(db, callback) {
          // Get the documents collection
          const collection = db.collection('Detenu');
          // Find some documents
          collection.find({}).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs)
                callback(docs);
          });
    },

    readDetenu : function(db, callback) {
          // Get the documents collection
          const collection = db.collection('Detenu');
          // Find some documents
          collection.find({'a': 3 }).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs);
                callback(docs);
          });
    },

    createDetenu : function(db, callback) {
        // Get the documents collection
        const collection = db.collection('Detenu');

        collection.insertMany([
            {_id : 2}
        ], function(err, result){
            console.log("Inserted document into the collection");
            callback(result);
        });
    },

    updateDetenu : function(db, callback) {
        // Get the documents collection
        const collection = db.collection('Detenu');

        collection.updateOne({_id : 2}
            , {$set: {a : 10} }, function(err, result){
            console.log("Update document into the collection");
            callback(result);
        });
    },

    deleteDetenu : function(db, callback) {
        // Get the documents collection
        const collection = db.collection('Detenu');

        collection.deleteOne({_id : 2}, function(err, result){
            console.log("Delete document into the collection");
            callback(result);
        });
    }
}
