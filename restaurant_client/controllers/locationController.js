"use strict"

const locationdb = require('../models/LocationDB');

var LocationDBObject = new locationdb();

function routeLocations(app){
    app.route('/restaurants/:location_name').get(LocationDBObject.getLocationRest);
}
module.exports = {routeLocations};