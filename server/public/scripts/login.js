const btnLogin = document.querySelector("#btn-login");
const btnLoginGoogle = document.querySelector("#btn-login-google")

btnLogin.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const data = {
      email: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
    alert(response.response);
    response.statusCode === 200 && location.replace("/");
  } catch (error) {
    alert(error.message);
  }
});

btnLoginGoogle.addEventListener("click", async(e) => {
  try {
    e.preventDefault();
    const opts = {
      method: "GET",
      // headers: { 
      //   "Content-Type": "application/json",
      //   "token": localStorage.getItem("token")
      // },
      // body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    alert(response.response);
    response.statusCode === 200 && location.replace("/");
  } catch (error) {
    console.log(error)
  }
})
