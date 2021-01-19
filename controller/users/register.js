
const connection = require('../../database/db_connection')
const bcrypt = require('bcryptjs')

const registerGetController = (req, res) => {

  res.render('reg.ejs')
    //res.send('registered successfully')
  }

const registerPostController = (req, res) => {
    //      DATABASE   CODE
  
    // take variables from submitted form and enter them to database [DONE]
    // check if email or user is taken
  
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
  
  var hashed_password = bcrypt.hashSync(password, 8);
  console.log('password user entered: ' + password)
  console.log('hashed password by bcrypt: ' + hashed_password)
  
  var post = {username: username, password: hashed_password, email: email}
    var sql = 'INSERT INTO users SET ?' // need to find a way of inserting..
    connection.query(sql, post, (err, result, fields) => {
      if(err) {
  
  
        if(err.sqlMessage === `Duplicate entry '${username}' for key 'username'`)
          res.send('User exists')
  
        else if(err.sqlMessage === `Duplicate entry '${email}' for key 'email'`)
          res.send('Email exists')     // this causes an error idk why.
  
      }
  
      else {           //NOTE: you can't send 2 things like in /testshit
         res.send('done')
      }
  
    //  res.send('done')    // no error ? !
  
  })          //DONE
  }
module.exports = {registerPostController, registerGetController}