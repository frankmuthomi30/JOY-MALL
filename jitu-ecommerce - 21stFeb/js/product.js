let productSingle = document.querySelector(".product-single");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let productID = params.product_id; // "get product_id"

  // Fetch single product with the ID we get above
  fetch("https://fakestoreapi.com/products/" + productID) // after concatenation the URL should look like https://fakestoreapi.com/products/4
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
    productSingle.innerHTML = `<div class="single-product">
                                <img src="${product.image}" alt="">
                                <div class="single-product-info">
                                    <h3>${product.title}</h3>
                                    <p>${product.description}</p>
                                    <strong>$ ${product.price}</strong>
                                    <br>
                                    <button class="btn">Add to cart</button>
                                </div>
                            </div>`
  });