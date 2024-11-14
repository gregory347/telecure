document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  fetchDoctors();
  populateDoctorSelect();
});

function fetchDoctors() {
  fetch("http://localhost:3000/doctors")
    .then((response) => response.json())
    .then((data) => {
      console.log("Doctors:", data);
      const doctorsList = document.getElementById("doctorsList");
      doctorsList.innerHTML = "";

      data.forEach((doctor) => {
        const div = document.createElement("div");
        div.innerText = `Dr. ${doctor.first_name} ${doctor.last_name} - Specialization: ${doctor.specialization}`;
        doctorsList.appendChild(div);
      });
    })
    .catch((error) => console.error("Error fetching doctors:", error));
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        this.reset();
      })
      .catch((error) => console.error("Error:", error));
  });

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch("/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      if (data === "Login successful") {
        window.location.reload();
      }
    })
    .catch((error) => console.error("Error:", error));
});

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/appointments", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        this.reset();
        loadAppointments();
      })
      .catch((error) => console.error("Error:", error));
  });

function loadAppointments() {
  fetch("/appointments")
    .then((response) => response.json())
    .then((data) => {
      const appointmentsList = document.getElementById("appointmentsList");
      appointmentsList.innerHTML = "";
      data.forEach((appointment) => {
        const div = document.createElement("div");
        div.innerText = `Appointment with Doctor ID ${appointment.doctor_id} on ${appointment.appointment_date} at ${appointment.appointment_time} - Status: ${appointment.status}`;
        appointmentsList.appendChild(div);
      });
    })
    .catch((error) => console.error("Error:", error));
}

document.getElementById("insuranceForm").addEventListener("submit", (event) => {
  const insuranceCompany = document.getElementById("insurance_company").value;
  const policyNumber = document.getElementById("policy_number").value;

  if (!insuranceCompany || !policyNumber) {
    event.preventDefault();
    alert("Please fill out all required fields.");
  }
});

document.getElementById("doctorForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch("/doctors", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      this.reset();
      loadDoctors();
    })
    .catch((error) => console.error("Error:", error));
});

function loadDoctors() {
  fetch("/doctors")
    .then((response) => response.json())
    .then((data) => {
      const doctorsList = document.getElementById("doctorsList");
      doctorsList.innerHTML = "";
      data.forEach((doctor) => {
        const div = document.createElement("div");
        div.innerText = `Dr. ${doctor.first_name} ${doctor.last_name} - Specialization: ${doctor.specialization}`;
        doctorsList.appendChild(div);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function populateDoctorSelect() {
  const doctorSelect = document.querySelector('select[name="doctor_id"]');
  fetch("/doctors")
    .then((response) => response.json())
    .then((data) => {
      doctorSelect.innerHTML = "";
      data.forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = `Dr. ${doctor.first_name} ${doctor.last_name} (${doctor.specialization})`;
        doctorSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}

document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  fetch("http://localhost:3000/patients", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      this.reset();
    })
    .catch((error) => console.error("Error:", error));
});

function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("active");
}

function openTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");

  const buttons = document.querySelectorAll(".tab-link");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
}

function logout() {
  window.location.href = "index.html";
}
