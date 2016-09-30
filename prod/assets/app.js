function docElById(name) { return document.getElementById(name); }
var modal = docElById('myModal'),
btn = docElById("wishlist"),
span = document.getElementsByClassName("close")[0],
elFN = docElById("firstname"),
btnWL = docElById("btn-add-wl"),
ulWL = docElById("ul-wl"),
btnCk = docElById("btn-ck");  
  
var slides = document.querySelectorAll('#slides .slide'); 
var currentSlide = 0;
function nextSlide() { 
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing'; 
}
function prevSlide() { 
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide-1 < 0 )?slides.length-1:currentSlide-1;
    slides[currentSlide].className = 'slide showing'; 
}

btn.onclick = function() { modal.style.display = "block"; };
span.onclick = function() { modal.style.display = "none"; };
window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };
 
btnWL.onclick = function() {
	var aWL = [];
	var cWL = getCookie("wishlist");
	if (cWL !== null) { aWL = JSON.parse(cWL); }
	aWL.push(elFN.innerHTML);
	setCookie( "wishlist", JSON.stringify(aWL) ); 
	
	ulWL.innerHTML += '<li><a href="/'+elFN.innerHTML+'">'+elFN.innerHTML+'</a> <button class="button">X</button></li>';
	initRMBtns();
	btnWL.disabled = true;
	btnWL.className += " disabled";
};
function initRMBtns() {
	var btnsRM = ulWL.getElementsByTagName('button');
	for (var i = 0; i < btnsRM.length; i++) {
	  btnsRM[i].onclick = removeWL;
	}
}
function removeWL() {
	var index = Array.prototype.indexOf.call(ulWL.children, this.parentNode);
	var aWL =[];
	var cWL = getCookie("wishlist");
	if (cWL !== null) { aWL = JSON.parse(cWL); }
	aWL.splice(index, 1);
	setCookie( "wishlist", JSON.stringify(aWL) );
	ulWL.removeChild(this.parentNode);
}
initRMBtns();

btnCk.onclick = function() {
	setCookie( "hidecookies", '1' );
	var ck = docElById("info-ck");
	ck.style.display = "none";
};
 

function setCookie(name, value) {
	var now = new Date(), exp = new Date();
	exp.setTime(now.getTime()+(365*24*60*60*1000));
	document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
	var reg = new RegExp("(?:; )?" + name + "=([^;]*);?");
	return (reg.test(document.cookie)) ? decodeURIComponent(RegExp['$1']) : null;
}