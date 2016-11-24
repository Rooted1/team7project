var http    = require( "http" );
var Cookies = require( "cookies" );

// //generate random cookie ID
// function cookieId () { 
//     var min = 1000000001;
//     var max = 9999999999;
//     return Math.floor(Math.random() * (max - min + 1)) + min; 
// }

// //set cookie and expiry date
// function WriteCookie () {
//         var expiryDate = new Date();
//         expiryDate.setDay(expiryDate.getDay() + 30);
//         var CookieId= cookieId();
//         document.cookie = CookieId + ";" + expiryDate.toUTCString(); 
//         return CookieId;
// }
// //read cookie
// function ReadCookie () {
//      var cookieArray = document.cookie.split(';');
//     return cookieArray[0]; 
//     }

// function parseCookies (request) {
    // var list = {},
    //     rc = request.headers.cookie;

    // rc && rc.split(';').forEach(function( cookie ) {
    //     var parts = cookie.split('=');
    //     list[parts.shift().trim()] = decodeURI(parts.join('='));
    // });

    // return list;

    // var expiryDate = new Date();
    //     expiryDate.setDay(expiryDate.getDay() + 30);
    //     var CookieId = cookieId();
    //     document.cookie = CookieId + ";" + expiryDate.toUTCString(); 
    //     return CookieId;
// }

var server = http.createServer(function (req, res) {
    res.setHeader('set-cookie', cookie.serialize('greeting', 'beep boop'));
    res.end('I sent you a cookie in an HTTP header!\n');
});
server.listen(8080);
  // To Read a Cookie
//   var cookies = parseCookies(request);

//   // To Write a Cookie
//   response.writeHead(200, {
//     'Set-Cookie': 'mycookie=test',
//     'Content-Type': 'text/plain'
//   });

// function cookieModule () {
//      this.SupplyCookie = function () {
//         var userCookieId = ReadCookie();
        
//         if (userCookieId !== null) {
//             return userCookieId;
//         }
//         return WriteCookie(); 
//     }
// }

module.exports = cookieModule;



