
let currentStep = 1;
let patientDetails = {}; 

function nextStep(step) {
    if (validateForm(currentStep)) {
        document.getElementById(`step${currentStep}`).style.display = "none";
        document.getElementById(`step${step}`).style.display = "block";
        currentStep = step;
    }
}

function validateForm(step) {
    if (step === 1) {
        const fullName = document.getElementById('fullname').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        if (!fullName || !dob || !gender || !phone || !address) {
            alert('Please fill all fields.');
            return false;
        }

        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number in the format ###-###-####.');
            return false;
        }

        patientDetails.fullname = fullName;
        patientDetails.dob = dob;
        patientDetails.gender = gender;
        patientDetails.phone = phone;
        patientDetails.address = address;
    } else if (step === 2) {
        const insuranceID = document.getElementById('insuranceID').value.trim();
        const medicalHistory = document.getElementById('medicalHistory').value.trim();
        const allergies = document.getElementById('allergies').value.trim();
        const primaryCarePhysician = document.getElementById('primaryCarePhysician').value.trim();

        const numericRegex = /^\d{6}$/;
        if (!numericRegex.test(insuranceID)) {
            alert('Please enter a valid Insurance ID(6 digit).');
            return false;
        }

        if (!insuranceID || !medicalHistory || !allergies || !primaryCarePhysician) {
            alert('Please fill all fields.');
            return false;
        }

        patientDetails.insuranceID = insuranceID;
        patientDetails.medicalHistory = medicalHistory;
        patientDetails.allergies = allergies;
        patientDetails.primaryCarePhysician = primaryCarePhysician;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    var dobInput = document.getElementById("dob");
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var maxDate = yesterday.toISOString().split("T")[0];
    dobInput.setAttribute("max", maxDate);
});

function submitForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be 6 to 20 characters & contain at least one numeric digit, one uppercase, and one lowercase letter.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!email || !password || !confirmPassword) {
        alert('Please fill all fields.');
        return;
    }

    patientDetails.email = email;
    patientDetails.password = password;

    const detailsContainer = document.getElementById('patientDetails');
    detailsContainer.innerHTML = ''; 

    const detailsHeader = document.createElement('h2');
    detailsHeader.textContent = 'Patient Details';
    detailsContainer.appendChild(detailsHeader);

    const detailsList = document.createElement('ul');
    for (const [key, value] of Object.entries(patientDetails)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        detailsList.appendChild(listItem);
    }
    detailsContainer.appendChild(detailsList);
}
