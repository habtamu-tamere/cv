const { jsPDF } = window.jspdf;

// DOM Elements
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authButtons = document.getElementById('authButtons');
const userProfile = document.getElementById('userProfile');
const heroSection = document.getElementById('heroSection');
const appMain = document.getElementById('appMain');
const paymentSection = document.getElementById('paymentSection');
const cvBuilder = document.getElementById('cvBuilder');

// Auth State Management
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      authButtons.style.display = 'none';
      userProfile.style.display = 'flex';
      document.getElementById('userEmail').textContent = user.email;
      heroSection.style.display = 'none';
      appMain.style.display = 'block';
      
      // Check payment status
      db.collection("users").doc(user.uid).get().then((doc) => {
        if (doc.exists && doc.data().paid) {
          paymentSection.style.display = 'none';
          cvBuilder.style.display = 'block';
          updateCVPreview(); // Initialize preview
        }
      });
    } else {
      // No user
      authButtons.style.display = 'flex';
      userProfile.style.display = 'none';
      heroSection.style.display = 'flex';
      appMain.style.display = 'none';
      authModal.style.display = 'none';
    }
  });
}

// Modal Controls
document.getElementById('loginBtn').addEventListener('click', () => {
  authModal.style.display = 'flex';
  showLogin();
});

document.getElementById('registerBtn').addEventListener('click', () => {
  authModal.style.display = 'flex';
  showRegister();
});

document.getElementById('heroLoginBtn').addEventListener('click', () => {
  authModal.style.display = 'flex';
  showLogin();
});

document.getElementById('heroRegisterBtn').addEventListener('click', () => {
  authModal.style.display = 'flex';
  showRegister();
});

document.querySelector('.close-modal').addEventListener('click', () => {
  authModal.style.display = 'none';
});

function showLogin() {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
}

function showRegister() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
}

// Auth Functions (same as before, but with UI updates)
async function registerUser() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(userCredential.user.uid).set({
      email: email,
      paid: false,
      createdAt: new Date()
    });
    showToast('Registration successful!');
    authModal.style.display = 'none';
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    await auth.signInWithEmailAndPassword(email, password);
    showToast('Login successful!');
    authModal.style.display = 'none';
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function logout() {
  auth.signOut();
  showToast('Logged out successfully');
}

// Payment Handling
function initiatePayment() {
  const user = auth.currentUser;
  if (!user) return;
  
  showToast('Redirecting to Telebirr payment...');
  
  // Simulate payment processing
  setTimeout(async () => {
    try {
      await db.collection("users").doc(user.uid).update({ paid: true });
      showToast('Payment confirmed!', 'success');
      paymentSection.style.display = 'none';
      cvBuilder.style.display = 'block';
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
    }
  }, 2000);
}

// CV Generation
function updateCVPreview() {
  const name = document.getElementById('fullName').value || 'Your Name';
  const phone = document.getElementById('phone').value || 'Phone Number';
  const experience = document.getElementById('experience').value || 'Work experience details...';
  
  const previewHTML = `
    <div class="preview-cv">
      <h2>${name}</h2>
      <p>${phone}</p>
      <hr>
      <h3>Work Experience</h3>
      <p>${experience.replace(/\n/g, '<br>')}</p>
    </div>
  `;
  
  document.getElementById('cvPreview').innerHTML = previewHTML;
}

function generateCV() {
  const doc = new jsPDF();
  const name = document.getElementById('fullName').value;
  
  doc.setFontSize(22);
  doc.text(name, 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Phone: ${document.getElementById('phone').value}`, 105, 30, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Work Experience', 14, 45);
  
  doc.setFontSize(12);
  const experience = doc.splitTextToSize(
    document.getElementById('experience').value, 
    180
  );
  doc.text(experience, 14, 55);
  
  doc.save(`${name}-CV.pdf`);
  showToast('CV downloaded successfully!', 'success');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', updateCVPreview);
});

checkAuthState();
