const products = document.querySelector(".products");
const addedProd = document.querySelector(".addedProd");
const illustrationEmptyCart = document.querySelector(
  ".illustration-empty-cart"
);
const totalConfirm = document.querySelector(".total-confirm");
const totalAmountDisplay = document.querySelector(".ttl");
const totalCountDisplay = document.querySelector(".count");

// Fetch data once on page load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function renderProducts(data) {
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.className = "waffle product-item";
    productItem.innerHTML = `
      <div class="prod-img">
        <img class="item-img" src="${item.image.desktop}" data-name="${item.name}" alt="${item.name}" />
        <button class="cart" data-name="${item.name}" data-price="${item.price}">
          <img class="cart-img" src="assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          <p class="add-to-cart">Add to Cart</p>
        </button>
        <button class="increment-decrement" style="display:none;">
          <div class="increment"><img class="plus" src="assets/images/icon-increment-quantity.svg" alt="+" /></div>
          <p class="number">1</p>
          <div class="decrement"><img class="minus" src="assets/images/icon-decrement-quantity.svg" alt="-" /></div>
        </button>
      </div>
      <div class="prod-desc">
        <p class="item-name">${item.category}</p>
        <p class="item-full-name">${item.name}</p>
        <span class="price">$${item.price}</span>
      </div>
    `;
    fragment.appendChild(productItem);
  });
  products.appendChild(fragment);
}

function toggleCartItem(btn, addToCart) {
  const prodName = btn.dataset.name;
  const prodPrice = parseFloat(btn.dataset.price);
  const cartItem = document.querySelector(
    `.prod-item[data-name="${prodName}"]`
  );

  if (addToCart && !cartItem) {
    // Add item to cart
    const item = document.createElement("div");
    item.className = "prod-item";
    item.dataset.name = prodName;
    item.innerHTML = `
      <div class="title-btn">
        <p class="prodName">${prodName}</p>
        <span class="clsBtn"><img src = "./assets/images/icon-remove-item.svg"></span>
      </div>
      <div class="spans">
        <span class="quantity">1x</span>
        <span class="perPrice">@ $${prodPrice}</span>
        <span class="perTtlPrice">$${prodPrice}</span>
      </div>
    `;
    addedProd.prepend(item);
    updateTotalDisplay();
    btn.style.display = "none";
    btn.nextElementSibling.style.display = "flex";

    item
      .querySelector(".clsBtn")
      .addEventListener("click", () => toggleCartItem(btn, false));
  } else if (!addToCart && cartItem) {
    // Remove item from cart
    cartItem.remove();
    btn.style.display = "flex";
    btn.nextElementSibling.style.display = "none";
    updateTotalDisplay();
  }
}

function updateTotalDisplay() {
  const items = addedProd.querySelectorAll(".prod-item");
  let totalAmount = 0;
  let totalCount = 0;

  items.forEach((item) => {
    const qty = parseInt(
      item.querySelector(".quantity").textContent.replace("x", "")
    );
    const price = parseFloat(
      item.querySelector(".perPrice").textContent.replace("@ $", "")
    );
    totalAmount += qty * price;
    totalCount += qty;
  });

  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
  totalCountDisplay.textContent = totalCount;
  updateCartState(totalCount);
}

function updateCartState(count) {
  illustrationEmptyCart.style.display = count > 0 ? "none" : "flex";
  totalConfirm.style.display = count > 0 ? "block" : "none";
  addedProd.classList.toggle("active", count > 0);
}

function handleQuantityChange(btn, isIncrement) {
  const quantityDisplay = btn.parentNode.querySelector(".number");
  let quantity = parseInt(quantityDisplay.textContent);
  quantity = isIncrement ? quantity + 1 : Math.max(1, quantity - 1);
  quantityDisplay.textContent = quantity;
}

products.addEventListener("click", (event) => {
  if (event.target.closest(".cart")) {
    toggleCartItem(event.target.closest(".cart"), true);
  }
  if (event.target.closest(".increment")) {
    handleQuantityChange(event.target.closest(".increment"), true);
  }
  if (event.target.closest(".decrement")) {
    handleQuantityChange(event.target.closest(".decrement"), false);
  }
});

function confirmOrder() {
  // Comfirmation Card
  document.querySelector(".confirmation-container").style.display = "block";
  document.querySelector("body").style.pointerEvents = "none";
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
}

function Reset() {
  const elements = {
    ".increment-decrement": "none",
    ".cart": "flex",
    ".total-confirm": "none",
    ".illustration-empty-cart": "flex",
    ".confirmation-container": "none",
  };
  Object.keys(elements).forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => {
      item.style.display = elements[selector];
    });
  });

  document.querySelectorAll(".item-img").forEach((item) => {
    item.classList.remove("active");
  });
  const addedProd = document.querySelector(".addedProd");
  if (addedProd) {
    addedProd.innerHTML = "";
    addedProd.classList.remove("active");
  }

  document.querySelector(".count").innerHTML = "0";
  document.querySelector(".ttl").innerHTML = "$0.00";
  document.querySelector("body").style.pointerEvents = "all";

  const overlay = document.querySelector(".overlay");
  if (overlay) {
    document.body.removeChild(overlay);
  }
}
