//This function is to call the movies api and get all the movies

function getMovieData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the movies records into our restaurant array
        restaurant_array = JSON.parse(request.responseText);
        console.log(restaurant_array);
        //Fetch the reviews and user info as well
        fetchReviews();
        getUserInfo();

        //call the function so as to display all restaurants
        displayRestaurants();
    };
    //This command starts the calling of the restaurant web api
    request.send();
}

//This function is to display all the restaurants
function displayRestaurants() {
    var table = document.getElementById("moviesTable");
    var restaurantCount = 0;

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        {
            var thumbnail = restaurant_array[count].restaurant_images;
            var title = restaurant_array[count].restaurant_name;
            var place = restaurant_array[count].restaurant_location;

            var cell = '<div class="col-lg-4 "> \
                           <div class="card border-danger mb-3 text-white bg-dark mb-3" > \
                               <img class="img-responsive fit-image rounded" alt="Restaurant Image" src=' + thumbnail + '> \
                                    <div class="card-body"> \
                                      <h5 class="card-title">' + title + '</h5>\
                                      <div class="d-flex justify-content-between align-items-center"> \
                                      <div class="btn-group"> \
                                      <button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-outline-danger" onClick="showRestaurantDetails(this);showRestaurantComments(this);showMap(this);">View more</button> \
                                   </div> \
                                     <small class="text-muted">' + place + '</small> \
                                </div> \
                           </div> \
                        </div> ';

            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
    document.getElementById("parent").textContent = "";
}

function displayRestaurantss() { //By location
    var table = document.getElementById("moviesTable");
    var restaurantCount = 0;

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (restaurant_array[count].restaurant_location == category) {
            var thumbnail = restaurant_array[count].restaurant_images;
            var title = restaurant_array[count].restaurant_name;
            var place = restaurant_array[count].restaurant_location;

            var cell = '<div class="col-lg-4 "> \
                           <div class="card border-danger mb-3 text-white bg-dark mb-3" > \
                               <img class="img-responsive fit-image rounded" alt="Restaurant Image" src=' + thumbnail + '> \
                                    <div class="card-body"> \
                                      <h5 class="card-title">' + title + '</h5>\
                                      <div class="d-flex justify-content-between align-items-center"> \
                                      <div class="btn-group"> \
                                      <button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-outline-danger" onClick="showRestaurantDetails(this);showRestaurantComments(this);showMap(this);">View more</button> \
                                   </div> \
                                     <small class="text-muted">' + place + '</small> \
                                </div> \
                           </div> \
                        </div> ';

            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
    document.getElementById("parent").textContent = "";
}

function displayRestaurantsss() { //By cuisine
    var table = document.getElementById("moviesTable");
    var restaurantCount = 0;

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (restaurant_array[count].cuisine_type == category1) {
            var thumbnail = restaurant_array[count].restaurant_images;
            var title = restaurant_array[count].restaurant_name;
            var place = restaurant_array[count].restaurant_location;

            var cell = '<div class="col-lg-4 "> \
                           <div class="card border-danger mb-3 text-white bg-dark mb-3" > \
                               <img class="img-responsive fit-image rounded" alt="Restaurant Image" src=' + thumbnail + '> \
                                    <div class="card-body"> \
                                      <h5 class="card-title">' + title + '</h5>\
                                      <div class="d-flex justify-content-between align-items-center"> \
                                      <div class="btn-group"> \
                                      <button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-outline-danger" onClick="showRestaurantDetails(this);showRestaurantComments(this);showMap(this);">View more</button> \
                                   </div> \
                                     <small class="text-muted">' + place + '</small> \
                                </div> \
                           </div> \
                        </div> ';

            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
    document.getElementById("parent").textContent = "";
}

function displayRestaurantsk() { // By name in searchbar
    var table = document.getElementById("moviesTable");
    var restaurantCount = 0;
    searched_name = document.getElementById("foodname").value;
    console.log(searched_name);
    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (restaurant_array[count].restaurant_name == searched_name) {
            var thumbnail = restaurant_array[count].restaurant_images;
            var title = restaurant_array[count].restaurant_name;
            var place = restaurant_array[count].restaurant_location;
            var cell = '<div class="col-lg-4 "> \
                           <div class="card border-danger mb-3 text-white bg-dark mb-3" > \
                               <img class="img-responsive fit-image rounded" alt="Restaurant Image" src=' + thumbnail + '> \
                                    <div class="card-body"> \
                                      <h5 class="card-title">' + title + '</h5>\
                                      <div class="d-flex justify-content-between align-items-center"> \
                                      <div class="btn-group"> \
                                      <button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-outline-danger" onClick="showRestaurantDetails(this);showRestaurantComments(this);showMap(this);">View more</button> \
                                   </div> \
                                     <small class="text-muted">' + place + '</small> \
                                </div> \
                           </div> \
                        </div> ';
            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
    document.getElementById("parent").textContent = "";
}

// List restaurants according to location
function listNorthRestaurants() {
    category = "North";
    displayRestaurantss(category);
}

function listSouthRestaurants() {
    category = "South";
    displayRestaurantss(category);
}

function listEastRestaurants() {
    category = "East";
    displayRestaurantss(category);
}

function listWestRestaurants() {
    category = "West";
    displayRestaurantss(category);
}
//List restaurants according to cuisines
function listChineseRestaurants() {
    category1 = "Chinese";
    displayRestaurantsss(category1);
}

function listJapaneseRestaurants() {
    category1 = "Japanese";
    displayRestaurantsss(category1);
}

function listWesternRestaurants() {
    category1 = "Western";
    displayRestaurantsss(category1);
}

function listKoreanRestaurants() {
    category1 = "Italian";
    displayRestaurantsss(category1);
}

//This function is to display the individual restaurant
function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurants").textContent = restaurant_array[item].restaurant_name;
    document.getElementById("openingTime").textContent = restaurant_array[item].openclose;
    document.getElementById("location").textContent = restaurant_array[item].restaurant_location; 
    document.getElementById("contact").textContent = restaurant_array[item].telephone;
    document.getElementById("about").textContent = restaurant_array[item].sypnosis;
    document.getElementById("restaurantPic").src = restaurant_array[item].restaurant_feat;
}

function showMap(element) { //Google maps API implementation
    var item = element.getAttribute("item");
    currentIndex = item;
    console.log(restaurant_array[item].latitude);
    var locations = [restaurant_array[item].Restaurant, restaurant_array[item].longitude, restaurant_array[item].latitude];
    map = new google.maps.Map(document.getElementById("map"), { center: { lat: 1.8, lng: 110.9 }, zoom: 4 });
    var infoWindow = new google.maps.InfoWindow();
    var marker, i;
    var markers = [];

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[1], locations[2]),
        map: map,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/restaurant.png"
        }
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infoWindow.setContent(locations[0]);
            infoWindow.open(map, marker);
        }
    })(marker, i));

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            map.setCenter(pos);
            map.setZoom(15);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            })

            markers.push(marker);
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infoWindow.setContent("Your current location");
                    infoWindow.open(map, marker);
                }
            })(marker, i));
        }
    )
}