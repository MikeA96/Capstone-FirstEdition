const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const fs=require('fs')

const findUser=()=>{
    const user = fs.readFileSync('./data/userInfo.json')
    return JSON.parse(user)
}

router.put('/user',(req,res)=>{
    const user=findUser()
   const indiv= user.findIndex(person=>person.username===req.body.username)
    const newInfo={
        username:req.body.username,
        name:req.body.name,
        info:req.body.info,
        content:req.body.content,
        stories:user[indiv].stories,
        edits:user[indiv].edits
    }
    user.splice(indiv,1,newInfo)
    fs.writeFileSync('./data/userInfo.json',JSON.stringify(user))
    res.status(200).json(user)
})

router.get('/user/:user',(req,res)=>{
user=findUser()
const indiv = user.filter(person=>person.username===req.params.user)
res.status(200).json(indiv)
})

module.exports=router