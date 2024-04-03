const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Hello, World")
})

app.listen(4444, ()=>{
    console.log('port 4444')
})