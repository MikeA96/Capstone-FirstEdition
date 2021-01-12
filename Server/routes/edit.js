const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const e = require('express');
const Edits = require('../models/edits')
const UserInfo =require('../models/userInfo');





router.post('/edit',(req,res)=>{
   
    const main=req.body
    const newId=uuidv4()
    mainUser=UserInfo.where({username:main.username}).fetch();
    if(main.username.length&&main.title.length&&main.text.length&&main.editor.length&&mainUser!==null){
       new Edits({
        username:main.username,
        title:main.title,
        text:main.text,
        editor:main.editor,
        id:newId,
        likes:'[]'
       })
       .save(null,{method:'insert'})
       .then(edit=>{
           res.status(200).json({success:true})
       })}
       else{res.json({failure:true})}

})
router.post('/edit/like/:id',(req,res)=>{
    Edits
    .where({id:req.params.id})
    .fetch()
    .then(edit=>{
        first=JSON.parse(JSON.stringify(edit))
        second=JSON.parse(first.likes)
        mainFind=second.findIndex((element)=>element===req.body.username)
        if(mainFind===-1){
            second.push(req.body.username)
            Edits
            .where({id:req.params.id})
            .save({id:first.id,likes:JSON.stringify(second)},{method:'update',require:true,patch:true})
            .then(edit=>{
                UserInfo
                .where({username:first.editor})
                .fetch()
                .then(user=>{
                    userFirst=JSON.parse(JSON.stringify(user))
                    UserInfo
                    .where({username:first.editor})
                    .save({username:userFirst.username,editLikes:userFirst.editLikes+1},{method:'update',require:true,patch:true})
                    .then(finalUser=>{
                        finalFind=JSON.parse(JSON.stringify(finalUser))
                        Edits
                        .where({id:req.params.id})
                        .save({id:req.params.id,editorLikes:finalFind.editLikes},{method:'update',require:true,patch:true})
                        .then(finalEdit=>{
                            res.status(200).json(finalEdit)
                        })
                    })
                })
            })
        }
        else{res.status(200).json({failure:true})}
    })
})
router.delete('/edit/like/:id',(req,res)=>{
Edits
.where({id:req.params.id})
.fetch()
.then(edit=>{
    first=JSON.parse(JSON.stringify(edit))
    second=JSON.parse(first.likes)
    mainFind=second.findIndex((element)=>element===req.body.username)
    second.splice(mainFind,1)
    Edits
    .where({id:req.params.id})
    .save({id:first.id,likes:JSON.stringify(second)},{method:'update',require:true,patch:true})
    .then(info=>{
        UserInfo
        .where({username:first.editor})
        .fetch()
        .then(user=>{
                userFirst=JSON.parse(JSON.stringify(user))
                UserInfo
                .where({username:first.editor})
                .save({username:first.editor,editLikes:userFirst.editLikes-1},{method:'update',require:true,patch:true})
                .then(editor=>{
                    final=JSON.parse(JSON.stringify(editor))
                    Edits
                    .where({id:req.params.id})
                    .save({id:first.id,editorLikes:final.editLikes},{method:'update',require:true,patch:true})
                    .then(final=>{
                        res.status(200).json(final)
                    })
                })
        })
    })
})
})

router.get('/edit/:user',(req,res)=>{
   
    Edits
    .where({username:req.params.user})
    .fetchAll()
    .then(edit=>{
        res.status(200).json(edit)
    })

})

router.get('/edit/:user/:story',(req,res)=>{

    Edits
    .where({username:req.params.user}&&{title:req.params.story})
    .fetchAll()
    .then(edit=>{
        first=JSON.parse(JSON.stringify(edit))
        for(let i=0;i<first.length;i++){
            UserInfo
            .where({username:first[i].editor})
            .fetch()
            .then(user=>{
               second= JSON.parse(JSON.stringify(user))
               if(first[i].editorLikes!==second.editLikes){
               Edits
               .where({id:first[i].id})
               .save({id:first[i].id,editorLikes:second.editLikes},{patch:true})
            }})
        }
    }).then(
        Edits
        .query({where:{username:req.params.user}&&{title:req.params.story}})
        .query('orderBy','likes')
        .fetchAll()
        .then(edits=>{
            res.status(200).json(edits)
        })
    )
})

router.get('/edited/:id',(req,res)=>{
   Edits
   .where({id:req.params.id})
   .fetch()
   .then(edit=>{
       res.status(200).json(edit)
   })
})

router.delete('/edit/:id',(req,res)=>{
const {username}=req.body
Edits
.where({id:req.params.id})
.fetch()
.then(edit=>{
    mainFind=JSON.parse(JSON.stringify(edit))
    if(mainFind.username===username){
        Edits
        .where({id:req.params.id})
        .destroy()
        .then(res.status(204).json({success:true}))
    }
    else{res.status(200).json({failure:true})}
})
})

module.exports=router