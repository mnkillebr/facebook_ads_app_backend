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
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(result)
        res.send(result[0].data.filter(obj => obj.id == req.params.id)[0]);
    });
});
