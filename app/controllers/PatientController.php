<?php

require_once __DIR__ . "/../core/Controller.php";
require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../models/Appointment.php";

class PatientController extends Controller
{
    public function showPage()
    {
        if (!isset($_SESSION["user_id"]) || $_SESSION["user_role"] != "patient") { header("Location: index.php"); exit; }
        $this->view("patient");
    }

    public function getData()
    {
        $userModel = new User(); $appointmentModel = new Appointment();
        echo json_encode(array("success" => true, "doctors" => $userModel->getDoctors(), "appointments" => $appointmentModel->getForPatient($_SESSION["user_id"])));
    }

    public function book()
    {
        $doctorId = $_POST["doctor_id"]; $date = $_POST["date"]; $time = $_POST["time"]; $notes = trim($_POST["notes"]);
        if ($doctorId == "" || $date == "" || $time == "") { echo json_encode(array("success" => false, "message" => "Please choose doctor, date and time.")); return; }
        $appointmentModel = new Appointment(); $appointmentModel->create($_SESSION["user_id"], $doctorId, $date, $time, $notes);
        echo json_encode(array("success" => true, "message" => "Appointment request sent."));
    }
}