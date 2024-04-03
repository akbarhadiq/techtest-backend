const express = require('express')
const app = express()
const memberRouter = require('./routes/memberRoute')


app.get('/', (req,res)=>{
    res.send("Hello, World")
})
app.use(express.json())
app.use('/', memberRouter)

app.listen(4444, ()=>{
    console.log('port 4444')
})