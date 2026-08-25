function dashboardFunction() {
  document.getElementById("dashboard-content").style.display = "flex";
  document.getElementById("profile-content").style.display = "none";
  document.getElementById("appointment-content").style.display = "none";
  document.getElementById("leave-content").style.display = "none";
}

function profileFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("profile-content").style.display = "block";
  document.getElementById("appointment-content").style.display = "none";
  document.getElementById("leave-content").style.display = "none";
}

function appointmentStatusFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("profile-content").style.display = "none";
  document.getElementById("appointment-content").style.display = "block";
  document.getElementById("leave-content").style.display = "none";
}

function leaveApplicationFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("profile-content").style.display = "none";
  document.getElementById("appointment-content").style.display = "none";
  document.getElementById("leave-content").style.display = "block";
}

function updateProfileFunction() {
  alert("Profile updated successfully");
  return false;
}

function updateAppointmentFunction() {
  alert("Appointment status updated");
}

function submitLeaveFunction() {
  alert("Leave application submitted");
  return false;
}

function logoutFunction() {
  window.location.href = "index.html";
}
