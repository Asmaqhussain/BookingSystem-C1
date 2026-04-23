async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";

      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;

      div.addEventListener("click", () => {
        document.getElementById("customer-id").value = person.id;
        document.getElementById("first-name").value = person.first_name || "";
        document.getElementById("last-name").value = person.last_name || "";
        document.getElementById("email").value = person.email || "";
        document.getElementById("phone").value = person.phone || "";
        document.getElementById("birth-date").value = person.birth_date
          ? person.birth_date.split("T")[0]
          : "";
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

loadCustomers();

const form = document.getElementById("customer-management-form");
const updateButton = document.getElementById("update-button");
const deleteButton = document.getElementById("delete-button");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newCustomer = {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birth_date: document.getElementById("birth-date").value
  };

  try {
    const res = await fetch("/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    });

    if (!res.ok) {
      throw new Error("Failed to add customer");
    }

    form.reset();
    document.getElementById("customer-id").value = "";
    loadCustomers();

  } catch (err) {
    console.error(err);
    alert("Error adding customer");
  }
});


updateButton.addEventListener("click", async () => {
  const customerId = document.getElementById("customer-id").value;

  if (!customerId) {
    alert("Please select a customer first.");
    return;
  }

  const updatedCustomer = {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birth_date: document.getElementById("birth-date").value
  };

  try {
    const res = await fetch(`/api/persons/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCustomer)
    });

    if (!res.ok) {
      throw new Error("Failed to update customer");
    }

    form.reset();
    document.getElementById("customer-id").value = "";
    loadCustomers();

  } catch (err) {
    console.error(err);
    alert("Error updating customer");
  }
});


deleteButton.addEventListener("click", async () => {
  const customerId = document.getElementById("customer-id").value;

  if (!customerId) {
    alert("Please select a customer first.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this customer?");
  if (!confirmDelete) {
    return;
  }

  try {
    const res = await fetch(`/api/persons/${customerId}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete customer");
    }

    form.reset();
    document.getElementById("customer-id").value = "";
    loadCustomers();

  } catch (err) {
    console.error(err);
    alert("Error deleting customer");
  }
});