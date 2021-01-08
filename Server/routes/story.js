const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const fs=require('fs')
const Stories =require('../models/stories')
const Comments = require('../models/comments')
const { query } = require('express');


function getStories(){
    story=fs.readFileSync('./data/stories.json')
    return JSON.parse(story)
}
function getUsers(){
    user=fs.readFileSync('./data/userInfo.json')
    return JSON.parse(user)
}

function findPerson(username){
    find=getUsers()
    for(let i = 0; i<find.length;i++){
        if(find[i].username===username){
            return true
        }
    }
}

function findStory(username,title){
    story=getStories()
    mainFilter=story.filter(element=>element.username===username&&element.title===title)
    return mainFilter
}

router.get('/story', (_req,res)=>{
   Stories
   .query('orderBy','likes')
   .fetchAll()
   .then(story=>{
    res.status(200).json(story)})
})

router.get('/story/:user',(req,res)=>{
   /* user=req.params.user
    story=getStories()
    people=getUsers()
    mainStory=people.filter(person=>person.username===req.params.user)
    personStories=mainStory[0].stories
    findStories= (something)=>{
        storyArray=[]
        for(let i =0; i<story.length;i++){
          if(something.includes(story[i].id)){
              storyArray.push(story[i])
          } 
        }
        return storyArray
    }
    if(mainStory[0].stories.length){
    res.status(200).json(findStories(personStories))
    }
else{
    res.json({failure:true})
}*/
Stories
.where({username:req.params.user})
.fetchAll()
.then(story=>{
    res.status(200).json(story)
})

})

router.get('/:story',(req,res)=>{
   /* allStories=getStories()
    const indiv=allStories.filter(story=>story.id==req.params.story)
    res.status(200).json(indiv) */
    Stories
    .where({id:req.params.story})
    .fetch()
    .then(story=>{
        res.status(200).json(story)
    })
})

router.get('/findStory/:username/:title',(req,res)=>{
  /*  username=req.params.username
    title=req.params.title
    mainFind=findStory(username,title)
    res.status(200).json(mainFind)*/
    Stories
    .where({username:req.params.username}&&{title:req.params.title})
    .fetch()
    .then(story=>{
        res.status(200).json(story)
    })
})

router.post('/story',(req,res)=>{
  /*  const story = getStories()
    const user=getUsers()
    const newId=uuidv4()
    const findUser=user.findIndex(person=>person.username===req.body.username)
    const newStory={
        username:req.body.username,
        id:newId,
        title:req.body.title,
        text:req.body.text,
        genre:req.body.genre.toLowerCase(),
        comments:[],
        likes:0,
        created:Date.now()
    }
    if(findPerson(req.body.username)){
    story.push(newStory)
    fs.writeFileSync('./data/stories.json',JSON.stringify(story))
    user[findUser].stories.unshift(newId)
    fs.writeFileSync('./data/userInfo.json',JSON.stringify(user))
    res.status(200).json({success:true})
    }
    else{
        res.json({failure:true})
    }*/
    if(req.body.title.length &&req.body.text.length&&req.body.genre.length){
     const newId=uuidv4()
    new Stories({
        username:req.body.username,
        id:newId,
        title:req.body.title,
        text:req.body.text,
        genre:req.body.genre.toLowerCase(),
        likes:0
    })
    .save(null,{method:'insert'})
    .then(story=>{
        res.status(200).json({success:true})
    })}
    else{res.json({failure:true})}
})

router.post('/like/:id',(req,res)=>{
   /* story=getStories()
    indiv=story.findIndex(element=>element.id===req.params.id)
    story[indiv].likes++
    if(indiv!==-1){
    fs.writeFileSync('./data/stories.json',JSON.stringify(story))
    res.status(200).json(story[indiv])
    }
    else{
        res.json({failure:true})
    }*/
    Stories
    .where({id:req.params.id})
    .fetch({columns:['likes']})
    .then(story=>{
         final=JSON.parse(JSON.stringify(story))
        Stories
        .where({id:req.params.id})
        .save({likes:final.likes+1},{patch:true})
        .then(story=>{
            res.status(200).json(story)
        })
    })
    /*.increment('likes',+1)
    .fetch()
    .then(story=>{
        return story.save({
            username:story.username,
            id:story.id,
            title:story.title,
            text:story.text,
            genre:story.genre,
            likes:story,
            comments:story.comments
        })
    })
    .then(
        Stories
        .where({id:req.params.id})
        .fetch()
        .then(story=>{
            res.status(200).json(story)
        })
    )
    */
})

router.get('/comments/:id',(req,res)=>{
Comments
.where({storyID:req.params.id})
.fetchAll()
.then(comment=>{
    res.status(200).json(comment)
})
})

router.post('/comment/:id',(req,res)=>{
    /*story=getStories()
    indiv=story.findIndex(element=>element.id===req.params.id)
    newComment={
        username:req.body.username,
        timestamp:Date.now(),
        text:req.body.text,
        likes:0
    }
    story[indiv].comments.unshift(newComment)
    if(req.body.text.length){
        fs.writeFileSync('./data/stories.json',JSON.stringify(story))
        res.status(200).json(story[indiv])
    }
    else{
        res.json({failure:true})
    }*/
    if(req.body.text.length){
        new Comments({
            storyID:req.params.id,
            username:req.body.username,
            text:req.body.text,
            likes:0
        })
        .save(null,{method:'insert'})
        .then()
    }
})


module.exports=router