const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
const cors=require('cors')
const fs=require('fs')
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const saltRounds=10;
require('dotenv').config();
app.use(express.json())
app.use(cors())
const JWT_SECRET=process.env.JWT_SECRET
const port= process.env.PORT||8080;
const mysql=require('mysql')
const knex = require('./knexfile')

let connection;
// make connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

  connection = mysql.createConnection(knex.development);
}
//if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../Client/frontend/build"));
  
    app.get("*", (req, res) => {
        console.log("test")
      res.sendFile(path.join(__dirname, "../Client/frontend", "build", "index.html"));
    });
 // }


const getStory=require('./routes/story')
const authenticate = require('./routes/authenticate')
const updateUser=require('./routes/newUser')
const editStory=require('./routes/edit')
const filter=require('./routes/filter')



app.use('/', authenticate)
app.use('/',getStory)
app.use('/',updateUser)
app.use('/',editStory)
app.use('/',filter)

app.listen(port,()=>{
    console.log("Listening on port " + port)
})

connection.connect(err => {
    console.log("connected as id " + connection.threadId);
  });
  
  // Export connection for our ORM to use.
  module.exports = connection;
  