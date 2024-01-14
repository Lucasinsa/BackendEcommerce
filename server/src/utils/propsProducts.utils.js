function propsProductsUtils(data) {
  const { title, photo, price, stock } = data;
  let error = {};
  if (!title || !photo || !price || !stock) {
    error = new Error("Please enter title, photo, price and stock.");
    error.statusCode = 400;
    throw error;
  }
  if (isNaN(Number(price)) || Number(price) < 0) {
    error = new Error("Please, enter a valid price.");
    error.statusCode = 400;
    throw error;
  }
  if (isNaN(Number(stock)) || Number(stock) < 0) {
    error = new Error("Please, enter a valid stock.");
    error.statusCode = 400;
    throw error;
  }
}

export default propsProductsUtils;
