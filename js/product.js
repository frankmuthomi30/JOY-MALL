const productSingle = document.querySelector(".product-single");
const cartList = document.querySelector(".cart-list");
const viewCartBtn = document.querySelector("span");
const shopped = document.querySelector(".shopped");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

const productID = new URLSearchParams(window.location.search).get("product_id");

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
        <br>
        <button class="btn add-to-cart" data-id="${product.id}">Add to cart</button>
      </div>
    </div>`;
    document.querySelector(".loading").classList.add("hide")
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        
        if (!cartProducts.includes(productId)) {
          cartProducts.push(productId);
          localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
          alert("Item added to cart");
          viewCartBtn.innerText = cartProducts.length;
        } else {
          alert("Item already in cart");
        }
      });
    });
  });

viewCartBtn.innerText = cartProducts.length;

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

      const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
      removeFromCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id");

          const index = cartProducts.indexOf(productId);
          if (index > -1) {
            cartProducts.splice(index, 1);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            alert("Item removed from cart");
            viewCartBtn.innerText = cartProducts.length;

            listItem.remove();
          }
        });
      });
    });
});
