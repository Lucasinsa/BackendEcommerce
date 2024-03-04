const btnLogin = document.querySelector("#btn-login");
const btnLoginGoogle = document.querySelector("#btn-login-google")
const btnLoginGithub = document.querySelector("#btn-login-github")

//Local login
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

//Google Login
btnLoginGoogle.addEventListener("click", async(e) => {
  try {
    e.preventDefault();
    const opts = {
      method: "POST"
    };
    let response = await fetch("/api/sessions/google", opts);
    console.log(response);
    response = await response.json();
    alert(response.response);
    response.statusCode === 200 && location.replace("/");
  } catch (error) {
    console.log(error)
  }
})

//Github Login
btnLoginGithub.addEventListener("click", async(e) => {
  try {
    e.preventDefault();
    const opts = {
      method: "POST",
    };
    let response = await fetch("/api/sessions/github", opts);
    console.log(response);
    response = await response.json();
    alert(response.response);
    response.statusCode === 200 && location.replace("/");
  } catch (error) {
    console.log(error)
  }
})
