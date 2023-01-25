//server creation

//1 import express
const { request } = require('express')
const express = require('express')

//import dataservices

const dataService = require('./Services/data.service')

//import cors
const cors = require('cors')



//import jwt
const jwt =require('jsonwebtoken')

//2 create an App using the express

const app = express()
//To parse json from request body
app.use(express.json())

//Give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080']
}))


//3 create a port number

app.listen(3000,() => {
    console.log('listening on port 3000');
})
//Application specific middleware
const appMiddleware =(req,res,next)=>{

    console.log('Application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
    try{
    console.log('Router specific middleware');
    const token=req.headers['x-access-token']//akdjeskedxndehjdskwkaqlmuje455
    const data=jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'Please login first'
    })
}
}


//4 Resolving HTTP request
//get,post,put,patch,delete

//Resolving get request

// app.get('/',(req,res)=>{
//     res.send('Get request')
// })

// //Resolving post request
// app.post('/',(req,res)=>{
//     res.send('post request')
// })

// //Resolving put request
// app.put('/',(req,res)=>{
//     res.send('put request')
// })

// //Resolving patch request
// app.patch('/',(req,res)=>{
//     res.send('patch request')
// })

// //Resolving delete request
// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })

//API request
//registration request

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)//data
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    
    // if(result){
    // res.send('register successful')
    // }
    // else{
    //     res.send('user already exist')   
    // }
})
// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)//access
    .then(result=>{

    
    res.status(result.statusCode).json(result);
})
})
//deposit request
app.post('/deposite',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposite(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    
})
//withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result);
    })
})
//transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
    res.status(result.statusCode).json(result);
    })
})
//delete request

app.delete('/deleteAcc/:acno',(req,res)=>{
    
    dataService.deleteAcc(req.params.acno)//access
    .then(result=>{
       
        res.status(result.statusCode).json(result);
        })
})
