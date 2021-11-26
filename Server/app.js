const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const adminRouter = require("./routes/adminRoutes");
const homeRouter = require("./routes/homeRouter")

const { NotFound } = require('./utils/responseHelpers');
const { isAuth } = require("./utils/isAuthenticated");
const { login } = require("./utils/login");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"], // Assuming this is where front-end dev is going on
    allowedHeaders: "Content-Type",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post('/login', login);

app.use('/admin', adminRouter); // TODO: Put Some sort of authentication for admin

app.use('/home', isAuth, homeRouter);

app.use((req, res, next) => {
    return NotFound(res);
});

mongoose
  .connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => {
    console.log("Connected to Database");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });