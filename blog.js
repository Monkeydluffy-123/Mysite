import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// 1. Monitor Login State
onAuthStateChanged(auth, user => {
  const adminPanel = document.getElementById("create-blog");
  // Replace with your actual admin email
  if (user && user.email === "siddhantmujalgekar601@gmail.com") {
    if(adminPanel) adminPanel.style.display = "block";
  } else {
    if(adminPanel) adminPanel.style.display = "none";
  }
});

// 2. Login Function
window.login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Login Successful!"))
    .catch(err => alert("Login Failed: " + err.message));
};

// 3. Save Post to Firebase
window.savePost = async () => {
  const title = document.getElementById("new-title").value;
  const content = document.getElementById("new-content").value;

  try {
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      date: new Date().toLocaleString(),
      author: "Siddhant"
    });
    alert("Post Published!");
    location.reload(); // Refresh to see the new post
  } catch (e) {
    alert("Error adding document: " + e.message);
  }
};
