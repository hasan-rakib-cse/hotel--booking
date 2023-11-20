const express = require('express') // import er bodole require use hoy
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
// console.log(process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kiav5mh.mongodb.net/?retryWrites=true&w=majority`;

const port = 4000

const app = express()

app.use(cors()); // express cors middleware use (jehetu 2 ta ip use korbo tai 1ta middleware lagbe.)
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Firebase Admin SDK
// --> https://console.firebase.google.com/project/hotel--booking/settings/serviceaccounts/adminsdk

// Firebase Admin Node.js SDK for JWT token 
const { initializeApp } = require('firebase-admin/app');

var serviceAccount = require("./configs/hotel--booking-firebase-adminsdk-guuer-a5c94771d9.json"); // downloaded key. 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRE_DB
});



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = await client.db("hotelBooking");
    const bookings = await db.collection("bookings");

    // CREATE OPERATION
    app.post('/addBooking', async (req, res) => {
      await client.connect(); // client ta vitore dea dete hobe connection create korar jnno
      const newBooking = req.body;

      await bookings.insertOne(newBooking)
        .then((result) => {
          console.log(result)
        })
      console.log(newBooking)
    })

    // READ OPERATION
    app.get('/bookings', async (req, res) => {
      await client.connect(); // client ta vitore dea dete hobe connection create korar jnno
      const bearer = req.headers.authorization;

      if (bearer && bearer.startsWith('Bearer ')) {
        const idToken = bearer.split(' ')[1]; // amra j token pabo seta Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6I. . . . . tai sudhu Bearer bade token paite amra split korsi.

        const decodedToken = await admin.auth().verifyIdToken(idToken)
        // console.log(decodedToken)
        if (decodedToken) {
          // const uid = decodedToken.uid;
          const tokenEmail = decodedToken.email;
          const queryEmail = req.query.email;
          // console.log('token Email:' + tokenEmail, 'query Email: ' + queryEmail)
          if (tokenEmail == queryEmail) {
            res.status(200).send(await bookings.find({ email: queryEmail }).toArray());

          } else {
            res.status(401).send('un-authorized Access');
          }

        } else {
          res.status(401).send('un-authorized Access');
        }

      } else {
        res.status(401).send('un-authorized Access');
      }

    })

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port);