const express=require('express');
const app=express();
const router=express.Router();
require('dotenv').config();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');
const e = require('express');
const Edits = require('../models/edits')
const UserInfo =require('../models/userInfo');


function getEdits(){
    edit=fs.readFileSync('./data/edits.json')
    return JSON.parse(edit)
}

function getUsers(){
    user=fs.readFileSync('./data/userInfo.json')
    return JSON.parse(user)
}

function findUser(username){
    user=getUsers();
    for(let i=0;i<user.length;i++){
        if(user[i].username===username){
            return user[i]
        }
    }
}

function findEdit(username){
    user=getUsers();
    for(let i=0;i<user.length;i++){
        if(user[i].username===username){
            return user[i].edits
        }
    }
}

function findEvery(edited){
    editContainer=[]
    edit=getEdits()
    for(let i=0;i<edited.length;i++){
        for(let j=0;j<edit.length;j++){
            if(edit[j].id===edited[i]){
                editContainer.push(edit[j])
            }
        }
    }
    return editContainer
}



router.post('/edit',(req,res)=>{
   /* edit=getEdits();
    user=getUsers();
    id=uuidv4()
    const main=req.body
    const mainUser=findUser(main.username)
    newEdit={
        username:main.username,
        title:main.title,
        text:main.text,
        editor:main.editor,
        id:id,
        created:Date.now(),
        likes:0
    }
    if(main.username.length&&main.title.length&&main.text.length&&main.editor.length&&mainUser!==undefined){
        edit.unshift(newEdit)
        fs.writeFileSync('./data/edits.json',JSON.stringify(edit))
        mainUser.edits.unshift(id)
        fs.writeFileSync('./data/userInfo.json',JSON.stringify(user))
        res.status(200).json({success:true})
    }
    else{res.json({failure:true})}*/
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
        likes:0
       })
       .save(null,{method:'insert'})
       .then(edit=>{
           res.status(200).json({success:true})
       })}
       else{res.json({failure:true})}

})

router.get('/edit/:user',(req,res)=>{
   /* edit=getEdits()
    username=req.params.user
    allEdits=findEdit(username)
    everyEdit=findEvery(allEdits)
    res.status(200).json(everyEdit) */
    Edits
    .where({username:req.params.user})
    .fetchAll()
    .then(edit=>{
        res.status(200).json(edit)
    })

})

router.get('/edit/:user/:story',(req,res)=>{
  /*  edit=getEdits()
    username=req.params.user
    story=req.params.story
    allEdits=findEdit(username)
    everyEdit=findEvery(allEdits) 
    storyEdit=everyEdit.filter(element=>element.title===story)
    res.status(200).json(storyEdit)*/

    Edits.where({username:req.params.user}&&{title:req.params.story})
    .fetchAll()
    .then(edit=>{
        res.status(200).json(edit)
    })
})

router.get('/edited/:id',(req,res)=>{
  /*  edit=getEdits()
   single= edit.filter(element=>element.id===req.params.id)
   res.status(200).json(single)*/
   Edits
   .where({id:req.params.id})
   .fetch()
   .then(edit=>{
       res.status(200).json(edit)
   })
})

module.exports=router