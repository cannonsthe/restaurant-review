function getUserInfo() { //Get array of users
    var request = new XMLHttpRequest();
    request.open('GET', user_url, true);

    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the user info into the array
        user_array = JSON.parse(request.responseText);
        console.log(user_array);
    };
    //This command starts the calling of the users web api
    request.send();
}

function displayAcc() { //Display current user information
    var i;
    var defaultt = 'images/default.png';
    var profpic;
    for (i = 0; i < user_array.length; i++) {
        if (sessionStorage.getItem("currentuser") == user_array[i].username) {
            console.log(user_array[i]);
            document.getElementById("userNAME").textContent = user_array[i].username;
            document.getElementById("datejoined").textContent = user_array[i].date_joined;
            if (user_array[i].profile_pic !== null) { //Sets a default profile picture if theres none in the database.
                var profpic = user_array[i].profile_pic;
                document.getElementById("profile_pic").src = profpic;
            }
            else {
                document.getElementById("profile_pic").src = defaultt;
            }
            console.log(profpic);
            sessionStorage.setItem("id", user_array[i].user_id);
        }
    }
}

function deleteAcc() { //Allows user to delete account
    var result = confirm("Delete account?");
    if (result) {
        for (i = 0; i < user_array.length; i++) {
            if (sessionStorage.getItem("id") == user_array[i].user_id) {
                var id = sessionStorage.getItem("id");
                var deleteUser = new XMLHttpRequest();
                var deleteURL = delete_url + "/" + id
                deleteUser.open("DELETE", deleteURL, true);
                deleteUser.onload = function () {
                    logoutMe();
                }
                deleteUser.send();
            }

        }
    }
}

function encode() { //Not used
    var selectedfile = document.getElementById("myinput").files;
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            picture = fileLoadedEvent.target.result;
            var newImage = document.getElementById('target');
            newImage.src = picture;
            var srcData = fileLoadedEvent.target.result;
            //alert(srcData);
        }
        fileReader.readAsDataURL(imageFile);
    }
}

function updateAcc() { //Allows user to update username and password. Automatically logs them out after updating
    var resultt = confirm("Confirm to update profile, you'll be logged out after confirming.");
    if (resultt == true) {
        var id = parseInt(sessionStorage.getItem("id"), 10);
        var currentuserr = sessionStorage.getItem("currentuser");
        for (var i = 0; i < user_array.length; i++) {
            if (user_array[i].username == currentuserr) {
                var updateUser = new XMLHttpRequest();
                var updateURL = urluser + "/" + id
                updateUser.open("PUT", updateURL, true);
                updateUser.setRequestHeader("Content-Type", "application/json");
                user_array[i].username = document.getElementById("updateNAME").value;
                user_array[i].password = document.getElementById("updatePASS").value;
                updateUser.send(JSON.stringify(user_array[i]));
                updateUser.onload = function () {
                    logoutMe();
                }
            }
        }
    }
}