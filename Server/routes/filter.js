const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');
const { search } = require('./story');

const findUser=()=>{
    const user = fs.readFileSync('./data/userInfo.json')
    return JSON.parse(user)
}
const getStories=()=>{
    story=fs.readFileSync('./data/stories.json')
    return JSON.parse(story)
}



router.get('/search/:search',(req,res)=>{
find=req.params.search
story=getStories()
user=findUser()
searchQuery=[]
storyFilter=story.filter(element=>element.username.toLowerCase().includes(find)||element.title.toLowerCase().includes(find))
searchQuery.push(storyFilter)
userFilter=user.filter(element=>element.username.toLowerCase().includes(find)||element.name.toLowerCase().includes(find))
searchQuery.push(userFilter)
res.status(200).json(searchQuery)
})

router.get('/filter/:genre',(req,res)=>{
    const genre=req.params.genre
     story=getStories()
     storyFiltered=story.filter(element=>element.genre===genre.toLowerCase())
     res.status(200).json(storyFiltered)
})

module.exports=router