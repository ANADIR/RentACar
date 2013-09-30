$(document).ready(function() {
	
    var today = new Date;
	var year = today.getFullYear();
	var textFooter = "All Rights Reserved to Rent City &copy;" + " " + year;
	$("footer h4").html(textFooter);
	
    $(this).css("opacity","0");
	
	// Initiate Parse database
	Parse.initialize("9anzFQz1CNptMaK6TFoRtk1cdm8yuWvlsMnAvuWA", "tjywfLxObEC2VYmMYphFjWabxRYYmUkoKY1HRsHS");	
	// Create Parse user database
	user = Parse.Object.extend("user");
	// Create a new instance of that class.
	user = new user();
	
	// validate form    
$("#RegisterForm").validate({
    rules: {
        telephone: {
            required: function(element) {
                if ($("#mobile").val().length > 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        mobile: {
            required: function(element) {
                if ($("#telephone").val().length > 0) {
                    return false;
                }
                else {
                    return true;
                }

            }
        }
    }
	});
	
	//Check that at least one phone is typed
	$("#mobile").bind("key focusout",function()
	{
		$("#RegisterForm").validate().element($("#telephone"));
	console.log("validate started");		
	});
	$("#telephone").bind("key focusout",function()
	{
		$("#RegisterForm").validate().element($("#mobile"));
			console.log("validate started");
});

	
});

// define car rent golbal var
var carRented = "none";

function registerDone(){
	$.mobile.changePage("#PickCar", {
	transition: 'slide'
	});
}

// check if user registered in localStorage when register form completed or car picked
function carCheckAvailability(){
if (localStorage.getItem("firstName") != "" & localStorage.getItem("lastName") != "") {
		$.mobile.changePage("#PickCar", {
		transition: 'slide'

		});
	}
		else {
		alert("Please register first!");
		$.mobile.changePage("#Register", {
		transition: 'slide'

		});
		}
}

// handeling the navigation bar ui
$(function() {
	var pull = $('#pull');
		menu = $('nav ul');
		menuHeight = menu.height();

	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
});

$(window).resize(function(){
	var w = $(window).width();
	if(w > 320 && menu.is(':hidden')) {
		menu.removeAttr('style');
	}
});	


// Function when car was picked and user is registered continue to next page
function carPicked(){

if (localStorage.getItem("firstName") != "" & localStorage.getItem("lastName") != "") {
		$.mobile.changePage("#basic-map", {
		transition: 'slide'
		});
	}
}


// validate email
function validateEmail(email) {
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
if( !emailReg.test( email ) ) {
return false;
} else {
return true;
}}

	
// user details storage
function storage(val,id){
	
	// User form storage
	if(id == "firstName"){
	localStorage.setItem("firstName",val);
	user.set("firstName", val);	
	}
	if(id == "lastName"){
	localStorage.setItem("lastName",val);
	user.set("lastName", val);	
	}
	if(id == "idnumber"){
	localStorage.setItem("idnumber",val);
	user.set("idnumber", val);
	}
	if(id == "email"){
	localStorage.setItem("email",val);	
	user.set("email", val);
	}
	if(id == "telephone"){
	localStorage.setItem("telephone",val);
	user.set("telephone", val);	
	}
	if(id == "mobile"){
	localStorage.setItem("mobile",val);	
	user.set("mobile", val);	
	}
	if(id == "datebirth"){
	localStorage.setItem("datebirth",val);	
	user.set("datebirth", val);	
	}
	if(id == "licnumber"){
	localStorage.setItem("licnumber",val);
	user.set("licnumber", val);	
	}
	
	
	user.save(null, {
	  success: function(user) {
		// Execute any logic that should take place after the object is saved.
		//alert('New object created with objectId: ' + user.id);
	  },
	  error: function(user, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and description.
		alert('Failed to create new object, with error code: ' + error.description);
	  }
	});
}

// Car pick storage
function storageCarPick(val,id){
	// Create Parse user database
	var user = Parse.Object.extend("user");
 	// Create a new instance of that class.
	var user = new user();

	if(id == "accent"){
	localStorage.setItem("carPicked","accent");
	}
	if(id == "versa"){
	localStorage.setItem("carPicked","versa");
	}
	if(id == "corolla"){
	localStorage.setItem("carPicked","corolla");
	}
	if(id == "sentra"){
	localStorage.setItem("carPicked","sentra");
	}
	if(id == "sonata"){
	localStorage.setItem("carPicked","sonata");
	}
	if(id == "galant"){
	localStorage.setItem("carPicked","galant");
	}
	
	var userName = this.user.get("firstName");
	if (localStorage.getItem("firstName") != "" & userName != "undefined" & localStorage.getItem("lastName") != "") {
		alert("Thanks " + userName + "! car picked. Now lets get your price...");
		$.mobile.changePage("#basic-map", {
		transition: 'slide'

		});
	}
		else {
		alert("Please register first! Thanks!");
		$.mobile.changePage("#Register", {
		transition: 'slide'

		});
		}
}

// Store cars
$(function()
	{
		// Store car names and numbers
		localStorage.setItem("accent","29-236-12");	
		localStorage.setItem("versa","39-456-92");
		localStorage.setItem("corolla","11-536-32");
		localStorage.setItem("sentra","55-224-12");
		localStorage.setItem("galant","33-666-12");
		localStorage.setItem("sonata","13-222-12");
		
		// Store user form
		if (localStorage.getItem("firstName")) {
		document.getElementById("firstName").value = localStorage.getItem("firstName");
		}
		
		if (localStorage.getItem("lastName")) {
		document.getElementById("lastName").value = localStorage.getItem("lastName");
		}
		
		if (localStorage.getItem("idnumber")) {
		document.getElementById("idnumber").value = localStorage.getItem("idnumber");
		}
		
		if (localStorage.getItem("email")) {
		document.getElementById("email").value = localStorage.getItem("email");
		}
		
		if (localStorage.getItem("telephone")) {
		document.getElementById("telephone").value = localStorage.getItem("telephone");
		}
		
		if (localStorage.getItem("mobile")) {
		document.getElementById("mobile").value = localStorage.getItem("mobile");
		}
		
		if (localStorage.getItem("datebirth")) {
		document.getElementById("datebirth").value = localStorage.getItem("datebirth");
		}
		
		if (localStorage.getItem("licnumber")) {
		document.getElementById("licnumber").value = localStorage.getItem("licnumber");
		}
});

// Rent and car after checking it is availble
function rentThisCar(){
if (localStorage.getItem("carPicked") ==  localStorage.getItem("carRented") ){
		alert("Sorry, but this car is allready taken. \n Please choose another one.");
		
		$.mobile.changePage("#PickCar", {
		transition: 'slide'

		});
	} else {
	var carPicked;
	carPicked = localStorage.getItem("carPicked");
	localStorage.setItem("carRented",carPicked);

$.mobile.changePage("thanks.html", {
		transition: 'slide'

		});
	}
}

// Return Car
function returnCar(carnumber){
//first get the user current rented car number
carRentedName = localStorage.carRented;
carRentedNum = localStorage.getItem(carRentedName);

//check if this car number is the car that was rented
	if(carnumber == carRentedNum){
	alert("Car number " + carnumber + " was returned. Your credit card will be charged. Thanks!");
	localStorage.carRented = "";
		$.mobile.changePage("#Main", {
			transition: 'slide'

			});
	} else {
	alert("This is not your car number, please try again."	);
	}
}

// slideshow functions
function showImage(img, duration){ 
	$('.container').removeClass('current').css({
			"opacity" : 0.0, 
			"zIndex" : 2
			});
	img.animate({opacity:1.0}, duration, function(){		
		$(this).addClass('current').css({zIndex:1});
	});	 	
}

function rotateImages(){	
	var curPhoto = $("div.current");
	var nxtPhoto = curPhoto.next();		
	var curTab = $(".tabs li.current");
	var nxtTab = curTab.next();				
 
	if (nxtPhoto.length == 0) {
		nxtPhoto = $('#featured div:first');	
		nxtTab = $('.tabs li:first-child');			
	}					
 
	curTab.removeClass('current');
	nxtTab.addClass('current');
	showImage(nxtPhoto, 300);
 
}
function runRotateImages(){
	xx = setInterval("rotateImages()", 4000);	
}

runRotateImages();	
	$("#featured").hover(
		function(){					
			clearTimeout(xx);
		}, 
		function(){					
			runRotateImages();
		}
	)

function slideSwitch() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    // use this to pull the images in the order they appear in the markup
    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    // uncomment the 3 lines below to pull the images in random order
    
    //var $sibs  = $active.siblings();
    //var rndNum = Math.floor(Math.random() * $sibs.length );
    //var $next  = $( $sibs[ rndNum ] );


    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 500, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 2000 );
});
