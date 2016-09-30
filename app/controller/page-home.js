exports.execute = function(req, res){
	
	var fs = require('fs');
	var contents = fs.readFileSync("firstnames-list.json");
	var jsonContent = JSON.parse(contents);
	
	var sFilteredSex = req.cookies.filtersex;
	console.log("sFilteredSex : " + sFilteredSex);
	
	var aRandom = new Array();
	for (sFirstname in jsonContent) {
		var firstname = jsonContent[sFirstname];
		firstname.firstname = sFirstname;
		aRandom.push(firstname);
	}
	var nRandom = -1;
	if (sFilteredSex != "" && sFilteredSex != undefined) {
		while (nRandom < 0) {
			var nTest = Math.floor((Math.random() * aRandom.length));
			if (aRandom[nTest].sex.indexOf(sFilteredSex) != -1) {
				nRandom = nTest;
			}
		}
	} else {
		nRandom = Math.floor((Math.random() * aRandom.length));
	}
	
	console.log("redirect to : " + aRandom[nRandom].firstname);
	res.redirect('/' + aRandom[nRandom].firstname);
	
};

exports.search = function(req, res) {
	
	//Modification du filtre
	var sex = req.param('sex');
	if (sex != undefined) {
		res.cookie('filtersex', sex);
		res.redirect('/');
	}
	
	
	//Recherche de prénom
	var prenomRecherche = req.param('prenom');
	if (prenomRecherche != undefined && prenomRecherche != "") {
		prenomRecherche = prenomRecherche.split(" ").join("-");
		prenomRecherche = prenomRecherche.charAt(0).toUpperCase() + prenomRecherche.slice(1);
		if (prenomRecherche.indexOf("-") > -1) {
			var aSplit = prenomRecherche.split("-");
			aSplit[1] = aSplit[1].charAt(0).toUpperCase() + aSplit[1].slice(1);
			prenomRecherche = aSplit.join("-");
		}
		console.log("redirect to : " + prenomRecherche);
		res.redirect('/' + prenomRecherche);
	}
	
};