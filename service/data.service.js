// database
// import jsonwebtoken
const jwt = require('jsonwebtoken')
db={
    100:{"acno":100,"username":"bino","password":101,"balance":10000,transaction:[]},
    101:{"acno":101,"username":"binoi","password":102,"balance":10000,transaction:[]}
  }

  // register

  const register=(username, acno, pass)=>{
    if(acno in db){
      return {
        status:false,
        message:"already register ...please login",
        statusCode:401
      }

    }
    else{
      // insert in db
      db[acno] = {
        acno,
        username,
        "password":pass,
        "balance": 0,
        transaction:[]}

      }
      console.log(db)
      return {
        status:true,
        message:"register sussessfull",
        statusCode:200
      
    }
  }
    const  login=(acno,pass)=>{
    
  
    if(acno in db){
      if(pass==db[acno]["password"]){
      currentUser = db[acno]["username"]
      currentAcno = acno

      token =jwt.sign({
        currentAcno:acno
      },'supersecretkey12345')
      return {
        status:true,
        message:"login sussesfully",
        statusCode:200,
        currentUser,
        currentAcno,
        token
      }
        
      }
      else{
        return {
          status:false,
          message:"increect password",
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:"user does not exist",
        statusCode:401
      }
    }
      }
      const deposit=(acno,password,amt)=>{
        var amount = parseInt(amt)
        if(acno in db){
          if(password ==db[acno]["password"]){
            db[acno]["balance"]+=amount
            db[acno].transaction.push({
              type:"CREDIT",
              amount:amount
            })
            console.log(db);
            
            return {
              status:true,
              message:amount+"deposite new balance is"+db[acno]["balance"],
              statusCode:200
            }
          }
          else{
            return {
              status:false,
              message:"increect password",
              statusCode:401
            }
          }
        }
        else{
          return {
            status:false,
            message:"user does not exist",
            statusCode:401
          }
        }
      }
     const withdraw=(acno,password,amt)=>{

        var amount=parseInt(amt)
        if(acno in db){
          if(password == db[acno]["password"]){
  
           if (db[acno]["balance"]>amount){
              db[acno]["balance"]-=amount
              db[acno].transaction.push({
                type:"DEBIT",
                amount:amount
              })
              return {
                status:true,
                message:amount+"withdraw new balance is"+db[acno]["balance"],
                statusCode:200
              }            }
            else{
              return {
                status:false,
                message:"insuficant balance",
                statusCode:401
              }            }
  
          }
          else{
            return {
              status:false,
              message:"increect password",
              statusCode:401
            }
          }
        }
        else{
          return {
            status:false,
            message:"user does not exist",
            statusCode:401
          }
        }
  
      }
     const getTransaction=(acno)=>{
       if(acno in db){
         return{
           status:true,
           statusCode:200,
           transaction:db[acno].transaction
         }
       }
       else{
         return{
         status:false,
         message:"user doest not exist!!",
         statusCode:401
       

  
      }
    }
  }
  
    
  // export
  module.exports ={
    register,
    login,
    deposit,
    withdraw,
    getTransaction

  }