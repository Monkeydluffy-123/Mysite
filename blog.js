import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Grab Firebase instances from the window (initialized in index.html)
const auth = window.auth || getAuth();

// Monitor login state to show/hide the "Create Post" section
onAuthStateChanged(auth, user => {
  const createBlogSection = document.getElementById("create-blog");
  // Replace with your actual Firebase admin email
  if (user && user.email === "siddhantmujalgekar601@gmail.com") {
    if(createBlogSection) createBlogSection.style.display = "block";
  } else {
    if(createBlogSection) createBlogSection.style.display = "none";
  }
});

// Admin Login Function linked to the button in index.html
window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Login Successful!"))
    .catch((error) => alert("Login failed: " + error.message));
};

// Function to handle local blog posting
window.saveBlog = function() {
    const title = document.getElementById("new-title").value;
    const content = document.getElementById("new-content").value;
    
    const newPost = {
        id: Date.now(),
        author: "Siddhant",
        verified: true,
        title: title,
        content: `<p>${content}</p>`,
        date: new Date().toLocaleString()
    };
    
    blogs.unshift(newPost); // Adds the new post to the top of the list
    renderBlogs();
    alert("Post Published!");
};

let blogs = [
  {
    id: 1,
    author: "Siddhant",
    verified: true,
    title: "My First Tech Blog",
    content: `<p>This is a minimal tech blog example.</p>`,
    date: new Date().toLocaleString()
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
