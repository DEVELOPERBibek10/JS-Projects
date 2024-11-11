let tablinks = document.querySelectorAll(".tab-links");
let tabcontents = document.querySelectorAll(".tab-contents");

tablinks.forEach((tablink, index) => {
  tablink.addEventListener("click", () => {
    // Remove active-link from all tablinks
    tablinks.forEach((link) => link.classList.remove("active-link"));

    // Add active-link to the clicked tablink
    tablink.classList.add("active-link");

    // Hide all tab contents
    tabcontents.forEach((content) => content.classList.remove("active-tab"));

    // Show the tab content corresponding to the clicked tablink
    tabcontents[index].classList.add("active-tab");
  });
});

let navList = document.querySelector(".nav-list");
let fas = document.querySelectorAll(".fas");

fas.forEach((index) => {
  index.addEventListener("click", () => {
    navList.classList.toggle("active-nav");
  });
});

let listItem = document.querySelectorAll(".list-item");

listItem.forEach((index) => {
  index.addEventListener("click", () => {
    navList.classList.remove("active-nav");
  });
});

let gMail = document.querySelector(".G-mail");
let error = document.querySelector(".error-message");
let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
let submitButton = document.querySelector("#button");
function checkMail(address) {
  if (regex.test(address) === true) return true;
  else return false;
}

gMail.addEventListener("keydown", () => {
  if (checkMail(gMail.value) == false) {
    error.classList.add("active-error");
  } else {
    error.classList.remove("active-error");
  }
});

submitButton.addEventListener("click", (event) => {
  if (checkMail(gMail.value) == false) {
    event.preventDefault();
    error.classList.add("active-error");
  }
});
