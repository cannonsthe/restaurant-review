"use strict";

//The express framework is built on top of the node. js framework and helps in fast-tracking development of server-based applications
const express = require("express");
const bodyParser = require("body-parser");
const restaurantController = require('./controllers/restaurantController');
const reviewController = require('./controllers/reviewController');
const userController = require('./controllers/userController');
const locationController = require('./controllers/locationController');
var cors = require('cors');

var app = express();
var host = "127.0.0.1";
var port = 8080;

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static("./public"));
 app.use(cors());

//To get inputs sent in the body of the request, we need to use the body-parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Different routes for get all restaurants, get by name or id
app.route('/restaurants').get(restaurantController.getAllRestaurants);
app.route('/restaurant/:restaurant_name').get(restaurantController.getRestaurant);
app.route('/restauranto/:restaurant_location').get(restaurantController.getLocation);



userController.routeUsers(app);
locationController.routeLocations(app);
// Different routes for get all reviews, post reviews, delete and update.
app.route('/reviews').get(reviewController.getAllReviews);
app.route('/reviews').post(reviewController.addReview);
app.route('/reviews/:review_id').put(reviewController.updateReview);
app.route('/reviews/:review_id').delete(reviewController.deleteReview);




//This app starts a server and listens on port 8080 for connection
var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example Apps listen at http://%s:%s", host, port);
});