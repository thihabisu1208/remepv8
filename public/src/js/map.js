/* Note: This example requires that you consent to location sharing when
 * prompted by your browser. If you see the error "Geolocation permission
 * denied.", it means you probably did not give permission for the browser * to locate you. */
let pos;
let map;
let bounds;
let circle;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
let directionsDisplay;
let directionsService;
let geocoder;
let to = document.querySelectorAll('.to');
let radius = 10;
let directions = [];
let iconUrl = '../src/img/conveniencestoreMarker.png';
let convenienceStoreSearch = document.querySelector('.convenienceStore');
let superMarketSearch = document.querySelector('.superMarket');
let drugStoreSearch = document.querySelector('.drugStore');
let departmentSearch = document.querySelector('.department');
let dollarStoreSearch = document.querySelector('.dollarStore');
let discountStoreSearch = document.querySelector('.discountStore');
let markers = [];
let circles = [];
let mapStyles = [{
        "elementType": "geometry",
        "stylers": [{
            "color": "#ebe3cd"
        }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#523735"
        }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#f5f1e6"
        }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#c9b2a6"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#dcd2be"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#ae9e90"
        }]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dfd2ae"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            // "color": "#dfd2ae"
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            // "color": "#dfd2ae"
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            // "color": "#93817c"
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text.fill",
        "stylers": [{
            // "color": "#3c6beb"
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            // "color": "#a5b076"
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            // "color": "#447530"
            "visibility": "off"
        }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f1e6"
        }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#fdfcf8"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f8c967"
        }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e98d58"
        }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#db8555"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ecb467"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#806b63"
        }]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dfd2ae"
        }]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#8f7d77"
        }]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#ebe3cd"
        }]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dfd2ae"
        }]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#b9d3c2"
        }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#92998d"
        }]
    }

]

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService();
    geocoder = new google.maps.Geocoder();
    currentInfoWindow = infoWindow;

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        // watchPosition
        // getCurrentPosition 
        navigator.geolocation.getCurrentPosition(
            position => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map = new google.maps.Map(document.querySelector('#mapShow'), {
                    center: pos,
                    zoom: 16,
                    disableDefaultUI: true,
                    clickableIcons: false,
                    styles: mapStyles,
                    gestureHandling: 'greedy'
                });

                convenienceStoreSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/conveniencestoreMarker.png';
                    getNearbyConvenienceStores(pos);
                    directionsDisplay.setMap(null);
                });

                superMarketSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/supermarketMarker.png';
                    getNearbySupermarkets(pos);
                    directionsDisplay.setMap(null);
                });

                drugStoreSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/drugstoreMarker.png';
                    getNearbyDrugStores(pos);
                    directionsDisplay.setMap(null);
                });

                departmentSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/departmentMarker.png';
                    getNearbyDepartments(pos);
                    directionsDisplay.setMap(null);
                });

                dollarStoreSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/dollarstoreMarker.png';
                    getNearby100Yen(pos);
                    directionsDisplay.setMap(null);
                });

                discountStoreSearch.addEventListener('click', () => {
                    clearResults(markers);
                    clearCircles(circles);
                    openNav();
                    iconUrl = '../src/img/discountstoresMarker.png';
                    getNearbyDiscountStores(pos);
                    directionsDisplay.setMap(null);
                });

                // Route Searching and Saving
                for (let i = 0, max = to.length; i < max; i++) {
                    to[i].addEventListener('click', () => {
                        clearResults(markers);
                        clearCircles(circles);

                        var start = pos;
                        var end = to[i].innerHTML;
                        var request = {
                            origin: start,
                            destination: end,
                            travelMode: 'WALKING'
                        };

                        directionsService.route(request, function (result, status) {
                            if (status == 'OK') {
                                directionsDisplay.setDirections(result);
                                directionsDisplay.setPanel(panel2);

                                geocoder.geocode({
                                        address: end
                                    },
                                    function (results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                            console.log(results[0].geometry.location.lat());
                                            console.log(results[0].geometry.location.lng());
                                            pos2 = {
                                                lat: results[0].geometry.location.lat(),
                                                lng: results[0].geometry.location.lng()
                                            };

                                            getNearbyPlaces(pos2);
                                        }
                                    }
                                );
                            }
                        });
                    });
                }

                bounds.extend(pos);

                // infoWindow.setPosition(pos);
                // infoWindow.setContent('You Are Here!');
                // infoWindow.open(map);
                map.setCenter(pos);

                let marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 20,
                        fillColor: "#FBC02D",
                        fillOpacity: 0.7,
                        strokeWeight: 5,
                        strokeColor: "#FBC02D"
                    },
                });

                directionsDisplay.setMap(map);

                // Call Places Nearby Search on user's location
                getNearbyPlaces(pos);
            },
            () => {
                // Browser supports geolocation, but user has denied permission
                handleLocationError(true, infoWindow);
            });
    } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
    }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Sydney, Australia
    pos = {
        lat: -33.856,
        lng: 151.215
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
}

// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'convenience store',
        opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}


// Get Markers by Type
function getNearbyConvenienceStores(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        // keyword: 'convenience store',
        keyword: 'convenience store'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function getNearbySupermarkets(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        // keyword: 'convenience store',
        keyword: 'supermarket'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function getNearbyDrugStores(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'drugstore'
        // keyword: 'dollarstore'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function getNearbyDepartments(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        // keyword: 'convenience store',
        keyword: 'clothes store'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function getNearby100Yen(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        // keyword: 'drugstore'
        keyword: 'dollarstore'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function getNearbyDiscountStores(position) {
    let request = {
        location: position,
        radius: radius,
        // rankBy: google.maps.places.RankBy.DISTANCE,
        // keyword: 'drugstore'
        keyword: 'discountstore'
        // opennow: true
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarkers(results[i]));
        }
    }
}

// Set markers at the location of each place result
function createMarkers(place) {
    let icon = {
        url: iconUrl,
        scaledSize: new google.maps.Size(35, 50)
    };

    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        icon: icon,
        animation: google.maps.Animation.DROP
    });

    let circle = new google.maps.Circle({
        center: marker.getPosition(),
        map: map,
        radius: 50, // IN METERS.
        fillColor: '#FF6600',
        fillOpacity: 0.05,
        // fillOpacity: 1,
        strokeColor: '#FFF',
        strokeWeight: 0 // DON'T SHOW CIRCLE BORDER.
    });

    circle.addListener('mouseover', () => {
        var notificationIcon = '/src/img/logo_main.png';
        var text = place.name + ' が近くにあるよ！';
        var notification = new Notification('Shop', {
            body: text,
            icon: notificationIcon
        });
    });

    marker.addListener('click', () => {
        let request = {
            placeId: place.place_id,
            fields: [
                'name',
                'formatted_address',
                'geometry',
                'website',
                'photos',
                'opening_hours'
            ]
        };
        /* Only fetch the details of a place when the user clicks on a marker.
         * If we fetch the details for all place results as soon as we get
         * the search response, we will hit API rate limits. */
        service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status);
        });

        var start = pos;
        var end = place.geometry.location;
        request = {
            origin: start,
            destination: end,
            travelMode: 'WALKING'
        };

        directionsService.route(request, function (result, status) {

            if (status == 'OK') {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(result);
                directionsDisplay.setOptions({
                    suppressMarkers: true
                });
            }
        });
    });

    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
    /* Once all the markers have been placed, adjust the bounds of the map to
     * show all the markers within the visible area. */
    map.fitBounds(bounds);

    return marker;
}

function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
}

function clearCircles(circles) {
    for (var c in circles) {
        circles[c].setMap(null);
    }
    circles = [];
}

// Builds an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = 'None';
        if (placeResult.rating) rating = placeResult.rating;
        // if (placeResult.opening_hours) opening_hours = placeResult.opening_hours;
        placeInfowindow.setContent(
            `<div>
                <strong style="color: #A4C73D; font-size: 24px;">${placeResult.name}</strong>
                <br>
                <br/> 
                <br/> 
                Address: ${placeResult.formatted_address}
            </div>`
        );
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
    } else {
        console.log('showDetails failed: ' + status);
    }
}

function openNav() {
    open = document.querySelector('.nav');

    if (open.hasAttribute('data-state')) {
        open.removeAttribute('data-state');
    } else {
        open.setAttribute('data-state', 'active');
    }
}