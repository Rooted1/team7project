'use strict';

var path = process.cwd();
var userController = require(path + '/app/controllers/userController.server.js');
var productController = require(path + '/app/controllers/productsController.server.js');
var shoppingController = require(path + '/app/controllers/shoppingController.server.js');
var User = require(path + '/app/models/users.js');
var Product = require(path + '/app/models/products.js');
var Shopping = require(path + '/app/models/shopping.js');
// var shoppingCart = (path + '/app/controllers/shoppingController.server.js')
// var cookieModule = require(path + '/app/codeBase/cookie.js');
// console.log(cookieModule);
module.exports = function (app, passport) {
	var userCtrl = new userController();
	var productCtrl = new productController();
	var shoppingCtrl = new shoppingController();
	// var cookieCtrl = new cookieModule(); 
	// console.log(cookieCtrl);

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} 

		// otherwise redirect to login
		res.redirect('/login');
	}

	function isLoggedInAsAdmin (req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.local.isAdmin || req.user.local.isAdmin) {
	        	return next();
	    	}
	    }

    	// otherwise redirect to index
	    req.flash('error_msg', 'Unauthorised access');
	    res.redirect('/');
	}
	


	app.route('/')
		.get(function (req, res) {
			// console.log(cookieCtrl.SupplyCookie());
			res.render('index', { title:'clementine.js'});
		});

	app.route('/login')
		.get(function (req, res) {
			// res.sendFile(path + '/public/login.html');
			res.render('login', { title:'Account Login'});
		})
		.post(passport.authenticate('local',  {successRedirect: '/profile',
                                   failureRedirect: '/login',
                                   failureFlash: true }),
			function(req, res) {
			    // If this function gets called, authentication was successful.
			    // `req.user` contains the authenticated user.
			    req.flash('success_msg', 'You have been successfully logged in');
			    res.redirect('/profile');
			}
		);

	app.route('/register')
		.get(function (req, res) {
			res.render('register', { title:'Register'});
		})
		.post(function (req, res) {
			var name = req.body.name;
		    var username = req.body.username;
		    var email = req.body.email;
		    var password = req.body.password;

		    // Validation
		    req.checkBody('name', 'Name is required').notEmpty();
		    req.checkBody('email', 'Email is required').notEmpty();
		    req.checkBody('email', 'Email is not valid').isEmail();
		    req.checkBody('username', 'Username is required').notEmpty();
		    req.checkBody('password', 'Password is required').notEmpty();
		    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

		    var errors = req.validationErrors();

		    if (errors) {
		        res.render('register', {
		            errors: errors
		        });
		    } else {
		        var newUser = new User();

		        newUser.local.name = name;
		        newUser.local.username = username;
		        newUser.local.email = email;
		        newUser.local.password = password;
		        newUser.local.isAdmin = false;

		        userCtrl.createUser(newUser, function (err) {
		            if (err) throw err;

		            req.flash('success_msg', 'You are registered and can now login');

		            res.redirect('/login');
		        });
		    }
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render('profile', {title: 'User Profile', user: req.user });
		});

	app.route('/auth/google')
		.get(passport.authenticate('google', { scope : ['profile', 'email'] }));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		}));

	app.route('/admin')
		.get(isLoggedInAsAdmin, function(req, res) {
			res.render('admin', { title: 'Dashboard' });
	});
	
	app.route('/product')
		.get(function(req, res) {
			res.render('product', { title: 'Products' });
		})
		.post(function (req, res) {
			var productName = req.body.productName;
		    var productDesc = req.body.productDesc;
		    var productPrice = req.body.productPrice;
		    var productQuantity = req.body.productQuantity;
		    var productIsSold = req.body.productIsSold;

		    // Validation
		    req.checkBody('productName', 'Product name is required').notEmpty();
		    req.checkBody('productDesc', 'Product description is required').notEmpty();
		    req.checkBody('productPrice', 'Product price is not valid').notEmpty();
		    req.checkBody('productQuantity', 'Product quantity is required').notEmpty();
		    // req.checkBody('productIsSold', 'If product is sold is required').notEmpty();
		   
		    

		    var errors = req.validationErrors();

		    if (errors) {
		        res.render('product', {
		            errors: errors
		        });
		    } else {
		        var newProduct = new Product();

		        newProduct.local.productName = productName;
		        newProduct.local.productDesc = productDesc;
		        newProduct.local.productPrice = productPrice;
		        newProduct.local.productQuantity = productQuantity;
		        // newProduct.local.productIsSold = productIsSold;
		       
		        productCtrl.createProduct(newProduct, function (err) {
		            if (err) throw err;

		            req.flash('success_msg', 'You have successfully input a product');
		            res.location('/');
		            res.redirect('/product');
		        });
		    }
		});
		
	app.route('/productCatalog')
		.get(isLoggedIn, function(req, res) {
			productCtrl.getListOfProducts(function(err, productList) {
				if (err) {
					console.log(err);
			}
			res.render('productCatalog', { title: 'Product Catalog', productList: productList });
		});
			
	});

	app.route('/shoppingCart')
		.get(function(req, res) {
			shoppingCtrl.getListOfProducts(function (err, shoppingList){
				// console.log(shoppingList);
				
				var jArrays = [];
				// console.log(JSON.stringify(shoppingList[0]));
				// var jsonFormat = JSON.stringify(shoppingList);
				// console.log(jsonFormat);
				// console.log(shoppingList);

				// for(var key in jsonFormat){
				// 	// if(jsonFormat.hasOwnProperty(_id)){
				// 	// 	// console.log(key);
				// 	// 	console.log(jsonFormat[_id]);
				// 	// }
				// 	console.log(key);
				// // console.log(jsonFormat[key]);
					
				// }

				for(var key in shoppingList){
				// 	// if(shoppingList.hasOwnProperty('_id')){
				// 	// 	// console.log(key);
				// 	// 	console.log(shoppingList['_id']);
				// 	// }
					// console.log(shoppingList[key]);
					var shoppedItems = shoppingList[key];
					// console.log(Object.keys(shoppedItems).indexOf('$__'));
					if(Object.keys(shoppedItems ==  null)){
						console.log(null);
					}
				// // // console.log(jsonFormat[key]);
					
				}
				for(var obj in shoppingList){
					// console.log(obj['productsId']);
					productCtrl.getProductById(obj['productsId'],function(err, productObj) {
						
						jArrays.push(productObj);
					})
				}
				
			res.render('shoppingCart', { title: 'Cart Items', shoppingList: jArrays }); 
		});
	});

