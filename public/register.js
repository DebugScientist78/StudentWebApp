function createAccount() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    window.location = "creatingAccount/" + user + "/" + pass;
}