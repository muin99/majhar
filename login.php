<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form Result</title>
</head>
<body>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formType = $_POST["form-type"];
    $email = trim($_POST["email"]);
    $password = $_POST["password"];



    if ($email == "") {
        echo "Email is required.<br>";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email is not valid.<br>";
    } elseif (strlen($password) < 8) {
        echo "Password must be at least 8 characters.<br>";
    } elseif ($formType == "login") {
        echo "Login form is valid.";
    } elseif ($formType == "registration") {
        $name = trim($_POST["name"]);
        $role = $_POST["role"];
        $confirmPassword = $_POST["confirm-password"];

        if ($name == "") {
            echo "Name is required.<br>";
        } elseif ($role == "") {
            echo "Role is required.<br>";
        } elseif ($password != $confirmPassword) {
            echo "Passwords do not match.<br>";
        } else {
            echo "Registration form is valid.";
        }
    }

    if($email == "admin@admin.com" && $password == "admin123") {
        header("Location: admin.html");
        exit();
    } elseif($email == "doctor@doctor.com" && $password == "doctor123") {
        header("Location: doctor.html");
        exit();
    }
    else{
        echo "Invalid email or password.";
    }
}
?>

<br><br>
<a href="index.html">Go back</a>

</body>
</html>
