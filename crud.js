
module.exports = {
    readAll : function(db, callback, nomCol) {
          // Get the documents collection
          const collection = db.collection(nomCol);
          // Find some documents
          collection.find({}).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs)
                callback(docs);
          });
    },

    read : function(db, callback, nomCol) {
          // Get the documents collection
          const collection = db.collection(nomCol);
          // Find some documents
          collection.find({'a': 3 }).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs);
                callback(docs);
          });
    },

    create : function(db, callback, nomCol) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.insertMany([
            {_id : 2}
        ], function(err, result){
            console.log("Inserted document into the collection");
            callback(result);
        });
    },

    update : function(db, callback, nomCol) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.updateOne({_id : 2}
            , {$set: {a : 10} }, function(err, result){
            console.log("Update document into the collection");
            callback(result);
        });
    },

    delete : function(db, callback, nomCol) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.deleteOne({_id : 2}, function(err, result){
            console.log("Delete document into the collection");
            callback(result);
        });
    }
}
