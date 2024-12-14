
async function fetchPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      displayPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
}
  
async function fetchComments(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}
  
  async function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    
    for (let post of posts) {
      const comments = await fetchComments(post.id);
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      
      postElement.innerHTML = `
        <div class="post-header">
          ${post.title}
        </div>
        <div class="post-body">
          ${post.body}
        </div>
        <div class="comment-section">
          <h4>Comments</h4>
          ${comments.map(comment => `
            <div class="comment">
              <div class="comment-name">${comment.name}</div>
              <div class="comment-email">${comment.email}</div>
              <p>${comment.body}</p>
            </div>
          `).join('')}
        </div>
      `;
      postsContainer.appendChild(postElement);
    }
  }
  fetchPosts();