var Shopping = require('../models/shopping');

function shoppingController() {
    this.saveUserCartItem = function(username, callback){
       username.save(callback);   
    };
    
    this.getProductById = function(productId, callback){
        Shopping.findById(productId, callback);
    };

    this.getProductByPrice = function(productPrice, callback){
        Shopping.findByPrice(productPrice, callback);
    };
    this.getProductByName = function(username, callback){
        Shopping.findByusername(username, callback);
    };
     this.getListOfProducts = function(callback){
        Shopping.find(callback);
    };
    this.getCartItem = function(callback){
        Shopping.aggregate([{
    $lookup: {
            from: "products",
            localField: "productsId",
            foreignField: "_id",
            as: "itemsPurchased"
        }
}]);
    }
}
// userId,
module.exports = shoppingController;


// var compareCollections = function(){
//     db.shoppings.find().forEach(function(obj1){
//         db.products.find({/*if you know some properties, you can put them here...if don't, leave this empty*/}).forEach(function(obj2){
//             var equals = function(o1, o2){
//                 // here goes some compare code...modified from the SO link you have in the answer.
//             };

//             if(equals(ob1, obj2)){
//                 // Do what you want to do
//             }
//         });
//     });
// };

// db.eval(compareCollections);