const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const Stories =require('../models/stories')
const UserInfo =require('../models/userInfo');


router.get('/search/:search',(req,res)=>{

find=req.params.search
mainSearch=[]
Stories
.query({
where:{username:find},
orWhere:{title:find}
})
.fetchAll()
.then(everything=>{
    more=JSON.parse(JSON.stringify(everything))
    UserInfo
    .query({
        where:{username:find},
        orWhere:{name:find}
    })
    .fetchAll()
    .then(something=>{
        full=JSON.parse(JSON.stringify(something))
        more.unshift(full)
        res.status(200).json(more)
    })
})
})

router.get('/filter/:genre',(req,res)=>{
   
     Stories
     .where({genre:req.params.genre})
     .query('orderBy','likes')
     .fetchAll()
     .then(everything=>{
         res.status(200).json(everything)
     })
})

module.exports=router