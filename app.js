const express = require('express')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')

const app = express()

const aboutRoutes = require('./routes/about')
const contactRoute = require('./routes/contact')
const postRoute = require('./routes/post')
// MiddleWares
app.use(bodyParser.json())
app.use('/about', aboutRoutes )
app.use('/contact', contactRoute)
app.use('/post',postRoute)

Post = require('./models/Post')

app.get('/',(req,res)=>{
    res.send("<h1>Hello There</h1>")
})
app.get('/about',(req,res)=>{
    res.send("<h1>This is the about page</h1>")
})

// database connection

mongoose.connect("mongodb://localhost/store",{useNewUrlParser:true},()=>console.log("Connected to Db"))
const db = mongoose.connection

// Get all Posts

app.get('/api/posts',(req,res)=>{
    Post.getPosts((err,posts)=>{
        if(err)
            throw err
        res.json(posts)
        //console.log(posts)
    })
})

// Get Specific Post

app.get('/api/posts/:id',(req,res)=>{
    Post.getSpecificPost(req.params.id,(err,post)=>{
        if(err) throw err
        res.json(post)
    })
})

// Add a post

app.post('/api/posts',(req,res)=>{
    const pos = req.body
    Post.addPost(pos,(err,post)=>{
        if(err) throw err
        res.json(post)
    })
})


// Update a Post

app.put('/api/posts/:id',(req,res)=>{
    const id = req.params.id
    const pos = req.body
    Post.updatePost(id,pos,{},(err,post)=>{
        if(err) throw err
        res.json(post)
    })
})

app.delete('/api/posts/:id',(req,res)=>{
    const id = req.params.id
    Post.deletePost(id,(err,post)=>{
        if(err) throw err
        res.json(post)
    })
})
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("Server Started on Port ",PORT)
})