function createAccount() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    var id = Math.floor(Math.random() * 21467448);

    window.location = "creatingAccount/" + id + "/" + user + "/" + pass;
}