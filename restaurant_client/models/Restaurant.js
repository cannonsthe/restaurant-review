"use strict";
class Restaurant {
constructor(restaurantid, restaurantname, restaurantimages, location, cuisine, openclose, telephone) {
    this.restaurantid = restaurantid;
    this.restaurantname = restaurantname;
    this.restaurantimages = restaurantimages;
    this.location = location;
    this.cuisine = cuisine;
    this.openclose = openclose;
    this.telephone = telephone;
}
//add the get methods here}
getId() {
    return this.restaurantid;
}
getName() {
    return this.restaurantname;
}
getImages() {
    return this.restaurantimages;
}
getLocation() {
    return this.location;
}
getCuisine() {
    return this.cuisine;
}
getOpenclose() {
    return this.openclose;
}
getNumber() {
    return this.telephone;
}

}module.exports = Restaurant;
