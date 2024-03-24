const btnLogOut = document.querySelector(".btn-log-out");

if(btnLogOut) {
    btnLogOut.addEventListener("click", async(e) => {
        try {
            e.preventDefault();
            await fetch("/api/sessions/signout", {
                method: "POST"
            });
            location.replace("/")
        } catch (error) {
            alert(error.message)
        }
    })
}
