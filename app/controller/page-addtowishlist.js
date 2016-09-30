exports.execute = function(req, res){
	
	//TODO : Si connecté
	
	//Sinon, enregistrement dans les cookies
	var aWishlist = new Array();
	if (req.cookies.wishlist !== undefined) {
		aWishlist = JSON.parse(req.cookies.wishlist);
	}
	var paramFirstname = req.param('firstname');
	if (paramFirstname !== undefined) {
		aWishlist.push(paramFirstname);
	}
	var newWishlist = JSON.stringify(aWishlist);
	res.cookie('wishlist', newWishlist);
	
	
	console.log(newWishlist);
	res.send('ok !');
	
};