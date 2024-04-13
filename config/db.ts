
// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://natejaden:friedchicken69@atlascluster.pzi4n5v.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client;
