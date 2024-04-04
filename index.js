const express = require('express')
const app = express()
const memberRouter = require('./routes/memberRoute')
const bookRouter = require('./routes/bookRoute')
const borrowReturnRoute = require('./routes/borrowReturnRoute')
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("./swagger-output.json")


app.get('/', (req,res)=>{
    res.send("Hello, World")
})
app.use(express.json())

app.use('/', memberRouter)
app.use('/', bookRouter)
app.use('/', borrowReturnRoute)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(4444, ()=>{
    console.log('port 4444')
})