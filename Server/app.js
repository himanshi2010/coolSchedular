const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const adminRouter = require("./routes/adminRoutes");
const homeRouter = require("./routes/homeRouter");
const teacherRouter = require("./routes/teacherRouter");

const { NotFound } = require('./utils/responseHelpers');
const { isAuth, isTeacher } = require("./utils/isAuthenticated");
const { login } = require("./utils/login");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"], // Assuming this is where front-end dev is going on
    allowedHeaders: ["Content-Type", "x-access-token"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post('/login', login);

app.use('/admin', adminRouter); // TODO: Put Some sort of authentication for admin

app.use('/home', isAuth, homeRouter);

app.use('/teacher', isAuth, isTeacher, teacherRouter);

app.use((req, res, next) => {
  return NotFound(res);
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static("react-app/build"));
  const path = require("path");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'react-app','build','index.html'));
  })
}

mongoose
  .connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => {
    console.log(err);
  });