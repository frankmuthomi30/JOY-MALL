const productSingle = document.querySelector(".product-single");
const cartList = document.querySelector(".cart-list");
const viewCartBtn = document.querySelector("span");
const shopped = document.querySelector(".shopped");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
const productID = params.product_id; // "get product_id"

function fetchSingle() {
  // Fetch single product with the ID we get above
  fetch("https://fakestoreapi.com/products/" + productID)
    .then((res) => res.json())
    .then((product) => {
      console.log(product);
      productSingle.innerHTML += `<div class="single-product">
                                <img src="${product.image}" alt="">
                                <div class="single-product-info">
                                    <h3>${product.title}</h3>
                                    <p>${product.description}</p>
                                    <strong>$ ${product.price}</strong>
                                    <br>git
                                    <button class="btn add-to-cart" data-id="${product.id}">Add to cart</button>
                                </div>
                            </div>`;
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id"); // Product id

          // Get cart items from localStorage
          cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

          // Add new item to cart
          if (!cartProducts.includes(productId)) {
            cartProducts.push(productId);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            // Notify user and update cart count
            alert("Item added to cart");
            const cartCount = document.querySelector("span");
            cartCount.innerText = cartProducts.length;
          } else {
            alert("Item already in cart");
          }
        });
      });
    });
}

fetchSingle();

// Get cart items from localStorage
if (cartProducts) {
  const cartCount = document.querySelector("span");
  cartCount.innerText = cartProducts.length;
}

// Loop through each item in the cart and add it to the list
cartProducts.forEach((productId) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<img src="${product.image}">
       - ${product.title} -
        $${product.price}
        <button class="btn remove-from-cart" data-id="${product.id}">Remove from cart</button>
        `;

      cartList.appendChild(listItem);

      // Remove item from cart
      const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
      removeFromCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id");

          // Remove item from cart
          const index = cartProducts.indexOf(productId);
          if (index > -1) {
            cartProducts.splice(index, 1);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            // Notify user and update cart count
            alert("Item removed from cart");
            const cartCount = document.querySelector("span");
            cartCount.innerText = cartProducts.length;

            // Remove item from cart list
            listItem.remove();
          }
        });
      });
    });
});
const view =document.querySelector('span')
view.addEventListener("click", () => {
  shopped.style.display = "block";
});
const hide =document.querySelector('#remove')
hide.addEventListener("click", () => {
  shopped.style.display = "none";
});




