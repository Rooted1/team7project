'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = new Date();

var Review = new Schema({
    local:  { 
         username: {
            type: String,
            index: true
        },
         Review: {
            type: String
        },
    },
   
});

module.exports = mongoose.model('Review', Review);