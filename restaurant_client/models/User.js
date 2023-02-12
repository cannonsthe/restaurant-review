"use strict"

class users{
    constructor(user_id, username, password, date_joined){
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.date_joined = date_joined;
        //this.pfp = pfp;
    }
    getUserId(){
        return this.user_id;
    }
    getUserName(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    getDatejoined(){
        return this.date_joined;
    }
    //getPfp(){
    //    return this.pfp;
    //}
}
    module.exports = users;