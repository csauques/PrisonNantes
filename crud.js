module.exports = {
    readAll : function(db, nomCol, res) {
        const collection = db.collection(nomCol);
        collection.find({}).toArray(function(err, result) {
            res.send(result);
        });
    },

    read : function(db, nomCol, id, res) {
        const collection = db.collection(nomCol);
        collection.findOne(id, function(err, result) {
            res.send(result);
        });
    },

    create : function(db, nomCol, objnew) {
        const collection = db.collection(nomCol);
        collection.insertOne(objnew);
    },

    update : function(db, nomCol, objnew, id) {
        const collection = db.collection(nomCol);
        collection.updateOne(id, {$set: objnew }, function(err, result){
            console.log("Update document into the collection");
        });
    },

    delete : function(db, nomCol, id) {
        const collection = db.collection(nomCol);
        collection.deleteOne(id, function(err, result){
            console.log("Delete document into the collection");
        });
    }
}
