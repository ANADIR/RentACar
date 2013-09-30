self.addEventListener('message', function(e) {

var data = e.data;
var finalPrice = 0;
	if (data < 90){
		finalPrice = data * 1.2;
	} else {
	finalPrice = data * 0.9;
	}

var roundedPrice;
     
roundedPrice = parseInt(finalPrice);

self.postMessage( roundedPrice + " NIS");

}, false);

