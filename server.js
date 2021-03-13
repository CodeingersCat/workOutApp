//importing dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//setting up the env config
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connecting to database
const uri = process.env.DB_URI;
async function conekt() {
    await mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})};

conekt();

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Successfully established connection with Atlas");
})

//routing
const userRoute = require("./routes/users");
const exerRoute = require("./routes/exercise");

app.use('/exercises', exerRoute);
app.use('/users', userRoute)
app.use('/', (req, res) => { res.send("Good morning sunshine")})

//server ignition
app.listen(port, ()=> {
    console.log(`Server is UP AND RUNNING @ ${port}`);
});