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

const categoryPages = {
  "Books & study material": "books-study-material.html",
  "Laptops/accessories": "laptops-accessories.html",
  Monitors: "monitors.html",
  Headphones: "headphones.html",
  Bicycles: "bicycles.html",
  Furniture: "furniture.html",
  Clothes: "clothes.html",
  "Gaming equipment": "gaming-equipment.html",
  Electronics: "electronics.html",
  "Hostel essentials": "hostel-essentials.html",
  Calculators: "calculators.html",
  Bags: "bags.html",
};

const categoryGrid = document.getElementById("categoryGrid");
const categoryTemplate = document.getElementById("categoryTemplate");
const categorySelect = document.getElementById("categorySelect");
const feed = document.getElementById("feed");
const feedTemplate = document.getElementById("feedTemplate");
const listingForm = document.getElementById("listingForm");
const modeButtons = document.querySelectorAll(".mode-btn");
const themeButtons = document.querySelectorAll(".theme-chip");

let selectedMode = "sell";
let cartItems = [];
let wishlistItems = [];

const themeOptions = [
  { theme: "pink", label: "Pink" },
  { theme: "orange", label: "Orange" },
  { theme: "bw", label: "Black & White" },
  { theme: "mint", label: "Mint" },
  { theme: "yellow", label: "Yellow" },
  { theme: "royal", label: "Royal Blue" },
];

const sublistData = {
  "Books & study material": ["Textbooks", "Notes & guides", "Previous papers", "Lab manuals"],
  "Laptops/accessories": ["Laptop bags", "Chargers", "Mouse & keyboards", "Stands & sleeves"],
  Monitors: ["Second screens", "HDMI cables", "Monitor stands", "Power adapters"],
  Headphones: ["Bluetooth headsets", "Wired headphones", "Earbuds", "Mic headsets"],
  Bicycles: ["Campus cycles", "Locks", "Pumps", "Baskets"],
  Furniture: ["Study tables", "Chairs", "Shelves", "Desk lamps"],
  Clothes: ["Hoodies", "Jeans", "Shirts", "Jackets"],
  "Gaming equipment": ["Controllers", "Keyboards", "Mousepads", "Headsets"],
  Electronics: ["Power banks", "Routers", "Speakers", "Extension boards"],
  "Hostel essentials": ["Buckets", "Kettles", "Storage boxes", "Hangers"],
  Calculators: ["Scientific", "Graphing", "Basic", "Calculator pouches"],
  Bags: ["Backpacks", "Laptop bags", "Totes", "Messenger bags"],
};

function loadCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function persistCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function getItemKey(item) {
  return `${item.title}::${item.category}`;
}

function updateThemePreviewCount() {
  const preview = document.querySelector(".tools-count");
  if (preview) {
    preview.textContent = `${cartItems.length} in cart · ${wishlistItems.length} saved`;
  }
}

function addToCollection(type, item) {
  const collection = type === "cart" ? cartItems : wishlistItems;
  const exists = collection.some((entry) => entry.key === getItemKey(item));

  if (exists) {
    return;
  }

  collection.unshift({
    key: getItemKey(item),
    title: item.title,
    category: item.category,
    price: item.price,
  });

  persistCollection(type === "cart" ? "campkart-cart" : "campkart-wishlist", collection);
  renderCollectionsPanel();
  updateThemePreviewCount();
}

function removeFromCollection(type, key) {
  const collection = type === "cart" ? cartItems : wishlistItems;
  const nextItems = collection.filter((entry) => entry.key !== key);

  if (type === "cart") {
    cartItems = nextItems;
    persistCollection("campkart-cart", cartItems);
  } else {
    wishlistItems = nextItems;
    persistCollection("campkart-wishlist", wishlistItems);
  }

  renderCollectionsPanel();
  updateThemePreviewCount();
}

