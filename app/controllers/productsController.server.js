var products = require('../models/products');

var shopping = require('../models/shopping');

function productController () {
   
    this.createProduct = function(newProduct, callback){
        newProduct.save(callback);   
    };
    this.getProductById = function(productId, callback){
        products.findById(productId, callback);
    };
    this.getProductByName = function(productName, callback){
        var query = {"local.productName": productName}
        products.findOne(query, callback);
    };
    this.getListOfProducts = function(callback){
        products.find(callback);
    };
    this.addToCart = function(newItem, callback){
        newItem.save(callback);
    }; 
};    


module.exports = productController;
