<?php
// database.php
$servername = "localhost";
$username = "telecure_user";  // Update with your MySQL username
$password = "your_password";   // Update with your MySQL password
$dbname = "telecure";          // The name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
