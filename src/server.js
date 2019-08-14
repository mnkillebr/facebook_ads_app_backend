const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
// const assert = require('assert');
const cors = require('cors')
require('dotenv/config');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const url = process.env.DB_CONNECTION;
const DATABASE_NAME = 'myData';

let db, collection;

app.listen(3002, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(DATABASE_NAME);
        collection = db.collection("ads");
        console.log(`Connected to "${DATABASE_NAME}"!`);
    });
});

app.get('/api/ads', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result[0].data);
    });
});

app.get("/api/ads/:id", (req, res) => {
    collection.findOne({ 'data': { "id":req.params.id } }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// app.get('/api/ads', async (req, res) => {
    
// })




// Connection URL


// Use connect method to connect to the Server
// MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, function (err, client) {
//     const db = client.db("test");
//     var cursor = db.collection('inventory').find({});

    

//     assert.equal(null, err);
//     client.close();
// });
//Connecting to DB
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
//     console.log('Connected to mongoose and cloud DB')
// });

//Listen to server
// app.listen(3002);