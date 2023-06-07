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
  resp.send("Server/Backend is Working");
});

// create user account
app.get("/account/create/:name/:role/:email/:password", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((tagebuser) => {
    // if user exists, return error message
    if (tagebuser.length > 0) {
      console.log("User already exists");
      res.send("User already exists");
    } else {
      // else create user
      dal
        .create(
          req.params.name,
          req.params.role,
          req.params.email,
          req.params.password
        )
        .then((tagebuser) => {
          console.log(tagebuser);
          res.send(tagebuser);
        });
    }
  });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  console.log(req.params.email);
  console.log(req.params.password);

  dal.find(req.params.email).then((tagebuser) => {
    // if user exists, check password
    if (tagebuser.length > 0) {
      if (tagebuser[0].password === req.params.password) {
        res.send(tagebuser[0]);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found!");
    }
  });
});

// "Catch all" anything that doesn't match the above, send back the index.html file
app.get("*", (req, res) => {
  console.log("catch all triggered");
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  //res.redirect("/");
});

// Choose the port and start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
