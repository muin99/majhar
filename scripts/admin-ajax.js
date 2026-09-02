function request(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(data ? "POST" : "GET", url, true);
  xhr.onload = function () {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send(data);
}

function statusBadge(status) {
  return '<span class="status ' + status + '">' + status + "</span>";
}

function loadAdminData() {
  request("api/index.php?action=admin_data", null, function (result) {
    document.getElementById("user-count").innerHTML = result.users.length;
    document.getElementById("appointment-count").innerHTML =
      result.appointments;
    document.getElementById("leave-count").innerHTML = result.pending_leaves;

    var leaveList = document.getElementById("leave-list");
    leaveList.innerHTML = "";
    for (var i = 0; i < result.leaves.length; i++) {
      var leave = result.leaves[i];
      var action = "-";
      if (leave.status == "pending") {
        action =
          '<div class="inline">' +
          '<button onclick="reviewLeave(' +
          leave.id +
          ", 'approved')\">Approve</button>" +
          '<button class="danger" onclick="reviewLeave(' +
          leave.id +
          ", 'rejected')\">Reject</button>" +
          "</div>";
      }
      leaveList.innerHTML +=
        "<tr><td>" +
        leave.doctor_name +
        "</td><td>" +
        leave.start_date +
        " to " +
        leave.end_date +
        "</td><td>" +
        leave.reason +
        "</td><td>" +
        statusBadge(leave.status) +
        "</td><td>" +
        action +
        "</td></tr>";
    }
    if (result.leaves.length == 0)
      leaveList.innerHTML =
        '<tr><td colspan="5">No leave applications yet.</td></tr>';

    var userList = document.getElementById("user-list");
    userList.innerHTML = "";
    for (var j = 0; j < result.users.length; j++) {
      var user = result.users[j];
      var roleControl = "-";
      if (user.role == "doctor") {
        roleControl =
          '<button onclick="changeRole(' +
          user.id +
          ", 'patient')\">Make patient</button>";
      } else if (user.role == "patient") {
        roleControl =
          '<button onclick="changeRole(' +
          user.id +
          ", 'doctor')\">Make doctor</button>";
      }
      userList.innerHTML +=
        "<tr><td>" +
        user.name +
        "</td><td>" +
        user.email +
        "</td><td>" +
        user.role +
        "</td><td>" +
        roleControl +
        "</td></tr>";
    }
  });
}

function reviewLeave(leaveId, status) {
  var data = new FormData();
  data.append("leave_id", leaveId);
  data.append("status", status);
  request("api/index.php?action=review_leave", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    loadAdminData();
  });
}

function changeRole(userId, role) {
  var data = new FormData();
  data.append("user_id", userId);
  data.append("role", role);
  request("api/index.php?action=change_role", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    loadAdminData();
  });
}

loadAdminData();
