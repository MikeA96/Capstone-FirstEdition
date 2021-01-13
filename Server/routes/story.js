const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const Stories =require('../models/stories')
const Comments = require('../models/comments')
const Edits= require('../models/edits')



router.get('/api/story', (_req,res)=>{
   Stories
   .query('orderBy','liked')
   .fetchAll()
   .then(story=>{
    res.status(200).json(story)})
})

router.get('/api/story/:user',(req,res)=>{
  
Stories
.where({username:req.params.user})
.fetchAll()
.then(story=>{
    res.status(200).json(story)
})

})

router.get('/api/:story',(req,res)=>{
  
    Stories
    .where({id:req.params.story})
    .fetch()
    .then(story=>{
        res.status(200).json(story)
    })
})

router.get('/api/findStory/:username/:title',(req,res)=>{
  
    Stories
    .where({username:req.params.username}&&{title:req.params.title})
    .fetch()
    .then(story=>{
        res.status(200).json(story)
    })
})

router.post('/api/story',(req,res)=>{
  
    if(req.body.title.length &&req.body.text.length&&req.body.genre.length){
     const newId=uuidv4()
    new Stories({
        username:req.body.username,
        id:newId,
        title:req.body.title,
        text:req.body.text,
        genre:req.body.genre.toLowerCase(),
        likes:'[]'
    })
    .save(null,{method:'insert'})
    .then(story=>{
        res.status(200).json({success:true})
    })}
    else{res.json({failure:true})}
})

router.delete('/api/like/:id',(req,res)=>{
    Stories
    .where({id:req.params.id})
    .fetch()
    .then(story=>{
        final=JSON.parse(JSON.stringify(story))
        make=JSON.parse(final.likes)
       makeFind= make.findIndex((element)=>element===req.body.username)
        make.splice(makeFind,1)
        like=make.length
       Stories
       .where({id:req.params.id})
       .save({id:final.id,likes:JSON.stringify(make),liked:like},{method:'update',require:true,patch:true})
       .then(story=>{
           res.status(200).json(story)
       })
    })
})

router.post('/api/like/:id',(req,res)=>{
  
    Stories
    .where({id:req.params.id})
    .fetch()
    .then(story=>{
         final=JSON.parse(JSON.stringify(story))
         make=JSON.parse(final.likes)
         
        let search=null
         for(let i=0;i<make.length;i++){
            if(make[i]===req.body.username){
                search=make[i]
            }
         }
         
        if(search===null){
         make.push(req.body.username)
         like=make.length
        Stories
        .where({id:req.params.id})
        .save({id:final.id,likes:JSON.stringify(make),liked:like},{method:'update',require:true,patch:true})
        .then(story=>{
            res.status(200).json(story)
        }
        
        )
    }else{
        res.status(200).json({failure:true})
    }})
    
})

router.get('/api/comments/:id',(req,res)=>{
Comments
.where({storyID:req.params.id})
.query('orderBy','likes')
.fetchAll()
.then(comment=>{
    res.status(200).json(comment)
})
})
router.post('/api/comment/like/:id',(req,res)=>{
Comments
.where({id:req.params.id})
.fetch()
.then(comment=>{
    first=JSON.parse(JSON.stringify(comment))
    second=JSON.parse(first.liked)
   find= second.findIndex((element)=>element===req.body.username)
    if(find===-1){
        second.push(req.body.username)
        Comments
        .where({id:req.params.id})
        .save({id:first.id,liked:JSON.stringify(second),likes:second.length},{method:'update',require:true,patch:true})
        .then(comment=>{
            res.status(200).json(comment)
        })
    }
    else{
        res.status(200).json({failure:true})
    }
})
})

router.delete('/api/comment/like/:id',(req,res)=>{
    Comments
    .where({id:req.params.id})
    .fetch()
    .then(comment=>{
        first=JSON.parse(JSON.stringify(comment))
        second=JSON.parse(first.liked)
        mainFind=second.findIndex((element)=>element===req.body.username)
        second.splice(mainFind,1)
        Comments
        .where({id:req.params.id})
        .save({id:first.id,likes:second.length,liked:JSON.stringify(second)},{method:'update',require:true,patch:true})
        .then(comment=>{
            res.status(200).json(comment)
        })
    })
})

router.post('/api/comment/:id',(req,res)=>{
   
    if(req.body.text.length){
        new Comments({
            storyID:req.params.id,
            username:req.body.username,
            text:req.body.text,
            likes:0,
            liked:'[]'
        })
        .save(null,{method:'insert'})
        .then()
    }
})
router.delete('/api/story/:id',(req,res)=>{
    const {username}=req.body
    Stories
    .where({id:req.params.id})
    .fetch()
    .then(story=>{
        let find=JSON.parse(JSON.stringify(story))
        if(username===find.username){
            Stories
            .where({id:req.params.id})
            .destroy()
            .then(story=>{
                Edits
                .where({title:find.title})
                .fetchAll()
                .then(edits=>{
                    mainFind=JSON.parse(JSON.stringify(edits))
                    for(let i=0;i<mainFind.length;i++){
                        if(mainFind[i].title===find.title&&mainFind[i].username===username){
                            Edits
                            .where({id:mainFind[i].id})
                            .destroy()
                        }
                    }
                })
                .then(res.status(204).json({success:true}))
            })
        }
        else{res.status(200).json({failure:true})}
    })
})

router.delete('/api/comments/:id',(req,res)=>{
    const {username}=req.body
    Comments
    .where({id:req.params.id})
    .fetch()
    .then(comment=>{
        mainFind=JSON.parse(JSON.stringify(comment))
        if(mainFind.username===username){
            Comments
            .where({id:req.params.id})
            .destroy()
            .then(res.status(204).json({success:true}))
        }
        else{res.status(200).json({failure:true})}
    })
})

module.exports=router