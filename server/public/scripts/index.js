const params = new URLSearchParams(location.search);
const selector = document.querySelector(".input-search");
selector.value = params.get("title");
selector.addEventListener("keydown", async (e) => {
  try {
    if(e.key === "Enter") {
        const text = selector.value;
        location.search = "name=" + text;
    }
  } catch (error) {
    alert(error.message);
  }
});

