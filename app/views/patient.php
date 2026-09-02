<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard</title>
    <link rel="stylesheet" href="styles/portal.css">
</head>

<body>
    <header>
        <div><strong>Majhar Hospital</strong><span>Patient dashboard</span></div>
        <div><?php echo $_SESSION["user_name"]; ?> | <a href="index.php?page=logout">Logout</a></div>
    </header>
    <main>
        <h1>Book an appointment</h1>
        <p id="message"></p>
        <section class="card">
            <form id="appointment-form" class="grid"><label>Doctor<select id="doctor-id" required>
                        <option value="">Choose doctor</option>
                    </select></label><label>Date<input type="date" id="appointment-date"
                        required></label><label>Time<input type="time" id="appointment-time" required></label><label
                    class="wide">Notes<textarea id="appointment-notes" rows="3"></textarea></label><button>Book
                    appointment</button></form>
        </section>
        <section class="card">
            <h2>My appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="appointment-list"></tbody>
            </table>
        </section>
    </main>
    <script src="scripts/patient-ajax.js"></script>
</body>

</html>