const title = document.getElementById("input-title");
const photo = document.getElementById("input-photo");
const price = document.getElementById("input-price");
const stock = document.getElementById("input-stock");

document.getElementById("btn-create").addEventListener("click", async(event) => {
    try {
        event.preventDefault()
        const data = {
            name: title.value,
            photo: photo.value,
            price: price.value,
            stock: stock.value
        };
        const opts = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/clothes", opts)
        response = await response.json()
        alert("Product added to database!")
        title.value = ""
        photo.value = ""
        price.value = ""
        stock.value = ""
    } catch (error) {
        alert(error.message) 
    }
});
