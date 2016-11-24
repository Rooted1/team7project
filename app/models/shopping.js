'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = new Date();

var Shopping = new Schema({
    
        username: {
            type: String,
            index: true
        },
         productsId: {
            type: String
        },

        itemQuantity: {
            type: Number
        }
   
});

module.exports = mongoose.model('Shopping', Shopping);



// {% extends 'layout.twig' %}

// {% block body %}
//   <h2 class="page-header">{{title}}</h2>
//   {% if errors %}
//       {% for error in errors %}
//         <div class="alert alert-danger">{{ error.msg }}</div>
//       {% endfor %}
//     <form method="post" action="/product">
//        <div class="wrapper">
//         <div class="row">
//       {% if productList %}
//       {% for prod in productList %}
//         <div class="well">
//                 <img src="">
//                 <label>Product Name:{{prod.local.productName}}</label>
//                 <label>Product Price:{{prod.local.productPrice}}</label>
//                 <label>Product Quantity:{{prod.local.productQuantity}}</label>
//                 <a href="#"><button class="btn">Remove from cart</button></a>
//             </div>
//       {% endfor %}
  
//   {% endif %}
  
//         </div>
//     </div>
//     </form>
//   {% endif %}
  
// {% endblock %}

// 