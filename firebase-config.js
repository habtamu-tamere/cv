// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTqyN4RsgO8I2ejlz_rJn7DfqvBh0OhDI",
  authDomain: "jobstation-b43d3.firebaseapp.com",
  projectId: "jobstation-b43d3",
  storageBucket: "jobstation-b43d3.firebasestorage.app",
  messagingSenderId: "822682861338",
  appId: "1:822682861338:web:400404b05918ebfc13f6a3",
  measurementId: "G-JT88XXV9H4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