function renderCollectionsPanel() {
  let panel = document.querySelector(".collections-drawer");

  if (!panel) {
    panel = document.createElement("section");
    panel.className = "collections-drawer card";
    panel.innerHTML = `
      <div class="collections-top">
        <div>
          <div class="eyebrow light">Cart & wishlist</div>
          <h2>Your saved items</h2>
        </div>
        <button type="button" class="collections-close" aria-label="Close saved items">×</button>
      </div>
      <div class="collections-grid">
        <div>
          <h3>Cart</h3>
          <div class="collections-list cart-list"></div>
        </div>
        <div>
          <h3>Wishlist</h3>
          <div class="collections-list wishlist-list"></div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector(".collections-close").addEventListener("click", () => {
      panel.classList.remove("open");
    });
  }

  const cartList = panel.querySelector(".cart-list");
  const wishlistList = panel.querySelector(".wishlist-list");

  cartList.innerHTML = cartItems.length
    ? cartItems.map((item) => `<div class="saved-row"><span>${item.title}</span><button type="button" data-remove="cart" data-key="${item.key}">Remove</button></div>`).join("")
    : '<p class="saved-empty">No items in cart yet.</p>';

  wishlistList.innerHTML = wishlistItems.length
    ? wishlistItems.map((item) => `<div class="saved-row"><span>${item.title}</span><button type="button" data-remove="wishlist" data-key="${item.key}">Remove</button></div>`).join("")
    : '<p class="saved-empty">No saved items yet.</p>';

  panel.querySelectorAll("button[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeFromCollection(button.dataset.remove, button.dataset.key));
  });

  const trigger = document.querySelector(".saved-trigger");
  if (trigger) {
    trigger.querySelector(".cart-count").textContent = cartItems.length;
    trigger.querySelector(".wishlist-count").textContent = wishlistItems.length;
  }
}

function openCollectionsPanel() {
  const panel = document.querySelector(".collections-drawer");
  if (panel) {
    panel.classList.add("open");
  }
}

function mountThemeToolsSection() {
  if (document.querySelector(".theme-tools-section") || document.querySelector(".theme-switcher")) {
    return;
  }

  const main = document.querySelector("main.shell");
  if (!main) {
    return;
  }

  const tools = document.createElement("section");
  tools.className = "theme-tools-section card";
  tools.innerHTML = `
    <div>
      <div class="eyebrow light">Theme section</div>
      <h2>Pick a look for this page</h2>
      <p class="tools-count">${cartItems.length} in cart · ${wishlistItems.length} saved</p>
    </div>
    <div class="theme-switcher theme-switcher-compact" aria-label="Color themes"></div>
    <div class="saved-trigger" role="button" tabindex="0" aria-label="Open cart and wishlist">
      <span>Cart <strong class="cart-count">${cartItems.length}</strong></span>
      <span>Wishlist <strong class="wishlist-count">${wishlistItems.length}</strong></span>
    </div>
  `;

  const themeRow = tools.querySelector(".theme-switcher-compact");
  themeOptions.forEach(({ theme, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme-chip${document.body.dataset.theme === theme ? " active" : ""}`;
    button.dataset.theme = theme;
    button.innerHTML = `<span class="theme-dot"></span>${label}`;
    button.addEventListener("click", () => setTheme(theme));
    themeRow.appendChild(button);
  });

  tools.querySelector(".saved-trigger").addEventListener("click", openCollectionsPanel);
  tools.querySelector(".saved-trigger").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCollectionsPanel();
    }
  });

  main.prepend(tools);
}

function mountCategorySublistSection() {
  const pageRoot = document.querySelector(".category-page");
  if (!pageRoot) {
    return;
  }

  if (pageRoot.querySelector(".sublist-section")) {
    return;
  }

  const categoryName = document.querySelector(".category-hero h1")?.textContent?.trim();
  const sublists = sublistData[categoryName];
  if (!categoryName || !sublists) {
    return;
  }

  const section = document.createElement("section");
  section.className = "sublist-section card";
  section.innerHTML = `
    <div class="section-heading compact">
      <div>
        <div class="eyebrow light">Sublist</div>
        <h2>Browse inside ${categoryName}</h2>
      </div>
      <p>Quick subcategories to help students find exactly what they need.</p>
    </div>
    <div class="sublist-grid"></div>
  `;

  const grid = section.querySelector(".sublist-grid");
  sublists.forEach((label) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "sublist-chip";
    chip.innerHTML = `<span class="sublist-bullet"></span><span>${label}</span>`;
    chip.addEventListener("click", () => {
      openCollectionsPanel();
    });
    grid.appendChild(chip);
  });

  const hero = pageRoot.querySelector(".category-hero");
  hero?.insertAdjacentElement("afterend", section);
}

function mountSavedDock() {
  if (document.querySelector(".saved-dock")) {
    return;
  }

  const dock = document.createElement("button");
  dock.type = "button";
  dock.className = "saved-dock";
  dock.innerHTML = `
    <span>Cart <strong class="cart-count">${cartItems.length}</strong></span>
    <span>Wishlist <strong class="wishlist-count">${wishlistItems.length}</strong></span>
  `;
  dock.addEventListener("click", openCollectionsPanel);
  document.body.appendChild(dock);
}

function buildItemActions(itemData) {
  const actions = document.createElement("div");
  actions.className = "item-actions";

  const cartButton = document.createElement("button");
  cartButton.type = "button";
  cartButton.className = "secondary small";
  cartButton.textContent = "Add to cart";
  cartButton.addEventListener("click", () => addToCollection("cart", itemData));

  const wishlistButton = document.createElement("button");
  wishlistButton.type = "button";
  wishlistButton.className = "secondary small";
  wishlistButton.textContent = "Wishlist";
  wishlistButton.addEventListener("click", () => addToCollection("wishlist", itemData));

  actions.append(cartButton, wishlistButton);
  return actions;
}

function setTheme(theme) {
  const availableThemes = ["mint", "orange", "pink", "yellow", "royal", "bw"];
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
    chip.querySelector(".category-chip").addEventListener("click", () => {
      window.location.href = categoryPages[label];
    });
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

    item.querySelector(".feed-item").appendChild(buildItemActions(listing));

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

function enhanceStaticCategoryPages() {
  const categoryCards = document.querySelectorAll(".category-page .item-card");
  if (!categoryCards.length) {
    return;
  }

  const pageTitle = document.querySelector(".category-hero h1")?.textContent || "";

  categoryCards.forEach((card, index) => {
    if (card.querySelector(".item-actions")) {
      return;
    }

    const heading = card.querySelector("h3")?.textContent || `Item ${index + 1}`;
    const price = card.querySelector(".item-price")?.textContent || "₹0";
    const itemData = {
      title: heading,
      category: pageTitle,
      price,
    };

    card.appendChild(buildItemActions(itemData));
  });
}

cartItems = loadCollection("campkart-cart");
wishlistItems = loadCollection("campkart-wishlist");

renderCategories();
renderFeed();
setMode("sell");
setTheme(localStorage.getItem("campkart-theme") || "pink");
mountThemeToolsSection();
mountSavedDock();
mountCategorySublistSection();
enhanceStaticCategoryPages();
renderCollectionsPanel();