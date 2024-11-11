const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector("button");
let notes = document.querySelectorAll(".input-box");

const storage = () => {
  localStorage.setItem("notes", notesContainer.innerText);
};

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let createImg = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  createImg.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(createImg);
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentNode.remove();
  }
});
