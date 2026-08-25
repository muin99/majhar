function dashboardFunction() {
  document.getElementById("dashboard-content").style.display = "flex";
  document.getElementById("manage-user-content").style.display = "none";
  document.getElementById("assign-role-content").style.display = "none";
  document.getElementById("system-data-content").style.display = "none";
  document.getElementById("activity-content").style.display = "none";
}

function manageUserFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("manage-user-content").style.display = "block";
  document.getElementById("assign-role-content").style.display = "none";
  document.getElementById("system-data-content").style.display = "none";
  document.getElementById("activity-content").style.display = "none";
}

function assignRoleFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("manage-user-content").style.display = "none";
  document.getElementById("assign-role-content").style.display = "block";
  document.getElementById("system-data-content").style.display = "none";
  document.getElementById("activity-content").style.display = "none";
}

function viewDataFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("manage-user-content").style.display = "none";
  document.getElementById("assign-role-content").style.display = "none";
  document.getElementById("system-data-content").style.display = "block";
  document.getElementById("activity-content").style.display = "none";
}

function monitorActivityFunction() {
  document.getElementById("dashboard-content").style.display = "none";
  document.getElementById("manage-user-content").style.display = "none";
  document.getElementById("assign-role-content").style.display = "none";
  document.getElementById("system-data-content").style.display = "none";
  document.getElementById("activity-content").style.display = "block";
}

function addUserFunction() {
  alert("User added successfully");
  return false;
}

function deleteUserFunction() {
  alert("User deleted successfully");
}

function saveRoleFunction() {
  alert("Role assigned successfully");
  return false;
}

function logoutFunction() {
  window.location.href = "index.html";
}
