const urlPost1 = "https://jsonplaceholder.typicode.com/posts/";
const urlUsers = "https://jsonplaceholder.typicode.com/users/";
const urlComments = "https://jsonplaceholder.typicode.com/posts/:id/comments";

const postList1 = document.querySelector("#postList1");
const postList2 = document.querySelector("#postList2");

const myInput = document.getElementById('myInput')
let usersData;

fetch(urlUsers)
  .then((response) => response.json())
  .then((data) => {
    usersData = data;
  });

fetch(urlPost1)
  .then((response) => response.json())
  .then((data) => {
    const arraysPost = data.slice(0, 8);
    arraysPost.forEach((post1) => {
      const li = document.createElement("li");
      const titleElement = document.createElement("h3");
      titleElement.textContent = post1.title;
      
        titleElement.addEventListener("click", () => {
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


      titleElement.setAttribute("data-bs-toggle", "modal");
      titleElement.setAttribute("data-bs-target", "#postModal");
      titleElement.addEventListener("click", () => {
        
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
    });
  });
};

function loadPostDataForEdit(button) {
  const postTitle = button.getAttribute("data-post-title");
  const postBody = button.getAttribute("data-post-body");

  // Cargar los datos del LI en el modal 2
  const titleInput = document.getElementById("postModalTitle2");
  const bodyTextarea = document.getElementById("postModalBody2");

  titleInput.value = postTitle;
  bodyTextarea.value = postBody;
}

function savePostChanges() {
  const editedTitle = document.getElementById("postModalTitle2").value;
  const editedBody = document.getElementById("postModalBody2").value;

  const postElement = document.querySelector("#postList1 li[data-bs-target='#postModal']");
  postElement.querySelector("h3").textContent = editedTitle;
  postElement.setAttribute("data-post-title", editedTitle);
  postElement.setAttribute("data-post-body", editedBody);
}

