function logoutMe() { //Logs user out and remove any existing information in session storage
    
    $('#register').show();
    $('#login').show();
    $('#logoutMenu').hide();
    $('#accountMenu').hide();
    $('#logoutModal').modal('show');
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentuser");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("id");
    window.location.reload();
    
}