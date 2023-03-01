document.querySelector(".add-product").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form behaviour of reloading

    // Get all form input values
    let title = document.querySelector(".title").value;
    let price = document.querySelector(".price").value;
    let description = document.querySelector(".description").value;
    let image = document.querySelector(".image").value;
    let category = document.querySelector(".category").value;

    // Fetch previously saved products from localStorage
    let addedProducts = JSON.parse(localStorage.getItem("savedProducts")) || []; // check if savedProducts exist, if not create an empty array of savedProducts
    console.log(addedProducts);

    addedProducts.push({
        title: title,
        price: price,
        description: description,
        image: image,
        category: category
    })
    localStorage.setItem("savedProducts", JSON.stringify(addedProducts))

    // POST product to the remote server
    // fetch("https://fakestoreapi.com/products", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         title: title,
    //         price: price,
    //         description: description,
    //         image: "https://i.pravatar.cc",
    //         category: category,
    //     }),
    // })
    // .then((res) => res.json())
    // .then((json) => console.log(json));
})