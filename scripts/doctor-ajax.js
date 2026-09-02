var ENDPOINT = "app/controllers/DoctorController.php";

function request(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(data ? "POST" : "GET", url, true);
  xhr.onload = function () { callback(JSON.parse(xhr.responseText)); };
  xhr.send(data);
}

function statusBadge(status) {
  return '<span class="status ' + status + '">' + status + "</span>";
}

var doctorLeaves = [];

function loadDoctorData() {
  request(ENDPOINT + "?action=doctor_data", null, function (result) {
    var appointmentList = document.getElementById("appointment-list");
    appointmentList.innerHTML = "";
    for (var i = 0; i < result.appointments.length; i++) {
      var item = result.appointments[i];
      var action = "-";
      if (item.status == "pending") {
        action = '<div class="inline">' +
          '<button onclick="updateAppointment(' + item.id + ', \'approved\')">Approve</button>' +
          '<button class="danger" onclick="updateAppointment(' + item.id + ', \'cancelled\')">Cancel</button>' +
          "</div>";
      } else if (item.status == "approved") {
        action = '<div class="inline">' +
          '<button onclick="updateAppointment(' + item.id + ', \'completed\')">Complete</button>' +
          '<button class="danger" onclick="updateAppointment(' + item.id + ', \'cancelled\')">Cancel</button>' +
          "</div>";
      }
      appointmentList.innerHTML += "<tr><td>" + item.patient_name + "</td><td>" + item.appointment_date + "</td><td>" + item.appointment_time + "</td><td>" + item.notes + "</td><td>" + statusBadge(item.status) + "</td><td>" + action + "</td></tr>";
    }
    if (result.appointments.length == 0) appointmentList.innerHTML = '<tr><td colspan="6">No appointments yet.</td></tr>';

    doctorLeaves = result.leaves;
    var leaveList = document.getElementById("leave-list");
    leaveList.innerHTML = "";
    for (var j = 0; j < result.leaves.length; j++) {
      var leave = result.leaves[j];
      var leaveAction = "-";
      if (leave.status == "pending") {
        leaveAction = '<div class="inline">' +
          '<button onclick="editLeave(' + leave.id + ')">Edit</button>' +
          '<button class="danger" onclick="deleteLeave(' + leave.id + ')">Delete</button>' +
          "</div>";
      }
      leaveList.innerHTML += "<tr><td>" + leave.start_date + "</td><td>" + leave.end_date + "</td><td>" + leave.reason + "</td><td>" + statusBadge(leave.status) + "</td><td>" + leaveAction + "</td></tr>";
    }
    if (result.leaves.length == 0) leaveList.innerHTML = '<tr><td colspan="5">No leave applications yet.</td></tr>';
  });
}

function updateAppointment(appointmentId, status) {
  var label = status == "approved" ? "approve" : status == "completed" ? "mark as completed" : "cancel";
  if (!confirm("Are you sure you want to " + label + " this appointment?")) return;
  var data = new FormData();
  data.append("appointment_id", appointmentId);
  data.append("status", status);
  request(ENDPOINT + "?action=update_appointment", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    loadDoctorData();
  });
}

function findLeave(id) {
  for (var i = 0; i < doctorLeaves.length; i++) {
    if (doctorLeaves[i].id == id) return doctorLeaves[i];
  }
  return null;
}

function editLeave(id) {
  var leave = findLeave(id);
  if (!leave) return;
  document.getElementById("leave-id").value = leave.id;
  document.getElementById("start-date").value = leave.start_date;
  document.getElementById("end-date").value = leave.end_date;
  document.getElementById("leave-reason").value = leave.reason;
  document.getElementById("leave-form-title").innerHTML = "Edit leave application";
  document.getElementById("leave-submit").innerHTML = "Update leave request";
  document.getElementById("leave-cancel").style.display = "inline-block";
}

function resetLeaveForm() {
  document.getElementById("leave-form").reset();
  document.getElementById("leave-id").value = "";
  document.getElementById("leave-form-title").innerHTML = "Apply for leave";
  document.getElementById("leave-submit").innerHTML = "Submit leave request";
  document.getElementById("leave-cancel").style.display = "none";
}

document.getElementById("leave-cancel").onclick = function () {
  resetLeaveForm();
};

function deleteLeave(leaveId) {
  if (!confirm("Delete this leave application?")) return;
  var data = new FormData();
  data.append("leave_id", leaveId);
  request(ENDPOINT + "?action=delete_leave", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    loadDoctorData();
  });
}

document.getElementById("leave-form").onsubmit = function (event) {
  event.preventDefault();
  var leaveId = document.getElementById("leave-id").value;
  var confirmMessage = leaveId == "" ? "Submit this leave request?" : "Save changes to this leave request?";
  if (!confirm(confirmMessage)) return;
  var data = new FormData();
  data.append("start_date", document.getElementById("start-date").value);
  data.append("end_date", document.getElementById("end-date").value);
  data.append("reason", document.getElementById("leave-reason").value);

  if (leaveId == "") {
    request(ENDPOINT + "?action=apply_leave", data, function (result) {
      document.getElementById("message").innerHTML = result.message;
      if (result.success) resetLeaveForm();
      loadDoctorData();
    });
  } else {
    data.append("leave_id", leaveId);
    request(ENDPOINT + "?action=update_leave", data, function (result) {
      document.getElementById("message").innerHTML = result.message;
      if (result.success) resetLeaveForm();
      loadDoctorData();
    });
  }
};

loadDoctorData();
