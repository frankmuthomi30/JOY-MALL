let allProducts = document.querySelector(".all-products");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let categoryName = params.category; // "get category"


  fetch("https://fakestoreapi.com/products/category/" + categoryName)
  .then((res) => res.json())
  .then((products) => {
    console.log(products)

    products.forEach(product => {
        // Output products to the HTML
    allProducts.innerHTML += `<div class="product">
                                <img src="${product.image}" alt="">
                                <h3>${product.title}</h3>
                                <p>${product.description}</p>
                                <strong>$ ${product.price}</strong>
                                <br>
                                <a href="./product.html?product_id=${product.id}">View product</a>
                            </div>`
    });

    
  });