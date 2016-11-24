'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Products = new Schema({
    local: {
        productId: {
            type: String
        },
         productName: {
            type: String
        },
        productDesc: {
            type: String
        },
        productPrice: {
            type: Number
        },
        productQuantity: {
            type: Number
        },
        productIsSold: {
            type: Boolean,
            default: false
        },
    },
   
});

module.exports = mongoose.model('Products', Products);