const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const postPopup = document.getElementById("post-popup");
const postPopupClose = document.getElementById("post-popup-close");
const postPopupTitle = document.getElementById("post-popup-title");
const postPopupBody = document.getElementById("post-popup-body");
const postAddPopup = document.getElementById("post-add-popup");
const postAddPopupClose = document.getElementById("post-add-popup-close");
const postsContainer = document.getElementById("container-posts");

postPopupClose.addEventListener("click", () => {
  postPopup.classList.remove("active");
  postPopupTitle.innerHTML = "";
  postPopupBody.innerHTML = "";
});

postAddPopupClose.addEventListener("click", () => {
  postAddPopup.classList.remove("active");
});

const displayPosts = (posts) => {
  for (const post of posts) {
    addNewPost(post);
  }
};

const addNewPost = (post) => {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.id = `${post.id}`;
  postElement.innerHTML = `
    <h2 id=${post.id}>${post.title}</h2>
    <p id=${post.id}>${post.body}</p>
  `;
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  const btnPostDelete = document.createElement("button");
  btnPostDelete.classList.add("btn-post-delete");
  btnPostDelete.id = `${post.id}`;
  btnPostDelete.innerHTML = "Delete";
  btnPostDelete.addEventListener("click", onPostDelete);
  postElement.addEventListener("click", onPostClick);
  postsContainer.appendChild(postElement);
  btnContainer.appendChild(btnPostDelete);
  postElement.appendChild(btnContainer);
};

const displayPost = (post) => {
  postPopup.classList.add("active");
  postPopupTitle.innerHTML = post.title;
  postPopupBody.innerHTML = post.body;
};

const getPosts = () => {
  fetch(postsUrl, {
    method: "GET",
  })
    .then((response) => {
      response.json().then((posts) => {
        displayPosts(posts);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const onPostClick = (event) => {
  const postId = event.target.id;
  const postUrl = `${postsUrl}/${postId}`;
  fetch(postUrl, {
    method: "GET",
  })
    .then((response) => {
      response.json().then((post) => {
        displayPost(post);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const onPostDelete = (event) => {
  event.stopPropagation();
  const postId = event.target.id;
  const postUrl = `${postsUrl}/${postId}`;
  fetch(postUrl, {
    method: "DELETE",
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error);
    });

    const postElement = document.getElementById(postId);
    postElement.remove();
};

const openPostForm = () => {
  postAddPopup.classList.add("active");
};

const addPost = () => {
  const postTitle = document.getElementById("post-add-popup-body-title-input").value;
  const postBody = document.getElementById("post-add-popup-body-text-input").value;
  const post = {
    id: postTitle,
    title: postTitle,
    body: postBody
  };
  addNewPost(post);
  postAddPopup.classList.remove("active");
};

getPosts();
