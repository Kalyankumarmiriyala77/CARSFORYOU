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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function registerUser(event) {
    event.preventDefault(); // Prevent form submission to server

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
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch(error => {
            document.getElementById("errorMessage").innerText = error.message;
        });
        const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,15}$/;
        if (password === "") {
            errorMessage.textContent = "Password is required.";
            return false;
        } else if (!passwordPattern.test(password)) {
            errorMessage.textContent = "Password must be 6-15 characters, contain at least one uppercase letter, one number, and one special character.";
            return false;
        }

        errorMessage.textContent = ""; // Clear any previous error messages
        return true;
    }

    function togglePasswordVisibility(fieldId) {
        const passwordField = document.getElementById(fieldId);
        const toggleIcon = passwordField.nextElementSibling;

        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleIcon.textContent = "🙈";  // Change icon to hide
        } else {
            passwordField.type = "password";
            toggleIcon.textContent = "👁️";  // Change icon to show
        }
}
