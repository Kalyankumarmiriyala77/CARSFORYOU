import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBb5nCWOKgu4B5UuJWLPYmYqPC2U0NwMfk",
    authDomain: "cars-registerations.firebaseapp.com",
    projectId: "cars-registerations",
    storageBucket: "cars-registerations.firebasestorage.app",
    messagingSenderId: "757300130552",
    appId: "1:757300130552:web:c2dcbb0e459620391ac10d",
    measurementId: "G-WW993G18CG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Function to Register User
function registerUser(event) {
    event.preventDefault(); // Prevent form from refreshing

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("errorMessage").innerText = "Passwords do not match!";
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return db.collection("users").doc(userCredential.user.uid).set({
                fullname: fullname,
                email: email,
                username: username
            });
        })
        .then(() => {
            alert("Registration Successful!");
            window.location.href = "login.html";
        })
        .catch(error => {
            document.getElementById("errorMessage").innerText = error.message;
            console.error("Error:", error.message);
        });
}