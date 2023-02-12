jQuery(window).on('load',function () { //Checks for token in session storage to maintain a logged-in state
    var token1 = sessionStorage.getItem("token");
    if (token1 != null) {
        $('#guestDropDown').hide();
        $('#login').hide();
        $('#accountMenu').show();
        $('#logoutMenu').show();
        $('#register').hide();
    }
    else {
        $('#guestDropDown').show();
        $('#register').show();
        $('#login').show();
        $('#logoutMenu').hide();
        $('#logoutMenu').hide();
    }
});