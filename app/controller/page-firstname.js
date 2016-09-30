exports.execute = function(req, res){
	
	var fs = require('fs');
	var contents = fs.readFileSync("firstnames-list.json");
	var jsonContent = JSON.parse(contents);
	var aReasons;
	if (jsonContent[req.params.firstname] != undefined) {
		aReasons = jsonContent[req.params.firstname].reasons;
	}
	
	var aWishlist = new Array();
	if ( req.cookies.wishlist != undefined ) {
		aWishlist = JSON.parse(req.cookies.wishlist);
	}
	console.log(aWishlist);
	
	var bAlreadyListed = false;
	for (var i = 0; i < aWishlist.length; i++) {
		if (aWishlist[i] == req.params.firstname) {
			bAlreadyListed = true;
		}
	}
	
	var bShowCookies = true;
	if ( req.cookies.hidecookies != undefined ) {
		bShowCookies = false;
	}
	
    res.render('pages/firstname.ejs', {firstname: req.params.firstname, reasons: aReasons, cookiesex: req.cookies.filtersex, wishlist: aWishlist, alreadylisted: bAlreadyListed, showcookies: bShowCookies, req:req});
	
};