import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const auth = getAuth();

// Show editor only for the Admin
onAuthStateChanged(auth, user => {
  const adminEmail = "siddhantmujalgekar601@gmail.com"; // Change to your actual admin email
  const editor = document.getElementById("create-blog");
  
  if (user && user.email === adminEmail) {
    if (editor) editor.style.display = "block";
  } else {
    if (editor) editor.style.display = "none";
  }
});

// Admin Login Function
window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Logged in successfully!"))
    .catch(err => alert("Error: " + err.message));
};

// Simplified Blog Data for rendering
let blogs = [
  {
    id: 1,
    author: "Siddhant",
    verified: true,
    title: "My First Tech Blog",
    content: "<p>This is a minimal tech blog example.</p>",
    date: new Date().toLocaleString()
  }
];

function renderBlogs() {
  const container = document.getElementById('blog-container');
  if (!container) return;
  
  container.innerHTML = blogs.map(blog => `
    <div class="blog-post">
      <h2>${blog.title}</h2>
      <div class="meta">${blog.author} ${blog.verified ? '✅' : ''} | ${blog.date}</div>
      <div class="content">${blog.content}</div>
    </div>
  `).join('');
}

renderBlogs();
