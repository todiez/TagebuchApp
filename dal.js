require("dotenv").config();
const mongoose = require("mongoose");



// To connect with mongoDB database
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     const conn = await mongoose.connect(process.env.MONGOURL);
//     console.log(`Database connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//   }
// };
// connectDB();


const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGOURL;
let db = null;


const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGOURL);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();




// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// find user account for Login
function find(email) {
    console.log("inside dal FIND")
    return new Promise((resolve, reject) => {
        const collection = db
            .collection('tagebusers')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// return all users by using the collection.find method
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}


module.exports = { create, findOne, find, update, all };