var CheckOut = require('../models/checkOut');

function checkoutController() {
     
    this.getProductById = function(productId, callback){
        CheckOut.findById(productId, callback);
    };
    this.getProductByName = function(productName, callback){
        CheckOut.findByName(productName, callback);
    };
    
}