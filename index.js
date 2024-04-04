const express = require('express')
const app = express()
const memberRouter = require('./routes/memberRoute')
const bookRouter = require('./routes/bookRoute')
const borrowReturnRoute = require('./routes/borrowReturnRoute')


app.get('/', (req,res)=>{
    res.send("Hello, World")
})
app.use(express.json())

app.use('/', memberRouter)
app.use('/', bookRouter)
app.use('/', borrowReturnRoute)

app.listen(4444, ()=>{
    console.log('port 4444')
})