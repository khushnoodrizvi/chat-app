const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser');
const sessions = require('express-session')
// const cookieParser = require("cookie-parser");
const mongoDBStrore = require('connect-mongodb-session')(sessions)
require('dotenv').config()
const users = require('./routes/router')
const conversations = require('./routes/conversation.router')
const auth = require('./routes/auth.router')
const User = require('./models/users.model')
const app = express()
mongoose.connect(process.env.DATABASE_URL);

const store = new mongoDBStrore({
  uri: process.env.DATABASE_URL,
  collection: "sessions"
});

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({origin: "http://localhost:5001", credentials: true}))
// app.use(cookieParser());
app.use(sessions({
  name : 'chat.sid',
  secret: "my secret",
  saveUninitialized:true,
  resave: true,
  store: store
}));

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('database connectede'))


app.use((req, res, next) => {
  console.log('session---------------------')
  console.log(req.session);
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then((user) => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err))
})

app.get('/set', (req, res, next)=>{
  res.json(req.session.view);
})

app.get('/mydata', (req, res, next)=>{
  console.log('my-data*************************');
  if(req.session.view)
    req.session.view += 1;
  else req.session.view = 1;
  console.log(req.session.view);
  res.json(req.session.view);
})

app.use('/auth',auth)
app.use('/users',users)
app.use('/conversations',conversations)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;