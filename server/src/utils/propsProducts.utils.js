function propsProductsUtils(data) {
  const { price, stock } = data;
  let error = {};
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
