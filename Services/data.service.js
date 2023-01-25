//import JWT
const jwt = require('jsonwebtoken');
//import db
const db = require('./db.js');
//database
userDetails = {
  1000: { acno: 1000, username: "Amal", password: 1000, balance: 1000, transaction: [] },
  1001: { acno: 1001, username: "Arjun", password: 1001, balance: 1000, transaction: [] },
  1002: { acno: 1002, username: "Maya", password: 1002, balance: 1000, transaction: [] },
}

const register = (acno, username, password) => {
  return db.User.findOne({ acno })//data
    .then(user => {
      if (user) {
        return {
          status: 'false',
          statusCode: 400,
          message: 'User already registered'

        }
      }

      else {

        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: []
        })
        newUser.save();//data saved in mongodb
        return {
          status: 'true',
          statusCode: 200,
          message: 'Register successful'
        }


      }
    })
}
const login = (acno, pswd) => {
  return db.User.findOne({ acno, password: pswd })//data
    .then(user => {
      if (user) {
        currentUser = user.username
        currentAcno = acno
        const token = jwt.sign({ currentAcno: acno }, 'superkey2022')
        return {
          status: 'true',
          statusCode: 200,
          message: 'Login successful',
          token: token,
          currentUser: currentUser,
          currentAcno: acno
        }
      }
      else {
        return {
          status: 'false',
          statusCode: 400,
          message: 'Invalid userdetails'

        }
      }
    })
}
// if (acno in userDetails) {
//   if (pswd == userDetails[acno]['password']) {
//     currentUser = userDetails[acno]['username']
//     currentAcno = acno;
//     const token=jwt.sign({
//       currentAcno:acno},
//       'superkey2022')//To generate token
//       //it will generate a number and it assign to token 
//       return {
//       status: 'true',
//       statusCode: 200,
//       message: 'Login successful',
//       token:token
//     }

//   }
//   else {
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'Pasword Incorrect'

//     }
//   }
// }

const deposite = (acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })//data
    .then(user => {
      if (user) {
        user.balance += amount;
        user.transaction.push({
          Type: 'Credit',
          Amount: amount
        })
        user.save();
        return {
          status: 'true',
          statusCode: 200,
          message: `${amount} is credited and balance is ${user.balance}`
        }
      }
      else {
        return {
          status: 'false',
          statusCode: 400,
          message: 'Incorrect userdetails'

        }
      }
    })
}

//   if (acno in userDetails) {
//     if (pswd == userDetails[acno]['password']) {
//       userDetails[acno]['balance'] += amount;
//       userDetails[acno]['transaction'].push({
//         Type: 'Credit',
//         Amount: amount
//       })
//       return {
//         status: 'true',
//         statusCode: 200,
//         message: `${amount} is credited and balance is ${userDetails[acno]['balance']}`
//       }
//       // console.log(userDetails);

//       // return userDetails[acno]['balance']
//     }
//     else {
//       // alert('password mismatch')
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'Pasword Incorrect'

//       }
//     }
//   }
//   else {
//     //   alert('invalid data')
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'Invalid userdetails'

//     }
//   }
// }

const withdraw = (acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })//data
    .then(user => {
      if (user) {
        if (user.balance > amount) {
          user.balance -= amount;
          user.transaction.push({
            Type: 'Dedit',
            Amount: amount
          })
          user.save()
          return {
            status: 'true',
            statusCode: 200,
            message: `${amount} is debited and balance is ${user.balance}`
          }
        }
        else {
          //   alert('Transaction failed')
          return {
            status: 'false',
            statusCode: 400,
            message: 'Invalid userdetails'
          }

        }
      }
    })
}

//   if (acno in userDetails) {
//     if (pswd == userDetails[acno]['password']) {
//       if (userDetails[acno]['balance'] > amount) {
//         userDetails[acno]['balance'] -= amount;
//         userDetails[acno]['transaction'].push({
//           Type: 'Dedit',
//           Amount: amount
//         })
//         return {
//           status: 'true',
//           statusCode: 200,
//           message: `${amount} is debited and balance is ${userDetails[acno]['balance']}`
//         }
//       }
//       else {
//         //   alert('Transaction failed')
//         return {
//           status: 'false',
//           statusCode: 400,
//           message: 'Transaction failed'
//         }

//       }
//     }
//     else {
//       //   alert('password mismatch')
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'password mismatch'
//       }
//     }


//   }
//   else {
//     //   alert('invalid data')
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'invalid data'
//     }
//   }
// }
const getTransaction = (acno) => {
  return db.User.findOne({ acno })//data
    .then(user => {
      if (user) {
        return {
          status: 'true',
          statusCode: 200,
          transaction: user.transaction //details of transaction
        }

      }
      else {
        //   alert('Transaction failed')
        return {
          status: 'false',
          statusCode: 400,
          message: 'User not found'
        }

      }
    })
}
//To delete an account
const deleteAcc = (acno) => {
  return db.User.deleteOne({ acno })
    .then(user => {
      if (user) {
        return {
          status: 'true',
          statusCode: 200,
          message: 'User deleted successfully' //details of transaction
        }

      }
      else {
        return {
          status: 'false',
          statusCode: 400,
          message: 'User not found'
        }
      }
    })

}














module.exports = {
  register,
  login,
  deposite,
  withdraw,
  getTransaction,
  deleteAcc
}

