
module.exports = {
    readAll : function(db, nomCol, res) {
          const collection = db.collection(nomCol);
          collection.find({}).toArray(function(err, result) {
                console.log(result);
                res.send(result);
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

        collection.insertOne(objnew);
    },

    update : function(db, nomCol, objnew, id) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.updateOne({n_ecrou : id}, {$set: objnew }, function(err, result){
            console.log("Update document into the collection");
        });
    },

    delete : function(db, nomCol, id) {
        // Get the documents collection
        const collection = db.collection(nomCol);

        collection.deleteOne({n_ecrou :id}, function(err, result){
            console.log("Delete document into the collection");
        });
    }
}
