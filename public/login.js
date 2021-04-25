function login() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    window.location = "login/" + user + "/" + pass;
}