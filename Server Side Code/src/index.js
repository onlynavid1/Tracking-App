require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:admin@cluster0.6u0sj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(mongoUri,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
// })
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
    console.log('Connected to Mongo Instance')
});
mongoose.connection.on('error', (err) => {
    console.log("Error Connecting to Mongo ", err);
});

app.get('/', requireAuth,  (req,res) => {
    res.end(`Your Email is: ${req.user.email}`);
});

app.listen( 3000, () => {
    console.log("Listening on Port 3000")
});
