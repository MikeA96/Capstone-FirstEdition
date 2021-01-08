const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');
const { search } = require('./story');
const Stories =require('../models/stories')
const UserInfo =require('../models/userInfo');

const findUser=()=>{
    const user = fs.readFileSync('./data/userInfo.json')
    return JSON.parse(user)
}
const getStories=()=>{
    story=fs.readFileSync('./data/stories.json')
    return JSON.parse(story)
}



router.get('/search/:search',(req,res)=>{
/*find=req.params.search
story=getStories()
user=findUser()
searchQuery=[]
storyFilter=story.filter(element=>element.username.toLowerCase().includes(find)||element.title.toLowerCase().includes(find))
searchQuery.push(storyFilter)
userFilter=user.filter(element=>element.username.toLowerCase().includes(find)||element.name.toLowerCase().includes(find))
searchQuery.push(userFilter)
res.status(200).json(searchQuery)*/
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
   /* const genre=req.params.genre
     story=getStories()
     storyFiltered=story.filter(element=>element.genre===genre.toLowerCase())
     res.status(200).json(storyFiltered)*/
     Stories
     .where({genre:req.params.genre})
     .fetchAll()
     .then(everything=>{
         res.status(200).json(everything)
     })
})

module.exports=router