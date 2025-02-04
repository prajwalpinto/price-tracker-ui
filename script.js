document.getElementById("create-item").addEventListener("click", () => {
  fetch("http://localhost:5000/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      store: "NoFrills",
      customName: "Cilantro",
      basePrice: 2,
      url: "https://api.pcexpress.ca/pcx-bff/api/v1/products/20091825001_EA",
    }),
  })
    .then((response) => response.json())
    .then(() => getItems()) // Refresh items after creation
    .catch((error) => alert("Error: " + error));
});

document.getElementById("get-items").addEventListener("click", getItems);

function getItems() {
  fetch("http://localhost:5000/api/items")
    .then((response) => response.json())
    .then((data) => {
      let list = document.getElementById("grocery-list");
      list.innerHTML = "<h2>Grocery Items:</h2>";
      data.forEach((item) => {
        list.innerHTML += `
                <div class="item" id="item-${item.id}">
                    <strong>${item.customName}</strong> - ${item.store} - $${item.basePrice} <br>
                    <a href="${item.url}" target="_blank">View Item</a><br><br>
                    
                    <input type="text" id="name-${item.id}" placeholder="New Name" value="${item.customName}">
                    <input type="number" id="price-${item.id}" placeholder="New Price" value="${item.basePrice}">
                    <button onclick="editItem('${item.id}')">Edit</button>
                    <button onclick="deleteItem('${item.id}')">Delete</button>
                </div>
            `;
      });
    })
    .catch((error) => alert("Error: " + error));
}

function editItem(id) {
  const newName = document.getElementById(`name-${id}`).value;
  const newPrice = document.getElementById(`price-${id}`).value;

  fetch(`http://localhost:5000/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      store: "NoFrills",
      customName: newName,
      basePrice: newPrice,
      url: "https://api.pcexpress.ca/pcx-bff/api/v1/products/20091825001_EA",
    }),
  })
    .then((response) => response.json())
    .then(() => getItems()) // Refresh items after edit
    .catch((error) => alert("Error: " + error));
}

function deleteItem(id) {
  fetch(`http://localhost:5000/api/items/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      document.getElementById(`item-${id}`).remove(); // Remove from UI
    })
    .catch((error) => alert("Error: " + error));
}
