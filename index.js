// To connect with your mongoDB database
const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = async () => {
  try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGOURL);
      console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
      console.log(error);
  }
}

connectDB();


//module.exports = connectDB;

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);
User.createIndexes();





const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

// // Serve our api route /cow that returns a custom talking text cow
// app.get('/api/cow/:say', cors(), async (req, res, next) => {
//   try {
//     const text = req.params.say
//     const moo = cowsay.say({ text })
//     res.json({ moo })
//   } catch (err) {
//     next(err)
//   }
// })

// // Serve our base route that returns a Hellow World cow
// app.get('/api/cow/', cors(), async (req, res, next) => {
//   try {
//     const moo = cowsay.say({ text: 'Hello World!' })
//     res.json({ moo })
//   } catch (err) {
//     next(err)
//   }
// })



// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})