const express = require('express')

const route = express.Router()

route.get('/',(req,res)=>{
    res.send("This is the Contact Page")
})

module.exports = route