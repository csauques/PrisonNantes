
module.exports = {
    readAll : function(db, nomCol, res) {
          // Get the documents collection
          const collection = db.collection(nomCol);
          // Find some documents
          collection.find({}).toArray(function(err, docs) {
                console.log(docs);
                res.send(docs);
          });

    },

    /*read : function(db, nomCol, callback) {
          // Get the documents collection
          const collection = db.collection(nomCol);
          // Find some documents
          let result;
          collection.find({'a': 3 }).toArray(function(err, docs) {
                console.log(docs);
                result = docs;
                callback(docs);
          });
          return result;
    },*/

    create : function(db, nomCol, objnew) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.insert(objnew, null, function(err, result){
            console.log("Inserted document into the collection");
        });
    },

    update : function(db, nomCol, callback) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.updateOne({_id : 2}
            , {$set: {a : 10} }, function(err, result){
            console.log("Update document into the collection");
            callback(result);
        });
    },

    delete : function(db, nomCol, callback) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.deleteOne({_id : 2}, function(err, result){
            console.log("Delete document into the collection");
            callback(result);
        });
    }
}
