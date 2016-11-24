var Purchase = require('../models/purchase');

function purchaseController() {
    
    this.getUserByUsername = function(username, callback){
       username.save(callback);   
    };
    
    this.getProductById = function(productId, callback){
        Purchase.findById(productId, callback);
    };

    this.getProductByPrice = function(productPrice, callback){
        Purchase.findByPrice(productPrice, callback);
    };
}