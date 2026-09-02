function request(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(data ? "POST" : "GET", url, true);
  xhr.onload = function () {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send(data);
}

function loadPatientData() {
  request("api/index.php?action=patient_data", null, function (result) {
    var doctors = document.getElementById("doctor-id");
    var appointments = document.getElementById("appointment-list");
    doctors.innerHTML = '<option value="">Choose doctor</option>';
    appointments.innerHTML = "";
    for (var i = 0; i < result.doctors.length; i++)
      doctors.innerHTML +=
        '<option value="' +
        result.doctors[i].id +
        '">' +
        result.doctors[i].name +
        "</option>";
    for (var j = 0; j < result.appointments.length; j++) {
      var item = result.appointments[j];
      appointments.innerHTML +=
        "<tr><td>" +
        item.doctor_name +
        "</td><td>" +
        item.appointment_date +
        "</td><td>" +
        item.appointment_time +
        "</td><td>" +
        item.notes +
        "</td><td>" +
        item.status +
        "</td></tr>";
    }
    if (result.appointments.length == 0)
      appointments.innerHTML =
        '<tr><td colspan="5">No appointments yet.</td></tr>';
  });
}

document.getElementById("appointment-form").onsubmit = function (event) {
  event.preventDefault();
  var data = new FormData();
  data.append("doctor_id", document.getElementById("doctor-id").value);
  data.append("date", document.getElementById("appointment-date").value);
  data.append("time", document.getElementById("appointment-time").value);
  data.append("notes", document.getElementById("appointment-notes").value);
  request("api/index.php?action=book_appointment", data, function (result) {
    document.getElementById("message").innerHTML = result.message;
    if (result.success) {
      document.getElementById("appointment-form").reset();
      loadPatientData();
    }
  });
};
loadPatientData();
