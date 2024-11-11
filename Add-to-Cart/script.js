const products = document.querySelector(".products");
const addedProd = document.querySelector(".addedProd");

async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    showProducts(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to execute
fetchData();

function showProducts(data) {
  let productsHTML = data
    .map((item) => {
      return `<div class="waffle product-item">
        <div class="prod-img">
          <img
            class="item-img"
            src="${item.image.desktop}"
            alt=""
            data-name="${item.name}"
          />
          <button
            class="cart"
            data-name="${item.name}"
            data-price="${item.price}"
          >
            <img
              class="cart-img"
              src="assets/images/icon-add-to-cart.svg"
              alt=""
              data-name="${item.name}"
            />
            <p class="add-to-cart">Add to Cart</p>
          </button>
          <button class="increment-decrement">
            <div class="increment">
              <img
                class="plus"
                src="assets/images/icon-increment-quantity.svg"
                alt=""
                width="6px"
                color="#transparent"
              />
            </div>

            <p class="number">1</p>
            <div class="decrement">
              <img
                class="minus"
                src="assets/images/icon-decrement-quantity.svg"
                alt=""
              />
            </div>
          </button>
        </div>
        <div class="prod-desc">
          <p class="item-name">${item.category}</p>
          <p class="item-full-name">${item.name}</p>
          <span class="price">$${item.price}</span>
        </div>
      </div>`;
    })
    .join("");
  products.innerHTML = productsHTML;

  const cartBtn = document.querySelectorAll(".cart");
  const illustrationEmptyCart = document.querySelector(
    ".illustration-empty-cart"
  );
  const totalConfirm = document.querySelector(".total-confirm");
  cartBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let prodName = btn.getAttribute("data-name");
      let prodPrice = btn.getAttribute("data-price");
      illustrationEmptyCart.style.display = "none";
      totalConfirm.style.display = "block";
      const itemImg = btn.parentElement.querySelector(".item-img");
      if (btn.getAttribute("data-name") === itemImg.getAttribute("data-name")) {
        itemImg.classList.add("active");
      } else {
        itemImg.classList.remove("active");
      }
      addToCart(prodName, prodPrice, btn, itemImg);
    });
  });
}

products.addEventListener("DOMContentLoaded", showProducts);

function addToCart(name, price, cartBtn, itemImg) {
  let cartItem = `
   <div class="prod-item" id="prod1">
      <div class="title-btn">
        <p class="prodName">${name}</p>
        <span class="clsBtn">
          <img src="assets/images/icon-remove-item.svg" alt="cross" />
        </span>
      </div>

      <div class="spans">
        <span class="quantity">1x</span>
        <span class="perPrice">@ $${price}</span>
        <span class="perTtlPrice">$${price}</span>
      </div>
    </div>`;
  addedProd.insertAdjacentHTML("afterbegin", cartItem);
  addedProd.classList.add("active");

  cartBtn.style.display = "none";
  cartBtn.nextElementSibling.style.display = "flex";

  const clsBtn = document.querySelector(".clsBtn");
  let cartQty = document.querySelector(".quantity");
  let perTtlPrice = document.querySelector(".perTtlPrice");

  clsBtn.addEventListener("click", function () {
    clsBtn.parentElement.parentElement.remove();
    cartBtn.style.display = "flex";
    cartBtn.nextElementSibling.style.display = "none";
    itemImg.classList.remove("active");
    updateTotalQuantity();
    updateOrderTotal();
  });

  handleQuantity(cartBtn.nextElementSibling, perTtlPrice, cartQty);
  updateTotalQuantity();
  updateOrderTotal();
}

function handleQuantity(incrementDecrementBtn, perTtlPrice, cartQty) {
  let quantityDisplay = incrementDecrementBtn.querySelector(".number");
  let incrementBtn = incrementDecrementBtn.querySelector(".increment");
  let decrementBtn = incrementDecrementBtn.querySelector(".decrement");
  let quantity = 1;

  quantityDisplay.innerHTML = quantity;

  incrementBtn.addEventListener("click", function () {
    quantity++;
    quantityDisplay.innerHTML = quantity;
    increaseCartItem(perTtlPrice, cartQty, quantity);
  });

  decrementBtn.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      decreaseCartItem(perTtlPrice, cartQty, quantity);
    }
  });
}

function increaseCartItem(perTtlPrice, cartQty, quantity) {
  const price =
    parseFloat(perTtlPrice.textContent.replace("$", "")) / (quantity - 1);
  let perTPrice = (price * quantity).toFixed(2);
  perTtlPrice.innerHTML = "$" + perTPrice;
  cartQty.innerHTML = quantity + "x";
  updateTotalQuantity();
  updateOrderTotal();
}

function decreaseCartItem(perTtlPrice, cartQty, quantity) {
  const price =
    parseFloat(perTtlPrice.textContent.replace("$", "")) / (quantity + 1);
  let perTPrice = (price * quantity).toFixed(2);
  perTtlPrice.innerHTML = "$" + perTPrice;
  cartQty.innerHTML = quantity + "x";
  updateOrderTotal();
  updateTotalQuantity();
}

function updateOrderTotal() {
  const cartItems = document.querySelectorAll(".prod-item");
  console.log(cartItems);
  let total = 0;

  cartItems.forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity").innerHTML.replace("x", "")
    );
    const price = parseFloat(
      item.querySelector(".perPrice").innerHTML.replace("@ $", "")
    );
    total += quantity * price;
  });

  document.querySelector(".ttl").innerHTML = "$" + total.toFixed(2);
}

function updateTotalQuantity() {
  const cartItems = document.querySelectorAll(".prod-item");
  let orderTotal = 0;
  cartItems.forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity").innerHTML.replace("x", "")
    );
    orderTotal += quantity;
  });
  document.querySelector(".count").innerHTML = orderTotal;

  defaultState(orderTotal);
}

function defaultState(orderTotal) {
  if (orderTotal === 0) {
    document.querySelector(".total-confirm").style.display = "none";
    document.querySelector(".illustration-empty-cart").style.display = "flex";
  } else if (orderTotal >= 1 && orderTotal <= 2) {
    addedProd.classList.remove("active");
  } else {
    document.querySelector(".total-confirm").style.display = "block";
    document.querySelector(".illustration-empty-cart").style.display = "none";
  }
}

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
