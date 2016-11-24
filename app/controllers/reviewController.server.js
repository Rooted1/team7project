var Review = require('../models/review');

function reviewController() {
    
    
    this.getUserByUsername = function (username, callback) {
        var query = {"local.username": username};
        Review.findOne(query, callback);
    };
    
}