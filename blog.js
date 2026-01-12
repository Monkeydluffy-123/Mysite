import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Ensure login function is accessible to the HTML button
window.login = function() {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Admin logged in");
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

// Handle UI changes on Auth state
const auth = getAuth();
onAuthStateChanged(auth, user => {
  const createBlogSection = document.getElementById("create-blog");
  if (user && user.email === "YOUR_ADMIN_EMAIL@gmail.com") {
    if(createBlogSection) createBlogSection.style.display = "block";
  } else {
    if(createBlogSection) createBlogSection.style.display = "none";
  }
});

let blogs = [
  {
    id: 1,
    author: "Siddhant",
    verified: true,
    title: "My First Tech Blog",
    content: `<p>This is a minimal tech blog example.</p>`,
    date: new Date().toLocaleString(),
    comments: [{id: 1, text: "Great post!", likes: 0, reply: ""}]
  }
];

function renderBlogs() {
  const blogContainer = document.getElementById('blog-container');
  if(!blogContainer) return;
  
  blogContainer.innerHTML = '';
  blogs.forEach(blog => {
    const blogEl = document.createElement('div');
    blogEl.className = 'blog-post';
    blogEl.innerHTML = `
      <h2>${blog.title}</h2>
      <div class="meta">${blog.author} ${blog.verified ? '✅' : ''} | ${blog.date}</div>
      <div class="content">${blog.content}</div>
    `;
    blogContainer.appendChild(blogEl);
  });
}

renderBlogs();