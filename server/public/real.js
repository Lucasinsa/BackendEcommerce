const socket = io();

socket.on("products", (data) => {
  const container = document.querySelector(".products-container");
  if (typeof data.products === "string") {
    container.innerHTML = `<h4 class="text-light h-100 no-products">${data.products}</h4>`;
  } else {
    const products = data.products
      .map((each) => {
        return `<div class="card" style="width: 18rem;">
                <img src=${each.photo} class="card-img-top" alt=${each.id}>
                <div class="card-body">
                    <h4 class="card-title h5 text-center fw-bolder">${each.title}</h4>
                    <p class="card-text text-center fw-normal">$${each.price}</p>
                    <a href="#" class="btn btn-dark text-center w-100">ADD TO CART</a>
                </div>
            </div>`;
      })
      .join("");
    container.innerHTML = products;
  }
});
