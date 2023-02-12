"use strict";

class Comment {
    constructor(review_id, restaurantid, restaurantname, review, username, rating, dateposted, userid) {
        this.review_id = review_id;
        this.restaurantid = restaurantid;
        this.restaurantname = restaurantname;
        this.review = review;
        this.username = username;
        this.userid = userid;
        this.rating = rating;
        this.dateposted = dateposted;
    }

    getId() {
        return this.review_id;
    }

    getMovieId() {
        return this.restaurantid;
    }

    getMovie() {
        return this.restaurantname;
    }

    getReview() {
        return this.review;
    }

    getUsername() {
        return this.username;
    }

    getRating() {
        return this.rating;
    }

    getDatePosted() {
        return this.dateposted;
    }

    setUserId(userid) {
        this.userid = userid;
    }

    setRestaurant(restaurantname) {
        this.restaurantname = restaurantname;
    }

    setReview(review) {
        this.review = review;
    }

    setUsername(username) {
        this.username = username;
    }

    setRating(rating) {
        this.rating = rating;
    }

    setDatePosted(dateposted) {
        this.dateposted = dateposted;
    }
}

module.exports = Comment;