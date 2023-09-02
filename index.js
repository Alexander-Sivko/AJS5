"use strict";

//Побудова карток
class Card {
  constructor(postId, title, body, text, name, username, email) {
    this.postId = postId;
    this.title = title;
    this.body = body;
    this.text = text;
    this.name = name;
    this.username = username;
    this.email = email;
    this.btn = document.createElement("button");
  }
  render() {
    const postContainer = document.querySelector(".post-container");
    const div = document.createElement("div");
    this.btn.className = "delete__button";
    this.btn.innerText = "delete";
    div.className = "card";
    div.innerHTML = `
          <h3>${this.text}</h3> <h1>${this.name}</h1> 
          <h1>${this.username}</h1>  <p>${this.email}</p>
           <p>${this.postId}</p> <h3>${this.body}</h3>            
      `;
    div.append(this.btn);
    postContainer.append(div);
    this.delete();
  }
  delete() {
    this.btn.addEventListener("click", () => {
      //      fetch(`https://ajax.test-danit.com/api/json/posts/${this.postId}`, {
      //   method: "DELETE",
      // })
      const cardElement = this.btn.closest(".card");
      if (cardElement) {
        cardElement.remove();
      }
    });
  }
}

//Отримання списку users
fetch("https://ajax.test-danit.com/api/json/users", {
  method: "GET",
})
  .then((res) => res.json())
  .then((users) => {
    const usersContainer = document.createElement("div");
    document.body.appendChild(usersContainer);

    users.forEach((user) => {
      const userContainer = document.createElement("div");
      userContainer.classList.add("user-container");
      usersContainer.appendChild(userContainer);

      const userInfo = document.createElement("div");

      userContainer.appendChild(userInfo);

      const postsList = document.createElement("ul");
      userContainer.appendChild(postsList);

      // Отримання постів

      fetch("https://ajax.test-danit.com/api/json/posts", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((posts) => {
          posts.forEach((post) => {
            const card = new Card(
              post.title,
              post.text,
              post.body,
              user.name,
              user.username,
              user.email,
              post.id
            );
            card.render();
          });
        })
        .catch((error) => {
          console.log("Error fetching post data:", error);
        });
    });
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });
