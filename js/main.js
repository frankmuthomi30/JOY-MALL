let allProducts = document.querySelector(".all-products");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    console.log(products)

    // After getting products, add a hide class to the loading GIF
    document.querySelector(".loading").classList.add("hide");
    
    products.forEach(product => {
        // Output products to the HTML
    allProducts.innerHTML += `<div class="product">
                                <img src="${product.image}" alt="">
                                <h3>${product.title}</h3>
                                <strong>$ ${product.price}</strong>
                                <a href="./product.html?product_id=${product.id}">View product</a>
                            </div>`
    });

    
  });
  // Get cart count from global variable
let cartCount = window.cartItemCount;

// Display cart count
let cartCountElement = document.querySelector('#cart-count');
cartCountElement.innerText = cartCount;
