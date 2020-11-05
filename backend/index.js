const connectionString = "mongodb+srv://makstrrr:contaq-burvY6-ruqgif@cluster0.tv99r.mongodb.net/test?retryWrites=true&w=majority"

const mongoose = require('mongoose')
const MongoClient = require("mongodb").MongoClient;
//const postSchema = require('./schema.js')
//const Posts = mongoose.model('posts', postSchema, 'posts')

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:1234"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialize(
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(connectionString, function (err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err); // this should be "caught" by the calling function
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log("[MongoDB connection] SUCCESS");

      successCallback(dbCollection);
    }
  });
}

initialize('test', 'posts', function (dbCollection) { // successCallback
  // get all items
  app.get('/', (req, res) => {
    dbCollection.find().toArray((error, result) => {
      if (error) throw error;
      // return item
      res.json(result);
    });
  });
  app.delete('/delete', (req, res) => {
    dbCollection.deleteMany({})
  });
  app.post("/new-post", (req, response) => {

    const item = {
      title: req.body.title,
      description: req.body.description,
      created: new Date()
    }

    dbCollection.insertOne(item, (error, res) => {
      if (error) throw error;
      dbCollection.find().toArray((_error, _result) => {
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

}, function (err) {
  throw (err);
})