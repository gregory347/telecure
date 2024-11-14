<?php
// add_patient.php
include 'database.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->first_name) && isset($data->last_name) &&
    isset($data->email) && isset($data->password) &&
    isset($data->phone_number) && isset($data->gender) &&
    isset($data->dob)
) {
    $stmt = $conn->prepare("INSERT INTO patients (first_name, last_name, email, password, phone_number, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssss",
        $data->first_name,
        $data->last_name,
        $data->email,
        $data->password,
        $data->phone_number,
        $data->gender,
        $data->dob
    );

    if ($stmt->execute()) {
        echo json_encode(["message" => "Patient created successfully", "patient_id" => $stmt->insert_id]);
    } else {
        echo json_encode(["message" => "Error creating patient"]);
    }
    $stmt->close();
} else {
    echo json_encode(["message" => "All fields are required"]);
}

$conn->close();
?>
