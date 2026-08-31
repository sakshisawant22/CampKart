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
const isHomePage = Boolean(categoryGrid && categoryTemplate && categorySelect && feed && feedTemplate && listingForm);

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
  "Books & study material": ["DSA", "OOPs", "CN", "DBMS", "OS", "Python"],
  "Laptops/accessories": ["Dell", "HP", "Lenovo", "ASUS RTX", "Acer", "MacBook"],
  Monitors: ["24 inch", "27 inch", "HDMI monitor", "IPS display", "Full HD", "Monitor stand"],
  Headphones: ["Bluetooth earbuds", "Wired headset", "Noise cancelling", "Mic headphones"],
  Bicycles: ["Campus cycle", "Gear cycle", "Lock set", "Air pump"],
  Furniture: ["Study table", "Office chair", "Bookshelf", "Desk lamp"],
  Clothes: ["Hoodies", "Jeans", "Shirts", "Jackets", "Kurti", "Track pants"],
  "Gaming equipment": ["Controller", "Keyboard", "Mousepad", "Gaming headset"],
  Electronics: ["Power bank", "Router", "Speaker", "Extension board", "Adapter", "SSD"],
  "Hostel essentials": ["Bucket", "Kettle", "Storage box", "Hanger", "Mirror", "Laundry bag"],
  Calculators: ["Scientific", "Graphing", "Basic", "Pouch", "Battery", "Cover"],
  Bags: ["Backpack", "Laptop bag", "Tote", "Messenger bag", "Travel bag", "Sling bag"],
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

function parsePriceValue(price) {
  const numeric = Number(String(price ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function getCartTotal() {
  return cartItems.reduce((sum, item) => sum + parsePriceValue(item.price), 0);
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
      <div class="collections-summary">
        <div>
          <span>Cart total</span>
          <strong class="cart-total">₹0</strong>
        </div>
        <p class="saved-empty">Wishlist items are saved for later and do not add to the bill.</p>
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector(".collections-close").addEventListener("click", () => {
      panel.classList.remove("open");
    });
  }

  const cartList = panel.querySelector(".cart-list");
  const wishlistList = panel.querySelector(".wishlist-list");
  const cartTotal = panel.querySelector(".cart-total");

  cartList.innerHTML = cartItems.length
    ? cartItems.map((item) => `<div class="saved-row"><span>${item.title}</span><button type="button" data-remove="cart" data-key="${item.key}">Remove</button></div>`).join("")
    : '<p class="saved-empty">No items in cart yet.</p>';

  wishlistList.innerHTML = wishlistItems.length
    ? wishlistItems.map((item) => `<div class="saved-row"><span>${item.title}</span><button type="button" data-remove="wishlist" data-key="${item.key}">Remove</button></div>`).join("")
    : '<p class="saved-empty">No saved items yet.</p>';

  if (cartTotal) {
    cartTotal.textContent = formatCurrency(getCartTotal());
  }

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
      <p>Quick picks to help students find exactly what they need.</p>
    </div>
    <div class="sublist-grid"></div>
  `;

  const grid = section.querySelector(".sublist-grid");
  sublists.forEach((label) => {
    const card = document.createElement("article");
    card.className = "sublist-card";

    const itemData = {
      title: label,
      category: categoryName,
      price: "Add to cart",
    };

    card.innerHTML = `
      <div class="sublist-card-top">
        <span class="sublist-bullet"></span>
        <div>
          <h3>${label}</h3>
          <p>${categoryName}</p>
        </div>
      </div>
    `;

    card.appendChild(buildItemActions(itemData));
    grid.appendChild(card);
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
  document.querySelectorAll(".theme-chip").forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === nextTheme);
  });

  localStorage.setItem("campkart-theme", nextTheme);
}

function renderCategories() {
  if (!categoryGrid || !categoryTemplate || !categorySelect) {
    return;
  }

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
  if (!feed || !feedTemplate) {
    return;
  }

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

const postItemBtn = document.getElementById("postItemBtn");
if (postItemBtn && listingForm) {
  postItemBtn.addEventListener("click", () => {
    listingForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const viewDemoBtn = document.getElementById("viewDemoBtn");
if (viewDemoBtn) {
  viewDemoBtn.addEventListener("click", () => {
    document.querySelector(".demo-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

if (listingForm && categorySelect) {
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
}

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

if (isHomePage) {
  renderCategories();
  renderFeed();
}
setMode("sell");
setTheme(localStorage.getItem("campkart-theme") || "pink");
mountThemeToolsSection();
mountSavedDock();
mountCategorySublistSection();
enhanceStaticCategoryPages();
renderCollectionsPanel();