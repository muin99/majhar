<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Dashboard</title>
    <link rel="stylesheet" href="styles/portal.css">
</head>

<body>
    <header>
        <div><strong>Majhar Hospital</strong><span>Doctor dashboard</span></div>
        <div><?php echo $_SESSION["user_name"]; ?> | <a href="index.php?page=logout">Logout</a></div>
    </header>
    <main>
        <h1>Doctor dashboard</h1>
        <p id="message"></p>
        <section class="card">
            <h2>Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="appointment-list"></tbody>
            </table>
        </section>
        <section class="card">
            <h2>Leave application</h2>
            <form id="leave-form" class="grid"><label>Start date<input type="date" id="start-date"
                        required></label><label>End date<input type="date" id="end-date" required></label><label
                    class="wide">Reason<textarea id="leave-reason" rows="3" required></textarea></label><button>Submit
                    leave request</button></form>
            <h3>My leave applications</h3>
            <table>
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="leave-list"></tbody>
            </table>
        </section>
    </main>
    <script src="scripts/doctor-ajax.js"></script>
</body>

</html>