const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

const Post = module.exports = mongoose.model('POSTS',postSchema)

module.exports.getPosts = (callback,limit)=>{
    Post.find(callback).limit(limit)
} 

module.exports.getSpecificPost = (id,callback)=>{
    Post.findById(id,callback)
} 

module.exports.addPost = (post,callback)=>{
    Post.create(post,callback)
} 

module.exports.updatePost = (id,newpost,option,callback)=>{
    const query = {_id:id}
    const updated = {
        title:newpost.title,
        description:newpost.description
    }
    Post.findOneAndUpdate(query,updated,option,callback)
} 
module.exports.deletePost = (id,callback)=>{
    const query = {_id:id}
    Post.remove(query,callback)
}
