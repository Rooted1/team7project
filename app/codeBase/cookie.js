
function cookieModule () {
    
//generate random cookie ID
function cookieId () { 
    var min = 1000000001;
    var max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
//set cookie and expiry date
function WriteCookie () {

        var expiryDate = new Date();
        expiryDate.setDay(expiryDate.getDay() + 30);
        var CookieId= cookieId();
        document.cookie = CookieId + ";" + expiryDate.toUTCString(); 
        return CookieId;
}
//read cookie
function ReadCookie () {

    var cookieArray = document.cookie.split(';');
    return cookieArray[0];
    
    }
    
    this.SupplyCookie = function () {
        var userCookieId = ReadCookie();
        
        if (userCookieId !== null) {
            return userCookieId
        }
        return WriteCookie(); 
    }
}

module.exports = cookieModule();



