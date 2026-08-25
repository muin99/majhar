var loginForm = document.getElementById("login-form");
var registrationForm = document.getElementById("registration-form");
var registrationLink = document.getElementById("registration-dekhao");
var loginLink = document.getElementById("login-dekhao");

function registration() {
  loginForm.style.display = "none";
  registrationForm.style.display = "block";
}

function login() {
  registrationForm.style.display = "none";
  loginForm.style.display = "block";
}

var dev = "dev@gmail.com";
function validateLogin() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email == "") {
    alert("Please enter your email");
    return false;
  }

  if (email.indexOf("@") == -1) {
    alert("Please enter a valid email");
    return false;
  }

  if (password == "") {
    alert("Please enter your password");
    return false;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  }

  return true;
}

function validateRegistration() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("register-email").value;
  var role = document.getElementById("role").value;
  var password = document.getElementById("register-password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (name == "") {
    alert("Please enter your name");
    return false;
  }

  if (email == "" || email.indexOf("@") == -1) {
    alert("Please enter a valid email");
    return false;
  }

  if (role == "") {
    alert("Please select a role");
    return false;
  }

  if (password.length < 4) {
    alert("Password must be at least 4 characters");
    return false;
  }

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return false;
  }

  return true;
}
