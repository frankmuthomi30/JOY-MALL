let allProducts = document.querySelector(".all-products");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    console.log(products)

    products.forEach(product => {
        // Output products to the HTML
    allProducts.innerHTML += `<div class="product">
                                <img src="${product.image}" alt="">
                                <a href="./category.html?category=${product.category}">Category: ${product.category}</a>
                                <h3>${product.title}</h3>
                                <p>${product.description}</p>
                                <strong>$ ${product.price}</strong>
                                <br>
                                <a href="./product.html?product_id=${product.id}">View product</a>
                            </div>`
    });

    
  });