const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv/config');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const url = process.env.DB_CONNECTION;
const DATABASE_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME

let db, collection;

//Listen to port and connect to server
app.listen(3002, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(DATABASE_NAME);
        collection = db.collection(COLLECTION_NAME);
        console.log(`Connected to "${DATABASE_NAME}"!`);
    });
});

//Get all Ads
app.get('/api/ads', async (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

//Get Ad by ID
app.get("/api/ads/:id", (req, res) => {
    collection.findOne({ id: parseInt(req.params.id) }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});
