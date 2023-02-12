function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    //This command starts the calling of the reviews web api
    request.onload = function () {
        //get all the reviews records into our review array
        review_array = JSON.parse(request.responseText);
        console.log(review_array)
    };

    request.send();
}

//This function is to display all the reviews of a particular restaurant
function showRestaurantComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("review").textContent = "Reviews of " + restaurant_array[item].restaurant_name;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurant_id == restaurant_array[item].restaurant_id) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedRestaurantId = restaurant_array[item].restaurant_id;
            star = "";
            var html = '<div style="width:100%;" >                                                           \
                            <div class="card text-center">                                                                                  \
                                <div class="card-body text-center">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].reviews + "</p>               \
                                    <small>by " + review_array[i].username + " @ " + review_array[i].review_date + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                            <p>&nbsp;</p> \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/rice_icon.png' style='width:30px; height:35px;'/>";
            }
            star += "<img src='images/delete.png' class='edit' style='width: 40px; data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' />";
            star += "<img src='images/edit.png' class='edit' data-toggle='modal' style='width: 40px;' data-target='#editCommentModal' data-dismiss='modal' item='"
                + i + "' onClick='editComment(this)' />";

            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}


function newComment() { //Allows user to create a new review 
    // Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userReviews").value = "";
    document.getElementById("username").value = "";
}

// Submit or send the new review to the server to be added.
function addReview() {
    var token1 = sessionStorage.getItem("token");
    if (token1 != null) { //Test whether the user is logged in before submitting review, else they are not allowed
        var review = new Object();
        review.restaurant_id = restaurant_array[currentIndex].restaurant_id; // restaurant ID is required by server to create new review
        review.restaurant_name = restaurant_array[currentIndex].restaurant_name; // restaurant name is required by server to create new review
        review.reviews = document.getElementById("userReviews").value; // Value from HTML input text 
        review.username = sessionStorage.getItem("currentuser"); // Value from session storage
        review.review_date = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        review.rating = rating;

        var postReview = new XMLHttpRequest(); // new HttpRequest instance to send review

        postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

        postReview.setRequestHeader("Content-Type", "application/json");
        postReview.onload = function () {
            fetchReviews(); // fetch all reviews again so that the web page can have updated reviews.     
        };

        postReview.send(JSON.stringify(review)); // Convert the data in Review object to JSON format 
        // before sending to the server.
    }
    else {
        if (!alert('You need to be signed in to write a review!')) { window.location.reload(); }
    }

}

//This function allows the user to mouse hover the black and white rice bowl
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // rice bowl images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the rice bowl image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}

//This function will hide the existing modal and present a modal with the selected review
//so that the user can attempt to change the rating and review
function editComment(element) {
    var token1 = sessionStorage.getItem("token");
    if (token1 != null) { //Checks if user if logged in
        var user1 = sessionStorage.getItem("currentuser");
        var item1 = element.getAttribute("item");
        if (user1 == review_array[item1].username) {
            var item = element.getAttribute("item");
            currentIndex = item;
            user1 = review_array[item].username;
            document.getElementById("edituserComments").value = review_array[item].reviews;
            console.log(review_array[item].rating);
            displayColorPopcorn('editpop', review_array[item].rating);
        }
        else {
            if (!alert('You are not allowed to edit this comment as it does not belong to you!')) { window.location.reload(); } //Deny users from editing reviews that dont belong to them
        }
    }
    else {
        if (!alert('You need to be signed in to edit your review!')) { window.location.reload(); } //Deny users from editing any reviews if they are logged in
    }
}

//This function sends the review data to the server for updating
function updateComment() {
    var response = confirm("Are you sure you want to update this comment ?");

    if (response == true) {
        var edit_review_url = review_url + "/" + review_array[currentIndex].review_id;
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateComment.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateComment.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].username = sessionStorage.getItem("currentuser");
        review_array[currentIndex].reviews = document.getElementById("edituserComments").value;
        review_array[currentIndex].rating = rating;
        updateComment.onload = function () {
            fetchReviews();
        };
        updateComment.send(JSON.stringify(review_array[currentIndex]));
    }
}

//This function displays the correct number of colored ricebowl
//based on the restaurant rating that is given in the user's review
function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

//This function deletes the selected review in a specific restaurant
function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?");
    var token1 = sessionStorage.getItem("token"); 
    var currentuser = sessionStorage.getItem("currentuser");
    if (token1 != null) { //checks for token
        var item2 = element.getAttribute("item");
        if (response == true) {
            if (review_array[item2].username == currentuser) { //Checks if the user that is trying to delete the review owns the review
                var item = element.getAttribute("item"); //get the current item
                var delete_comment_url = review_url + "/" + review_array[item].review_id;
                var eraseComment = new XMLHttpRequest();
                eraseComment.open("DELETE", delete_comment_url, true);
                eraseComment.onload = function () {
                    fetchReviews();
                };
                eraseComment.send();
                if(!alert('Review deleted!')){window.location.reload();} //Once deleted, refreshes page.
            }
            else{
                if(!alert('This review does not belong to you!')){window.location.reload();}  //If review does not belong to them, denies them and refreshes the page.
            }
        }
    }
    else{
        if(!alert('You need to be logged in to delete a review!')){window.location.reload();}
    }
}