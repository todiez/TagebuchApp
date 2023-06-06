require("dotenv").config();
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

//Collection name and chosing if dynamically injected
const User = mongoose.model("TagebuchUser", userSchema);

let db = null;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    db = await mongoose.connect(process.env.MONGOURL);
    console.log(`Database connected: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// create user account using the collection.insertOne function
function create(name, role, email, password) {
  const createdAt = Date.now();

  const user = new User({ name, role, email, password, createdAt });
  return user.save();
}

// find user account for Login
function find(email) {
  return User.find({ email }).exec();
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
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
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, findOne, find, update, all };
