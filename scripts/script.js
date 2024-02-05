const API_KEY = "EmoPemBQV10r17jtMxs2owvAdL_wXdFcQEbM7p41lUI";
const formElement = document.querySelector("form");
const inputElement = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showmoreButton = document.querySelector("#show-more-button");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showmoreButton.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showmoreButton.addEventListener("click", () => {
  searchImages();
});