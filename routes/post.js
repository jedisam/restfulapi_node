const express = require('express')
const Post = require('../models/Post')

const route = express.Router()
// get all posts
route.get('/',async(req,res)=>{
    // res.send("This is the Post Page")
    try{
        const posts = await Post.find().limit(5)
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})
//Submit a post
route.post('/',(req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    })
    post.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
})

// get a specific Post
route.get('/:postId',async (req,res)=>{
    try{
        const posts = await Post.find({_id:req.params.postId}) 
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})

// Delete a specific Post

route.delete('/:postId', async (req,res)=>{
    try{
        const removed = await Post.deleteOne({_id:req.params.postId})
        res.json(removed)
    }catch(err){
        res.json({message:err})
    }
   
})

// Update a specific Post
route.patch('/:postId',async (req,res)=>{
    try{
        const UpdatedPosts = await Post.updateOne({_id:req.params.postId},{$set:{title:req.body.title}}) 
        res.json(UpdatedPosts)   
    }catch(err){
        res.json({message:err})
    }
    
})

module.exports = route