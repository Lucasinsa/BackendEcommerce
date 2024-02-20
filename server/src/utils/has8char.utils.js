function has8char(password) {
  if (password.length < 8) {
    const error = new Error("The password must contain at least 8 characters.");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;
