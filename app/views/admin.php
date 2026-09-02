<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles/portal.css">
</head>

<body>
    <header>
        <div><strong>Majhar Hospital</strong><span>Administrator dashboard</span></div>
        <div><?php echo $_SESSION["user_name"]; ?> | <a href="index.php?page=logout">Logout</a></div>
    </header>
    <main>
        <h1>Administrator dashboard</h1>
        <p id="message"></p>
        <section class="stats">
            <div><b id="user-count">0</b><span>Users</span></div>
            <div><b id="appointment-count">0</b><span>Appointments</span></div>
            <div><b id="leave-count">0</b><span>Pending leaves</span></div>
        </section>
        <section class="card">
            <h2>Leave applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Dates</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="leave-list"></tbody>
            </table>
        </section>
        <section class="card">
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Change role</th>
                    </tr>
                </thead>
                <tbody id="user-list"></tbody>
            </table>
        </section>
    </main>
    <script src="scripts/admin-ajax.js"></script>
</body>

</html>