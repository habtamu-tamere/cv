// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAEzJ7GpEjLnFldkMaDO8yHagwQ654490Q",
    authDomain: "ebook-d2d5d.firebaseapp.com",
    projectId: "ebook-d2d5d",
    storageBucket: "ebook-d2d5d.firebasestorage.app",
    messagingSenderId: "326709138585",
    appId: "1:326709138585:web:3e5b4f6c8390ce00a09408",
    measurementId: "G-2Y2GTFZ2FQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
