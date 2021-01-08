const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
const fs=require('fs')
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const saltRounds=10;
require('dotenv').config();
app.use(express.json())
const JWT_SECRET=process.env.JWT_SECRET
const router=express.Router();
const UserInfo =require('../models/userInfo');
const Users =require('../models/users'); 

function findUsers(){
    const findContent=fs.readFileSync('./data/users.json')
    return JSON.parse(findContent)
}
function findInfo(){
    const findContent=fs.readFileSync('./data/userInfo.json')
    return JSON.parse(findContent)
}

function checkUsers(username){
    /*const user=findUsers()
    for (let i=0; i<user.length;i++){
        let index=null
        if(username===user[i].username){
            index=i
            return index
        }
    }*/
   let checker=[]
    Users
    .fetchAll({categories:['username']})
    .then(user=>{
       return JSON.parse(JSON.stringify(user))
    })
}





function authorize (req,res,next){
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'This endpoint requires Auth Header' });
      }
    
      const token = req.headers.authorization.split(' ')[1];
    
jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
     res.status(403).json({ error: 'This token is not valid' });
    } else {
      req.jwtDecoded = {
        ...decoded,
      };
      next();
    }
  });
}


  router.post('/signup',(req,res)=>{
       /* const user = findUsers()
      
      const info=findInfo()
      
    const newUser={
          id:uuidv4(),
        username,
        name,
        password: bcrypt.hashSync(password,saltRounds)
      }
      */
     const {username,name,password}=req.body
     checker=[]
      Users
      .fetchAll({categories:['username']})
      .then(user=>{
         checker=JSON.parse(JSON.stringify(user))
         let checkUser=null
          for(let i=0;i<checker.length;i++){
              if(username===checker[i].username){
             checkUser=i
              }
          }
          if(!checkUser&&checkUser!==0&&
            username&&
            name&&
            password){
            /*user.push(newUser)
            info.push({username:newUser.username,name:newUser.name,stories:[],edits:[]})
            fs.writeFileSync('./data/userInfo.json',JSON.stringify(info))
            fs.writeFileSync('./data/users.json',JSON.stringify(user))
            res.status(200).json(newUser)*/
            new Users({
              username:username,
              name:name,
              password:bcrypt.hashSync(password,saltRounds)
              
          })
          .save(null,{method:'insert'});
          new UserInfo({
              username:username,
              name:name,
              stories:"[]",
              edits:"[]"
          })
          .save(null,{method:'insert'})
          .then(res.status(200).json({success:true}))
          }
            else{res.json({failure:"true"})}
      })
      
        
      
  });

  function checkLogin(username,password){
    const user=findUsers()
    for(let i=0;i<user.length;i++){
        index=null;
        if(user[i].username===username&&bcrypt.compareSync(password,user[i].password)){
            index=i
            return index
        }
    }
}

function findName(username,password){
    const user=findUsers()
    for(let i=0;i<user.length;i++){
    if(user[i].username===username&&bcrypt.compareSync(password,user[i].password)){
        return user[i].name
    }
}
}

router.post('/login',(req,res)=>{
    const {username,password}=req.body
    /*const loginCheck=checkLogin(username,password)
    const name=findName(username,password)*/

    Users
      .fetchAll({categories:['username','password','name']})
      .then(user=>{
         checker=JSON.parse(JSON.stringify(user))
         let checkUser=null
         let findName=undefined
          for(let i=0;i<checker.length;i++){
            if(checker[i].username===username&&bcrypt.compareSync(password,checker[i].password)){
                checkUser=i
                findName=checker[i].name
            }
          }

    if(checkUser||checkUser===0){
        const token = jwt.sign({
            username,
            findName,
            exp:Date.now()+10800000
        },JWT_SECRET);
        res.status(200).json({success:true, token})
    }
    else{res.json({failure:true})}
})
})

router.get('/profile', authorize, (req, res) => {
    res.json(req.jwtDecoded);
  })
  module.exports=router