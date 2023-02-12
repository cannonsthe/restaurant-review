"use strict"

const userdb = require('../models/userDB');

var usersDBObject = new userdb();

function routeUsers(app){
    app.route('/login')
        .post(usersDBObject.getLoginCredentials)
    app.route('/getallusers')
        .get(usersDBObject.getAllUsers);
    app.route('/updatename/:user_id')
        .put(usersDBObject.updateUserFirstName);
    app.route('/updatepassword/:user_id')
        .put(usersDBObject.updatePassword);
    app.route('/deleteuser/:user_id')
       .delete(usersDBObject.deleteuser);
    app.route('/deleteuser')
       .delete(usersDBObject.adduser);
    app.route('/updateuser/:user_id')
       .put(usersDBObject.updateuser);
    app.route('/adduser')
       .post(usersDBObject.adduser);
}
module.exports = {routeUsers};