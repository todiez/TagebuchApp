// // To connect with mongoDB database
// const mongoose = require("mongoose");

// // Schema for users of app
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

//const User = mongoose.model("users", UserSchema);
//User.createIndexes();

const express = require("express");
const cors = require("cors");
const path = require("path");
var dal = require("./dal.js");

// Create the server
const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend/build")));

// For backend and express
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((tagebusers) => {
    // if user exists, return error message
    if (tagebusers.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      dal
        .create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
          console.log(tagebuser);
          res.send(tagebuser);
        });
    }
  });
});

// "Catch all" anything that doesn't match the above, send back the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

// Choose the port and start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Mixing it up on port: ${PORT}`);
});
