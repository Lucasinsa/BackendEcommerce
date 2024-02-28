const btnRegister = document.getElementById("btn-register")

btnRegister.addEventListener("click", async(e) => {
    try {
        e.preventDefault()
        const data = {
            name: document.getElementById("input-name").value,
            photo: document.getElementById("input-photo").value,
            email: document.getElementById("input-email").value,
            password: document.getElementById("input-password").value,
        }
        const opt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/register", opt)
        response = await response.json()
        alert(response.response)
        response.statusCode === 201 && location.replace("/auth/login")
    } catch (error) {
        alert(error.message)
    }
})
