"use strict";

const { request } = require('express');
//refernce the connection file and make a connection to mysql
var db = require('../db-connection');

class RestaurantDB{

    //create a function to get All restaurants
    getAllRestaurants(callback){
        var sql = "SELECT * from restaurant.restaurant";
        db.query(sql, callback);
    }
    //Function to get one restaurant details by its name
    getRestaurant(restid, callback){
        var sql = "SELECT * FROM restaurant.restaurant WHERE restaurant_name = ?";
        db.query(sql,restid, callback);
    }
    //Function to sort restaurants by location
    getLocation(locid, callback){
        var sql = "SELECT * FROM restaurant.restaurant WHERE restaurant_location = ?";
        db.query(sql,locid, callback);
    }
}

module.exports = RestaurantDB;