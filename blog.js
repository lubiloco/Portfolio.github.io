// Sample posts data
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// DOM elements
const postsContainer = document.getElementById('posts');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const newPostBtn = document.getElementById('new-post-btn');
const closeBtn = document.querySelector('.close');
const postForm = document.getElementById('post-form');

// Event listeners
newPostBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
postForm.addEventListener('submit', addPost);
postsContainer.addEventListener('click', deletePost);

// Display posts
function displayPosts() {
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Modal functions
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Add new post
function addPost(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title.trim() && content.trim()) {
        const newPost = { title, content };
        posts.unshift(newPost); // Add new post to the beginning of the array
        savePosts();
        displayPosts();
        closeModal();
        postForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// Delete post
function deletePost(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        posts.splice(index, 1);
        savePosts();
        displayPosts();
    }
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial display
displayPosts();
