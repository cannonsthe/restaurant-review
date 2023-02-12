"use strict";
var db = require('../db-connection');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "somesecretkey";

class userDB {

    getLoginCredentials(request, respond) { //Login api
        var username = request.body.username;
        var password = request.body.password;
        var msg = "";

        var sql = "SELECT password FROM user WHERE username = ?";

        db.query(sql, [username], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length > 0) {
                    if (password == result[0].password) {
                        msg = "SUCCESS!"
                        var token = jwt.sign(username, secret);
                        respond.json({result:token});
                        console.log(msg);
                    }
                    else {
                        msg = "FAIL!";
                        var value1 = false;
                        respond.json({result:value1})
                        console.log(msg);
                    }
                }
                else {
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                }
            }
        });
    }

    getAllUsers(request, respond) {
        var sql = "SELECT user_id, username, date_joined,profile_pic FROM restaurant.user";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateUserFirstName(request, respond) {

        var userObject = new User(request.params.user_id, request.body.username);

        var sql = "UPDATE restaurant.user SET username = ? WHERE user_id = ?";
        var values = [userObject.getUserName(), userObject.getUserId()];
        var token = request.body.token;
        try {
            var decoded = jwt.verify(token,secret);
            db.query(sql, values, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        } catch (error) {
            respond.json({result:"Invalid"});
        }
        
    }

    updatePassword(request, respond) {
        var userObject = new User(request.params.user_id, request.body.username, request.body.password);

        var sql = "UPDATE restaurant.user SET password = ? WHERE user_id = ?";
        var values = [userObject.getPassword(), userObject.getUserId()];
        var token = request.body.token;
        try {
            var decoded = jwt.verify(token, secret);
            db.query(sql, values, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        } catch (error) {
            respond.json({result:"Invalid"});
        }
        
    }
    deleteuser(request, respond) {
        var userid = request.params.user_id;
        var sql = "DELETE from restaurant.user WHERE user_id = ?";
        try {
            db.query(sql, userid, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        } catch (error) {
            respond.json({result:"Invalid"});
        }
        
    }

    adduser(request, respond) {
        var now = new Date();

        var userObject = new User(request.params.user_id, request.body.username, request.body.password, now.toString().slice(0,24));
        var sql = "INSERT INTO restaurant.user (username, password, date_joined) VALUES(?,?,?)";

        var values = [userObject.getUserName(), userObject.getPassword(), userObject.getDatejoined()];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateuser(request, respond) {

        var userObject = new User(request.params.user_id, request.body.username, request.body.password);

        var sql = "UPDATE restaurant.user SET username = ?, password = ? WHERE user_id = ?";

        var values = [userObject.getUserName(), userObject.getPassword(), userObject.getUserId()];
        try {
            db.query(sql, values, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        } catch (error) {
            respond.json({result:"Invalid"});
        }
        
    }

}
function prepareMessage(msg) {
    var obj = { "message": msg };
    return obj;
}

module.exports = userDB;