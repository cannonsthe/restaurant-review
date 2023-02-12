"use strict";
var db = require('../db-connection');
const Location = require('../models/Location');

class LocationDB{
    
    getLocationRest(request, respond){
        var locationId = request.params.location_name;
        var sql = "SELECT restaurant.location.location_name, restaurant_name FROM restaurant.location LEFT OUTER JOIN restaurant.restaurant ON restaurant.location.location_id = restaurant.restaurant.location_id WHERE restaurant.location.location_id = ?;"

        db.query(sql, locationId, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });

    }

}

module.exports = LocationDB;