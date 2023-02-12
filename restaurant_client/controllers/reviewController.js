"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');

var reviewsDB = new ReviewsDB();

function getAllReviews(request, respond){
    reviewsDB.getAllReviews(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addReview(request, respond){
    var now = new Date()
    var review = new Review(null, request.body.restaurant_id, request.body.restaurant_name, request.body.reviews, request.body.username, request.body.rating, now.toString().slice(0,24));
    reviewsDB.addReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function updateReview(request, respond){
    var now = new Date();
    var review = new Review(parseInt(request.params.review_id), request.body.restaurant_id, request.body.restaurant_name, request.body.reviews, request.body.username, request.body.rating, now.toString().slice(0,24));
    reviewsDB.updateReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function deleteReview(request, respond){
    var reviewID = request.params.review_id;
    reviewsDB.deleteReview(reviewID, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}


module.exports = {getAllReviews,addReview,updateReview,deleteReview};