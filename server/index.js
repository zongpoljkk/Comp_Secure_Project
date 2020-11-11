const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const posts = require("./routes/api/post");
const app = express();
const jwt_decode = require("jwt-decode");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(async (req) => {
  try {
    // const token = req.headers.authorization
    const userInfo = jwt_decode(req.headers.authorization);
    // console.log(userInfo);
    req.userInfo = userInfo;
    return req.next();
  } catch (e) {
    return req.next();
  }
});

// Routes
app.use("/api/users", users);
app.use("/api/posts", passport.authenticate("jwt", { session: false }), posts);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.use("/",(req,res)=>{
  res.send("Hello Computer security !!!!")
})
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
