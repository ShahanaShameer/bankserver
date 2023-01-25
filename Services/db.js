//server - mongodb integration

//1 import mongoose
const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
//2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    usenewUrlParser:true //to avoid unwanted warnings
});

//3 Define Bank db model

const User=mongoose.model('User',
{
    //schema creation
    acno:Number,
    username:String,
    pswd:String,
    balance:Number,
    transaction:[]
});

//export collection

module.exports={
    User
}