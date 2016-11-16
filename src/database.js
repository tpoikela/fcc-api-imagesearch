
var mongo = require("mongodb").MongoClient;

// Connects to the MongoDB
var Database = function(db_url) {

    var collName = "img_searches";
    var db_url = db_url;

    /** Adds an URL into the database.*/
    this.add = function(keyword, func) {
        mongo.connect(db_url, (err, db) => {
            if (err) func(err);
            else {

                var collection = db.collection(collName);
                var when = new Date().getTime();
                var whenPretty = "";
                var newDoc = {keyword: keyword, when: when};

                collection.insert(newDoc, function(err, data) {
                    if (err) func(err);
                    else {
                        console.log("Inserted keyword " + keyword + " into the DB");
                        db.close();
                        func();
                    }
                });
            }

        });
    };

    /** Returns N latest seaches or all if N is more than what's in the DB.*/
    this.getN = function(N, func) {
        console.log("db.get query for " + N + " results.");
        mongo.connect(db_url, (err, db) => {
            if (err) func(err);
            else {
                var collection = db.collection(collName);

                //var query = {short_id: parseInt(id)};

                collection.find({}, {_id: 0}).sort({when: -1}).limit(N).toArray(
                    (err, docs) => {
                    if (err) func(err);
                    console.log("Docs: " + JSON.stringify(docs));

                    db.close();
                    func(null, docs);
                });
            }
        });

    };

    // DB must be checked for existing links
    /*
    mongo.connect(db_url, (err, db) => {
        if (err) throw err;

        var collection = db.collection(collName);

        collection.find().toArray((err, docs) => {
            if (err) throw err;
            nextID = docs.length;
            console.log("DB init check Next ID is " + nextID);

            db.close();
        });
    });
    */

};

module.exports = Database;
