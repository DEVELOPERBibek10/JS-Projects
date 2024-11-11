const API_KEY = "75f378bddc6e4357b8886b2637b66ea7";
const url = "https://newsapi.org/v2/everything?q=";

function reload() {
  window.location.reload();
}
window.addEventListener("load", function () {
  fetchNews("All");
});

async function fetchNews(query) {
  const fullUrl = `${url}${query}&apiKey=${API_KEY}`;
  const response = await fetch(fullUrl);
  const data = await response.json();
  manageData(data.articles);
}

function manageData(articles) {
  const cardsContainer = document.querySelector(".cards-container");
  const templateNewsCard = document.querySelector(".template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const deepCardClone = templateNewsCard.content.cloneNode(true);
    fillData(deepCardClone, article); // deep clone
    cardsContainer.appendChild(deepCardClone);
  });
}

function fillData(card, article) {
  const newsTitle = card.querySelector("#news-title");
  const newsSource = card.querySelector("#news-source");
  const newsDesc = card.querySelector("#news-desc");
  const newsImage = card.querySelector("#news-img");

  newsTitle.innerHTML = article.title;
  newsImage.src = article.urlToImage;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} - ${date}`;
  card.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let selectedNav = null;
function clickNavItem(id) {
  fetchNews(id);
  const navItem = document.getElementById(`${id}`);
  selectedNav?.classList.remove("active");
  selectedNav = navItem;
  selectedNav.classList.add("active");
}

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", function () {
  const query = searchInput.value;
  if (!query) return;
  fetchNews(query);
  selectedNav?.classList.remove("active");
  selectedNav = null;
});
