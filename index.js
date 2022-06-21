// server creation

// import expresss


const express = require('express');
const res = require('express/lib/response');
const jwt=require('jsonwebtoken')

const dataSrevice = require('./service/data.service')


// const res = require('express/lib/response');

// server app creation  using express

const app = express()

// parse json data
app.use(express.json())

//application  
const appMiddleware =(req,res,next)=>{
    console.log("application  middleware");
    next()
}
// user in app
app.use(appMiddleware)

//bank server
const jwtMiddleware = (req,res,next)=>{
    //fetch token
    try{
        token = req.headers['x-access-token']
        //verify token
        const data = jwt.verify(token,'supersecretkey12345')
        console.log(data);
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            massage:'please login'
        })
    }
}


//bank server
// register
app.post('/register',(req,res)=>{
    // register solving
    console.log(req.body);
   const result = dataSrevice.register(req.body.username,req.body.acno,req.body.pass)
   res.status(result.statusCode).json(result)

})



app.post('/login',(req,res)=>{
    // register solving
   const result = dataSrevice.login(req.body.acno,req.body.pass)
   res.status(result.statusCode).json(result)

})
app.post('/deposit',jwtMiddleware,(req,res)=>{
    // register solving
   const result = dataSrevice.deposit(req.body.acno,req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)

})
app.post('/getTransaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    // register solving
   const result = dataSrevice.getTransaction(req.body.acno)
   res.status(result.statusCode).json(result)

})
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    // register solving
   const result = dataSrevice.withdraw(req.body.acno,req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)

})



// user request revsolving


//get result // to fetch data
app.get('/',(req,res)=>{
    res.send("get requset")
})

//post resqust //to create data
app.post('/',(req,res)=>{
    res.send("post requset")
})

// put requst // to modifly enter dats

app.put('/',(req,res)=>{
    res.send("put requset")
})

//patch requset // to modeflyy patchally

app.patch('/',(req,res)=>{
    res.send("patch requset")
})

// delete // to remove or delete data

app.delete('/',(req,res)=>{
    res.send("delete requset")
})



// set up the port number to the servr app

 app.listen(3000,()=>{
     console.log("server started at 3000");
 })