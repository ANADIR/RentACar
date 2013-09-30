            var map,
                currentPosition,
                directionsDisplay, 
                directionsService;

            function initialize(lat, lon)
            {
                directionsDisplay = new google.maps.DirectionsRenderer(); 
                directionsService = new google.maps.DirectionsService();

                currentPosition = new google.maps.LatLng(lat, lon);

                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                directionsDisplay.setMap(map);

                 var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Current position"
                });

                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
                    infowindow.open(map, currentPositionMarker);
                });
            }

            function locError(error) {
                // initialize map with a static predefined latitude, longitude
               initialize(59.3426606750, 18.0736160278);
            }

            function locSuccess(position) {
                initialize(position.coords.latitude, position.coords.longitude);
            }
			
            function calculateRoute() {

			var targetDestination = $("#target-dest").val();
                if (currentPosition && currentPosition != '' && targetDestination && targetDestination != '') {
                    var request = {
                        origin:currentPosition, 
                        destination:targetDestination,
                        travelMode: google.maps.DirectionsTravelMode["DRIVING"]
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setPanel(document.getElementById("directions"));
                            directionsDisplay.setDirections(response); 
							
							//alert("The total distance is: " + response.routes[0].legs[0].distance.text);
							
							// Worker to calculate price
							var worker = new Worker('js/priceCalcWorker.js');
							var distance = response.routes[0].legs[0].distance.value / 1000;
							
							
							// Popup of calculating the price
							$.mobile.loading( 'show', {
								text: 'Calculating your price...',
								textVisible: true,
								theme: 'a',
								html: ""
							});
								
							// Play audio at the background
							var snd = new Audio("sounds/wait.mp3");
							snd.play();
							  
							// Get worker answer after delay
							setTimeout(function () {
								worker.postMessage(distance); // Start the worker.
								console.log("Worker got:" + distance);
																
								worker.addEventListener('message', function(e) {
									document.getElementById('price').textContent = e.data;
									
								}, false);
								// Remove popup of calculating the price
								$.mobile.loading( 'hide' );
								// Results pop up
								$.mobile.changePage( "#priceDialog", { role: "dialog" } );
								
							}, 2000);								
							
														
                            /*
                                var myRoute = response.routes[0].legs[0];
                                for (var i = 0; i < myRoute.steps.length; i++) {
                                    alert(myRoute.steps[i].instructions);
                                }
                            */
							
                            $("#results").show();					
                        }
                        else {
                            $("#results").hide();
                        }
                    });
                }
                else {
                    $("#results").hide();
                }
				
            }

            $(document).bind("pagebeforeshow", "#basic-map", function() {
                navigator.geolocation.getCurrentPosition(locSuccess, locError);
            });

            $(document).on('click', '#directions-button', function(e){
                e.preventDefault();
                calculateRoute();
				
            });
			
			function dissmiss(){
			
			}
			
			


        