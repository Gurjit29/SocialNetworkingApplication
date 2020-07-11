var express=require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');

var bodyParser=require('body-parser');
var dotenv=require('dotenv');

dotenv.config();

var userRoutes=require('./routes/userRoutes');
var authRoutes=require('./routes/authRoutes');

const app = express()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (()=> console.log("Database connection established!"));


mongoose.connection.on("error",(err) => {
    console.log(`DB connection error: ${err.message}`);
});

//Middleware
// app.use(morgan("app"));
app.use(bodyParser.json());
app.use("/",userRoutes);
app.use("/",authRoutes);


const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Node API is listening at port number : ${PORT}`);
});

/**
 * "/": "API docs",
    "/signup": "Sign Up",
    "/signin": "Sign In",
    "/signout":"Sign Out",
    "/users":"Get All Users",
    "/user/:userId": "Get User or Update User or Delete User",
    "/posts":"Get All Posts",
    "/post/new/:userId":"Create New Post",
    "/post/by/:userId":"Get Posts By User",
    "/post/:postId": "Update Post or Delete Post"
 */




