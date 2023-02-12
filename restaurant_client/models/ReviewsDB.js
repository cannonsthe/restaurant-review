"use strict";

var db = require('../db-connection');

class CommentsDB{
    getAllReviews(callback){
        var sql = "SELECT * from restaurant.reviews";
        db.query(sql, callback);
    }

    addReview(reviews, callback){
        var sql = "INSERT INTO reviews (restaurant_id, restaurant_name, reviews, username, rating, review_date) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [reviews.getMovieId(), reviews.getMovie(), reviews.getReview(), reviews.getUsername(), reviews.getRating(), reviews.getDatePosted()], callback);
    }
    updateReview(reviews, callback){
        var sql = "UPDATE reviews SET reviews = ?, rating = ?, review_date = ? WHERE review_id = '?'";
        return db.query(sql, [reviews.getReview(), reviews.getRating(), reviews.getDatePosted(), reviews.getId(), reviews.getUsername()], callback);
    }
    deleteReview(reviewsID, callback){
        var sql = "DELETE from reviews WHERE review_id = ?";
        return db.query(sql, [reviewsID], callback);
    }
}

module.exports = CommentsDB;