var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");

document.getElementById("show-register").onclick = function (event) {
  event.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
};

document.getElementById("show-login").onclick = function (event) {
  event.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
};

function sendRequest(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.onload = function () {
    callback(JSON.parse(request.responseText));
  };
  request.send(data);
}

loginForm.onsubmit = function (event) {
  event.preventDefault();
  var data = new FormData();
  data.append("email", document.getElementById("login-email").value);
  data.append("password", document.getElementById("login-password").value);
  sendRequest("api/index.php?action=login", data, function (result) {
    document.getElementById("login-message").innerHTML = result.message;
    if (result.success) window.location.href = "index.php?page=" + result.role;
  });
};

registerForm.onsubmit = function (event) {
  event.preventDefault();
  var data = new FormData();
  data.append("name", document.getElementById("register-name").value);
  data.append("email", document.getElementById("register-email").value);
  data.append("role", document.getElementById("register-role").value);
  data.append("password", document.getElementById("register-password").value);
  data.append(
    "confirm_password",
    document.getElementById("confirm-password").value,
  );
  sendRequest("api/index.php?action=register", data, function (result) {
    document.getElementById("register-message").innerHTML = result.message;
    if (result.success) {
      registerForm.reset();
      document.getElementById("show-login").click();
    }
  });
};
