const { jsPDF } = window.jspdf;

// Auth Functions
function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function registerUser() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Save user to Firestore
      db.collection("users").doc(userCredential.user.uid).set({
        email: email,
        paid: false,
        createdAt: new Date()
      });
      alert("Registration successful!");
      checkAuthState();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      checkAuthState();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Payment Simulation (Telebirr)
function initiatePayment() {
  const user = auth.currentUser;
  if (!user) return;
  
  // In a real app, call Telebirr API here
  alert("Simulating Telebirr payment...");
  
  // Simulate successful payment after 2 sec
  setTimeout(() => {
    db.collection("users").doc(user.uid).update({ paid: true })
      .then(() => {
        alert("Payment confirmed! You can now generate your CV.");
        checkAuthState();
      });
  }, 2000);
}

// CV Generation
function generateCV() {
  const doc = new jsPDF();
  const name = document.getElementById('fullName').value;
  
  doc.text(`CV for ${name}`, 10, 10);
  doc.text(`Phone: ${document.getElementById('phone').value}`, 10, 20);
  doc.text("Work Experience:", 10, 30);
  doc.text(document.getElementById('experience').value, 10, 40);
  
  doc.save("my-cv.pdf");
}

// Check Auth State
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('authScreen').style.display = 'none';
      document.getElementById('appScreen').style.display = 'block';
      
      // Check if user paid
      db.collection("users").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists && doc.data().paid) {
            document.getElementById('paymentSection').style.display = 'none';
            document.getElementById('cvForm').style.display = 'block';
          }
        });
    } else {
      document.getElementById('authScreen').style.display = 'block';
      document.getElementById('appScreen').style.display = 'none';
    }
  });
}

// Initialize
checkAuthState();
