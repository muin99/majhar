<?php

session_start();
header("Content-Type: application/json");

require_once __DIR__ . "/../app/controllers/AuthController.php";
require_once __DIR__ . "/../app/controllers/PatientController.php";
require_once __DIR__ . "/../app/controllers/DoctorController.php";
require_once __DIR__ . "/../app/controllers/AdminController.php";

$action = $_GET["action"];

if ($action == "login") { $controller = new AuthController(); $controller->login(); }
elseif ($action == "register") { $controller = new AuthController(); $controller->register(); }
elseif ($action == "logout") { $controller = new AuthController(); $controller->logout(); }
elseif ($action == "patient_data" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "patient") { $controller = new PatientController(); $controller->getData(); }
elseif ($action == "book_appointment" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "patient") { $controller = new PatientController(); $controller->book(); }
elseif ($action == "doctor_data" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "doctor") { $controller = new DoctorController(); $controller->getData(); }
elseif ($action == "update_appointment" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "doctor") { $controller = new DoctorController(); $controller->updateAppointment(); }
elseif ($action == "apply_leave" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "doctor") { $controller = new DoctorController(); $controller->applyLeave(); }
elseif ($action == "admin_data" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "admin") { $controller = new AdminController(); $controller->getData(); }
elseif ($action == "review_leave" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "admin") { $controller = new AdminController(); $controller->reviewLeave(); }
elseif ($action == "change_role" && isset($_SESSION["user_role"]) && $_SESSION["user_role"] == "admin") { $controller = new AdminController(); $controller->changeRole(); }
else { echo json_encode(array("success" => false, "message" => "You are not allowed to do this.")); }