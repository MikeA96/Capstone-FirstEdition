const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const UserInfo = require('../models/userInfo');


router.put('/api/user',(req,res)=>{
   

    UserInfo
    .where({username:req.body.username})
    .save({
            info:req.body.info,
            content:req.body.content,
        },{method:'update',patch:true})
    .then(person=>{
            res.status(200).json(person)
        })
})

router.get('/api/user/:user',(req,res)=>{

UserInfo
.where({username:req.params.user})
.fetch()
.then(user=>{
    res.status(200).json(user)
})
})

module.exports=router