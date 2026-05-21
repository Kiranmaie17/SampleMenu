// Page_3_Careers/careers.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("applicationForm");
const submitBtn = document.getElementById("submitBtn");
const successDiv = document.getElementById("successMessage");
const errorDiv = document.getElementById("errorMessage");

// Field references
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const position = document.getElementById("position");
const experience = document.getElementById("experience");
const reason = document.getElementById("reason");

// Error spans
const nameErr = document.getElementById("nameError");
const emailErr = document.getElementById("emailError");
const phoneErr = document.getElementById("phoneError");
const positionErr = document.getElementById("positionError");
const reasonErr = document.getElementById("reasonError");

function clearErrors() {
    [nameErr, emailErr, phoneErr, positionErr, reasonErr].forEach(e => e.textContent = "");
    successDiv.style.display = "none";
    errorDiv.style.display = "none";
    successDiv.textContent = "";
    errorDiv.textContent = "";
}

function validateForm() {
    let isValid = true;
    clearErrors();

    if (!fullName.value.trim()) {
        nameErr.textContent = "Full name is required";
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        emailErr.textContent = "Valid email is required";
        isValid = false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
        phoneErr.textContent = "Valid 10-digit phone number required";
        isValid = false;
    }
    if (!position.value) {
        positionErr.textContent = "Please select a position";
        isValid = false;
    }
    if (!reason.value.trim() || reason.value.trim().length < 20) {
        reasonErr.textContent = "Please provide a reason (minimum 20 characters)";
        isValid = false;
    }
    return isValid;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
        const applicationData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            position: position.value,
            experience: parseFloat(experience.value) || 0,
            reason: reason.value.trim(),
            submittedAt: serverTimestamp()
        };
        await addDoc(collection(db, "applications"), applicationData);
        
        // Success
        successDiv.textContent = "✅ Application submitted successfully! We'll contact you soon.";
        successDiv.style.display = "block";
        form.reset();
        experience.value = "";
        setTimeout(() => successDiv.style.display = "none", 5000);
    } catch (err) {
        console.error("Firestore error:", err);
        errorDiv.textContent = "❌ Submission failed. Please check your internet and try again.";
        errorDiv.style.display = "block";
        setTimeout(() => errorDiv.style.display = "none", 4000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Application";
    }
});