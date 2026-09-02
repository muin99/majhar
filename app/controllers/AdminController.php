<?php

require_once __DIR__ . "/../core/Controller.php";
require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../models/Appointment.php";
require_once __DIR__ . "/../models/Leave.php";

class AdminController extends Controller
{
    public function showPage()
    {
        if (!isset($_SESSION["user_id"]) || $_SESSION["user_role"] != "admin") { header("Location: index.php"); exit; }
        $this->view("admin");
    }

    public function getData()
    {
        $userModel = new User(); $appointmentModel = new Appointment(); $leaveModel = new Leave();
        echo json_encode(array("success" => true, "users" => $userModel->getAll(), "leaves" => $leaveModel->getAll(), "appointments" => $appointmentModel->countAll(), "pending_leaves" => $leaveModel->countPending()));
    }

    public function reviewLeave()
    {
        $status = $_POST["status"];
        if ($status != "approved" && $status != "rejected") { echo json_encode(array("success" => false, "message" => "Invalid decision.")); return; }
        $leaveModel = new Leave(); $leaveModel->review($_POST["leave_id"], $status);
        echo json_encode(array("success" => true, "message" => "Leave request updated."));
    }

    public function changeRole()
    {
        $role = $_POST["role"];
        if ($role != "patient" && $role != "doctor") { echo json_encode(array("success" => false, "message" => "Invalid role.")); return; }
        $userModel = new User(); $userModel->changeRole($_POST["user_id"], $role);
        echo json_encode(array("success" => true, "message" => "User role updated."));
    }
}