//write cookie
	app.get('/cookie',function(req, res){

		var min = 1000000001;
   		var max = 9999999999;
    	var idValue =  Math.floor(Math.random() * (max - min + 1)) + min;
    	 
    	 var expiryDate = new Date();
         expiryDate.setDay(expiryDate.getDay() + 30);

    	 res.cookie(cartId , idValue, expiryDate).send('Cookie is set');
    	 // res.redirect('/productCatalog');

    	});

//read cookie
    app.get('/getCookie', function(req, res) {
  		console.log("Cookies :  ", req.cookies);
  		res.redirect('/');
	});
 
//  	app.get('/clearcookie', function(req,res){
//      	clearCookie('cookie_name');
//      	res.send('Cookie deleted');
// });

		app.route('/addToCart')
		.get(function(req, res) {
			var userId = req.param('userId');
			var prodId= req.param('prodId');

			var shopping = new Shopping();

			shopping.username = userId;
			shopping.productsId = prodId;

			productCtrl.addToCart(shopping, function(err) {
				if (err) {
					console.log(err);
			}
			req.flash('success_msg', 'Product successfully added to cart');

			// res.render('productCatalog', { title: 'Product Catalog', productList: productList });
			res.redirect('/productCatalog');
		});
			
	});

		// app.route('/shoppingCart')
		// .get(function(req, res) {
		// 	// var userName = "abc";
		// 	// shoppingCtrl.getCartItem(function (err, shoppingList){
		// 	// 	if (err) {
		// 	// 		console.log(err);
		// 	// 	}
		// 	// 	console.log(shoppingList);
				
		// 	// });
		// 	res.render('shoppingCart', { });
		// 	// res.redirect('/shoppingCart');
		// 	// shoppingList: shoppingList 
		// });

};


			
	// });