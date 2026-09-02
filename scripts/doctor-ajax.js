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

function loadDoctorData() {
  request("api/index.php?action=doctor_data", null, function (result) {
    var appointmentList = document.getElementById("appointment-list");
    appointmentList.innerHTML = "";
    for (var i = 0; i < result.appointments.length; i++) {
      var item = result.appointments[i];
      var action = "-";
      if (item.status == "pending") {
        action =
          '<div class="inline">' +
          '<button onclick="updateAppointment(' +
          item.id +
          ", 'approved')\">Approve</button>" +
          '<button class="danger" onclick="updateAppointment(' +
          item.id +
          ", 'cancelled')\">Cancel</button>" +
          "</div>";
      } else if (item.status == "approved") {
        action =
          '<div class="inline">' +
          '<button onclick="updateAppointment(' +
          item.id +
          ", 'completed')\">Complete</button>" +
          '<button class="danger" onclick="updateAppointment(' +
          item.id +
          ", 'cancelled')\">Cancel</button>" +
          "</div>";
      }
      appointmentList.innerHTML +=
        "<tr><td>" +
        item.patient_name +
        "</td><td>" +
        item.appointment_date +
        "</td><td>" +
        item.appointment_time +
        "</td><td>" +
        item.notes +
        "</td><td>" +
        statusBadge(item.status) +
        "</td><td>" +
        action +
        "</td></tr>";
    }
    if (result.appointments.length == 0)
      appointmentList.innerHTML =
        '<tr><td colspan="6">No appointments yet.</td></tr>';

    var leaveList = document.getElementById("leave-list");
    leaveList.innerHTML = "";
    for (var j = 0; j < result.leaves.length; j++) {
      var leave = result.leaves[j];
      leaveList.innerHTML +=
        "<tr><td>" +
        leave.start_date +
        "</td><td>" +
        leave.end_date +
        "</td><td>" +
        leave.reason +
        "</td><td>" +
        statusBadge(leave.status) +
        "</td></tr>";
    }
    if (result.leaves.length == 0)
      leaveList.innerHTML =
        '<tr><td colspan="4">No leave applications yet.</td></tr>';
  });
}

function updateAppointment(appointmentId, status) {
  var data = new FormData();
  data.append("appointment_id", appointmentId);
  data.append("status", status);
  request("api/index.php?action=update_appointment", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    loadDoctorData();
  });
}

document.getElementById("leave-form").onsubmit = function (event) {
  event.preventDefault();
  var data = new FormData();
  data.append("start_date", document.getElementById("start-date").value);
  data.append("end_date", document.getElementById("end-date").value);
  data.append("reason", document.getElementById("leave-reason").value);
  request("api/index.php?action=apply_leave", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    if (result.success) {
      document.getElementById("leave-form").reset();
    }
    loadDoctorData();
  });
};

loadDoctorData();
