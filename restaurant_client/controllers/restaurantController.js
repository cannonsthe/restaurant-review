"use strict";
const RestaurantDB = require('../models/RestaurantDB');

var restaurantDB = new RestaurantDB();

function getAllRestaurants(request, respond){

    restaurantDB.getAllRestaurants(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function getRestaurant(request, respond){
    var restid = request.params.restaurant_name;
    restaurantDB.getRestaurant(restid, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function getLocation(request, respond){
    var nameloc = request.params.restaurant_location;
    restaurantDB.getLocation(nameloc, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

module.exports = {getAllRestaurants, getRestaurant, getLocation}; //allows this function to be used by other classes