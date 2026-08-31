const categories = [
  ["📚", "Books & study material"],
  ["💻", "Laptops/accessories"],
  ["🖥️", "Monitors"],
  ["🎧", "Headphones"],
  ["🚲", "Bicycles"],
  ["🪑", "Furniture"],
  ["👕", "Clothes"],
  ["🎮", "Gaming equipment"],
  ["🔌", "Electronics"],
  ["🏠", "Hostel essentials"],
  ["🧮", "Calculators"],
  ["🎒", "Bags"],
];

const listings = [
  { title: "Scientific Calculator", category: "Calculators", price: "₹800", mode: "Sell", meta: "Listed by Student A · 2 hrs ago" },
  { title: "Data Structures Book", category: "Books & study material", price: "₹350", mode: "Rent", meta: "Available for mid-semester prep" },
  { title: "Noise Cancelling Headphones", category: "Headphones", price: "₹1,900", mode: "Sell", meta: "Good battery life · Hostel pickup" },
];

const categoryGrid = document.getElementById("categoryGrid");
const categoryTemplate = document.getElementById("categoryTemplate");
const categorySelect = document.getElementById("categorySelect");
const feed = document.getElementById("feed");
const feedTemplate = document.getElementById("feedTemplate");
const listingForm = document.getElementById("listingForm");
const modeButtons = document.querySelectorAll(".mode-btn");
const themeButtons = document.querySelectorAll(".theme-chip");

let selectedMode = "sell";

function setTheme(theme) {
  const availableThemes = ["mint", "orange", "pink", "yellow", "royal"];
  const nextTheme = availableThemes.includes(theme) ? theme : "mint";

  document.body.dataset.theme = nextTheme;
  themeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === nextTheme);
  });

  localStorage.setItem("campkart-theme", nextTheme);
}

function renderCategories() {
  categories.forEach(([emoji, label]) => {
    const chip = categoryTemplate.content.cloneNode(true);
    chip.querySelector(".emoji").textContent = emoji;
    chip.querySelector(".label").textContent = label;
    categoryGrid.appendChild(chip);

    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    categorySelect.appendChild(option);
  });
}

function renderFeed() {
  feed.innerHTML = "";

  listings.forEach((listing) => {
    const item = feedTemplate.content.cloneNode(true);
    item.querySelector("h3").textContent = listing.title;
    item.querySelector("p").textContent = `${listing.category} · ${listing.mode}`;
    item.querySelector("strong").textContent = listing.price;
    item.querySelector(".feed-meta").textContent = listing.meta;

    item.querySelector(".contact-btn").addEventListener("click", () => {
      alert(`Contact request sent for ${listing.title}.`);
    });

    feed.appendChild(item);
  });
}

function setMode(mode) {
  selectedMode = mode;
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

document.getElementById("postItemBtn").addEventListener("click", () => {
  listingForm.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("viewDemoBtn").addEventListener("click", () => {
  document.querySelector(".demo-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

listingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(listingForm);
  const title = formData.get("title");
  const category = formData.get("category");
  const price = formData.get("price");

  listings.unshift({
    title,
    category,
    price,
    mode: selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1),
    meta: "Posted just now · Direct student contact",
  });

  renderFeed();
  listingForm.reset();
  categorySelect.selectedIndex = 0;
  setMode("sell");
});

renderCategories();
renderFeed();
setMode("sell");
setTheme(localStorage.getItem("campkart-theme") || "mint");