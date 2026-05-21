// Page_3_Careers/admin.js
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");
const loadingMsg = document.getElementById("loadingMessage");
const emptyMsg = document.getElementById("emptyMessage");
const tableBody = document.getElementById("appTableBody");

// Test credentials (create this user in Firebase Authentication):
// Email: admin@spicejunction.com , Password: admin123

async function loadApplications() {
    loadingMsg.style.display = "block";
    emptyMsg.style.display = "none";
    tableBody.innerHTML = "";
    try {
        const appsQuery = query(collection(db, "applications"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(appsQuery);
        const applications = [];
        querySnapshot.forEach((doc) => {
            applications.push({ id: doc.id, ...doc.data() });
        });
        loadingMsg.style.display = "none";
        if (applications.length === 0) {
            emptyMsg.textContent = "📭 No applications received yet.";
            emptyMsg.style.display = "block";
            return;
        }
        emptyMsg.style.display = "none";
        applications.forEach((app, idx) => {
            const row = tableBody.insertRow();
            const submittedDate = app.submittedAt ? new Date(app.submittedAt.seconds * 1000).toLocaleString() : "N/A";
            row.innerHTML = `
                <td>${idx+1}</td>
                <td>${app.fullName || "N/A"}</td>
                <td>${app.email}</td>
                <td>${app.phone}</td>
                <td>${app.position}</td>
                <td>${app.experience} yrs</td>
                <td>${app.reason.substring(0, 100)}${app.reason.length > 100 ? "..." : ""}</td>
                <td>${submittedDate}</td>
            `;
        });
    } catch (err) {
        console.error("Fetch error:", err);
        loadingMsg.textContent = "❌ Failed to load data. Check permissions.";
        loadingMsg.style.display = "block";
    }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        loadApplications();
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
        loginError.textContent = "";
        adminEmail.value = "";
        adminPassword.value = "";
    }
});

loginBtn.addEventListener("click", async () => {
    loginError.textContent = "";
    const email = adminEmail.value.trim();
    const password = adminPassword.value;
    if (!email || !password) {
        loginError.textContent = "Please enter email and password";
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        loginError.textContent = "Invalid email or password. Access denied.";
        console.error(error);
    }
});

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
});