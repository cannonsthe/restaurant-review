"use strict";
class Location {
constructor(locationid, location_name,) {
    this.locationid= locationid;
    this.location_name = location_name;
}
//add the get methods here
getLocationId() {
    return this.idLocations;
}
getRestaurants() {
    return this.location_name;
}


}module.exports = Location;