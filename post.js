const urlPost1 = "https://jsonplaceholder.typicode.com/posts/";
const postList1 = document.querySelector("#postList1");
const postList2 = document.querySelector("#postList2");

fetch(urlPost1)
  .then((response) => response.json())
  .then((data) => {
    const arraysPost = data.slice(0, 8);
    arraysPost.forEach((post1) => {
      const li = document.createElement("li");

      const titleElement = document.createElement("h3");
      titleElement.textContent = post1.title;

      li.appendChild(titleElement);
      postList1.appendChild(li);

      const hrElement = document.createElement("hr");
      postList1.appendChild(hrElement);
    });
  });

let loadedPosts = 8;
const postsPerPage = 8;

function loadMorePosts() {
  const urlPost1 = `https://jsonplaceholder.typicode.com/posts/?_start=${loadedPosts}&_limit=${postsPerPage}`;

  fetch(urlPost1)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        const li = document.createElement("li");

        const titleElement = document.createElement("h3");
        titleElement.textContent = post.title;

        li.appendChild(titleElement);
        postList2.appendChild(li);

        const hrElement = document.createElement("hr");
        postList2.appendChild(hrElement);
      });

      loadedPosts += 8;
    });
};