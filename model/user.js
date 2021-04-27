const sql = require("../util/db_connection");
const auth = require("../app/auth/authutil")
const constant = require("../app/constant/string_constant")

const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.active = user.active;
  };

  // Insert New user Record in the table
  User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  // Login user by email and password
  User.login = (email,password, result) => {
      sql.query(`select * from users where active = "1" and email = "${email}" and password = "${password}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        // Check user is already logged in or not...
        if(res[0].islogin===0){
          var update_query = "UPDATE users SET islogin = '1' WHERE id = "+res[0].id;
          sql.query(update_query, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + constant.RECORD_UPDATED);
          });
        }
        else { 
            result(null, {status:400, message: constant.ALREADY_LOGGED_IN });
            return;
        }

        res[0].token = auth.generateJWTToken(res[0]) 
        res[0].statusCode = 200
        res[0].message = constant.SUCCESS 
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({statusCode:400, message: constant.USER_NOT_FOUND }, null);
    });
  };

  // Fetch all users
  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };

  // update islogin status to 0
  User.logout = (email,password, result) => {
    sql.query(`select * from users where email = "${email}" and password = "${password}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // Check user is already logged in or not...
      if(res[0].islogin===1){
        var update_query = "UPDATE users SET islogin = '0' WHERE id = "+res[0].id;
        sql.query(update_query, function (err, queryResult) {
          if (err) throw err;
          console.log(result.affectedRows + constant.RECORD_UPDATED);
          result(null, {status:200, message:  constant.LOGG_OUT });
          return;
        });
      }
      else { 
          result(null, {status:400, message: constant.NOT_LOGGED_IN });
          return;
      }

      res[0].statusCode = 200
      res[0].message =constant.SUCCESS
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ statusCode:400, message: constant.USER_NOT_FOUND }, null);
  });
};

  module.exports = User;