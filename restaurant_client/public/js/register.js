function registerMe() { //Allows user to create a new account


    var registerUser = new XMLHttpRequest();

    registerUser.open("POST", "http://127.0.0.1:8080/adduser", true);

    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function () {

        $('#registerModal').modal('hide');
        $('#successModal').modal('show');

    }

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var profile_pic = document.getElementById("profile_pic").src="images/default.png";

    var payload = { username: username, password: password, profile_pic: profile_pic}
    registerUser.send(JSON.stringify(payload))
}

function loginMe() { //Logs in user, if wrong details; redirected to a modal that indicates failure


    var loginUser = new XMLHttpRequest();

    loginUser.open("POST", "http://127.0.0.1:8080/login", true);

    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function () {

        $('#loginModal').modal('hide');

        var token = JSON.parse(loginUser.responseText);
        console.log(token.result);
        if (token.result != false) {
            $('#successsModal').modal('show');
            document.getElementById("register").style.display = "none";
            document.getElementById("login").style.display = "none";
            document.getElementById("accountMenu").style.display = "block";
            document.getElementById("logoutMenu").style.display = "block";
            sessionStorage.setItem("token", token.result);
            sessionStorage.setItem("currentuser", username);
            sessionStorage.setItem("password", password);
        } else {
            $('#failModal').modal('show');
        }

    }

    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    var payload = { username: username, password: password }
    loginUser.send(JSON.stringify(payload))
}

function redirectLogin() { //When click log in button on register modal, hides current modal.
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
}