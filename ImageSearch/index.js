const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");
const apiKey = "563492ad6f91700001000001bb7abf29a9ef4a4aa5f536709f4f5990";

let search_text = "";
let search = false;
let page_num = 1;

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

search_btn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter some text!");
    return;
  }
  cleargallery();
  search = true;
  SearchPhotos(search_text, page_num);
});

function cleargallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
}

async function fetchPhotos(page_num) {
  const data = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apiKey
      }
    }
  );
  const response = await data.json();
  console.log(response);
  display_images(response);
}

function display_images(response) {
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.innerHTML = `<img src=${image.src.large}>
      <figcaption>Photo By: ${image.photographer}</figcaption>
    `;
    document.querySelector(".display_images").appendChild(photo);
  });
}

async function SearchPhotos(query, page_num) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apiKey
      }
    }
  );
  const response = await data.json();
  console.log(response);
  display_images(response);
}

showmore_btn.addEventListener("click", () => {
  if (!search) {
    page_num++;
    fetchPhotos(page_num);
  } else {
    if (search_text.value === "") return;
    page_num++;
    SearchPhotos(search_text, page_num);
  }
});

fetchPhotos(page_num);
