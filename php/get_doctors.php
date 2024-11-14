<?php

include('db.php');

// Query the doctors table
$sql = "SELECT first_name, last_name, specialization FROM doctors";
$result = $conn->query($sql);

// Initialize an array to store the doctor data
$doctors = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $doctors[] = $row;  // Add each doctor to the array
    }
}

// Return the doctor data as JSON
echo json_encode($doctors);

// Close the database connection
$conn->close();
?>
