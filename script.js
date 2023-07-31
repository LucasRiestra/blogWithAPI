const urlPost1 = "https://jsonplaceholder.typicode.com/posts/";
const urlUsers = "https://jsonplaceholder.typicode.com/users/";
const urlComments = "https://jsonplaceholder.typicode.com/posts/:id/comments";

const postList1 = document.querySelector("#postList1");
const postList2 = document.querySelector("#postList2");

const myInput = document.getElementById('myInput')
let usersData;
let arraysPost = []; // Declarar arraysPost fuera de los bloques de código

fetch(urlUsers)
  .then((response) => response.json())
  .then((data) => {
    usersData = data;
  });

fetch(urlPost1)
  .then((response) => response.json())
  .then((data) => {
    arraysPost = data.slice(0, 8); // Asignar el valor de data a arraysPost
    arraysPost.forEach((post1) => {
      const li = document.createElement("li");
      const titleElement = document.createElement("h3");
      titleElement.textContent = post1.title;
      loadedPosts += 1;
      
      titleElement.addEventListener("click", () => {
        selectedPost = post1;
        document.getElementById("postModalTitle").textContent = post1.title;
        document.getElementById("postModalBody").textContent = post1.body;
        
        const user = usersData.find((user) => user.id === post1.id);
        if (user) {
          document.getElementById("postModalUserName").textContent = "Author: " + user.name;
          document.getElementById("postModalUserEmail").textContent = "Email: " + user.email;
        }
      });

      titleElement.setAttribute("data-bs-toggle", "modal");
      titleElement.setAttribute("data-bs-target", "#postModal");

      li.appendChild(titleElement);
      postList1.appendChild(li);

      const hrElement = document.createElement("hr");
      postList1.appendChild(hrElement);
    });
  });
  
let loadedPosts = 0;
const postsPerPage = 8;

function loadMorePosts() {
  const urlPost1 = `https://jsonplaceholder.typicode.com/posts/?_start=${loadedPosts}&_limit=${postsPerPage}`;

  fetch(urlPost1)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post1) => {
        const li = document.createElement("li");

        const titleElement = document.createElement("h3");
        titleElement.textContent = post1.title;

        titleElement.setAttribute("data-post-id", post1.id);

        titleElement.setAttribute("data-bs-toggle", "modal");
        titleElement.setAttribute("data-bs-target", "#postModal");
        titleElement.addEventListener("click", () => {
          selectedPost = post1;
          document.getElementById("postModalTitle").textContent = post1.title;
          document.getElementById("postModalBody").textContent = post1.body;
          const user = usersData.find((user) => user.id === post1.id);
          if (user) {
            document.getElementById("postModalUserName").textContent = "Author: " + user.name;
            document.getElementById("postModalUserEmail").textContent = "Email: " + user.email;
          } 
        });

        li.appendChild(titleElement);
        postList1.appendChild(li);

        const hrElement = document.createElement("hr");
        postList1.appendChild(hrElement);

        loadedPosts += 1;
      });
    });
}


function loadComments(button) {
  const postId = button.getAttribute("data-post-id");

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((commentsData) => {
      const commentsList = document.querySelector("#postModalComment");
      commentsList.innerHTML = "";

    
      commentsData.forEach((comment) => {
        const commentElement = document.createElement("p");
        commentElement.textContent = `Comments: ${comment.body}`;
        commentsList.appendChild(commentElement);
      });
    });

  document.getElementById("postModalTitle4").textContent = selectedPost.title;
  document.getElementById("postModalBody4").textContent = selectedPost.body;
}

function loadPostDataForEdit(button) {
  selectedPost = post;
  const postId = button.getAttribute("data-post-id");
  const post = arraysPost.find((post) => post.id === parseInt(postId));

  if (post) {
    document.getElementById("postModalTitle3").value = post.title;
    document.getElementById("postModalBody3").value = post.body;
    document.getElementById("saveChangesButton").setAttribute("data-post-id", postId);
  }
}

function savePostChanges() {
  const postId = document.getElementById("saveChangesButton").getAttribute("data-post-id");
  const post = arraysPost.find((post) => post.id === parseInt(postId));

  if (post) {
    const newTitle = document.getElementById("postModalTitle3").value;
    const newBody = document.getElementById("postModalBody3").value;

    post.title = newTitle;
    post.body = newBody;

    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (postElement) {
      postElement.textContent = newTitle;
    }

    const editModal = new bootstrap.Modal(document.getElementById("exampleModalToggle2"));
    editModal.hide();
    alert("Changes saved successfully!");
  }
}
