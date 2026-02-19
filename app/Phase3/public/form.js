// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

// Timestamp
function timestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").replace("Z", "");
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) return;
  form.addEventListener("submit", onSubmit);
});

async function onSubmit(event) {
  event.preventDefault();

  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";

  const selectedUnit =
    document.querySelector('input[name="resourcePriceUnit"]:checked')?.value ??
    "";

  const priceRaw = $("resourcePrice")?.value ?? "";
  const resourcePrice = priceRaw === "" ? 0 : Number(priceRaw);

  const payload = {
    action: actionValue,
    resourceName: $("resourceName")?.value ?? "",
    resourceDescription: $("resourceDescription")?.value ?? "",
    resourceAvailable: $("resourceAvailable")?.checked ?? false,
    resourcePrice,
    resourcePriceUnit: selectedUnit,
  };

  try {
    console.log("--------------------------");
    console.log("The request sent to the server " + `[${timestamp()}]`);
    console.log("--------------------------");

    const response = await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();
    const echo = data && data.echo ? data.echo : data;

    let msg = "Server response " + `[${timestamp()}]\n`;
    msg += "--------------------------\n";
    msg += "Status ➡️ " + response.status + "\n";
    msg += "Action ➡️ " + (echo.action ?? payload.action) + "\n";
    msg += "Name ➡️ " + (echo.resourceName ?? echo.name ?? "") + "\n";
    msg += "Description ➡️ " + (echo.resourceDescription ?? echo.description ?? "") + "\n";
    msg += "Availability ➡️ " + (echo.resourceAvailable ?? echo.available ?? false) + "\n";
    msg += "Price ➡️ " + (echo.resourcePrice ?? echo.price ?? 0) + "\n";
    msg += "Price unit ➡️ " + (echo.resourcePriceUnit ?? echo.unit ?? "") + "\n";

    console.log("Server response " + `[${timestamp()}]`);
    console.log("--------------------------");
    console.log("Status ➡️ ", response.status);
    console.log("Action ➡️ ", echo.action ?? payload.action);
    console.log("Name ➡️ ", echo.resourceName ?? echo.name);
    console.log("Description ➡️ ", echo.resourceDescription ?? echo.description);
    console.log("Availability ➡️ ", echo.resourceAvailable ?? echo.available);
    console.log("Price ➡️ ", echo.resourcePrice ?? echo.price);
    console.log("Price unit ➡️ ", echo.resourcePriceUnit ?? echo.unit);
    console.log("--------------------------");

    alert(msg);
  } catch (err) {
    console.error("POST error:", err);
  }
}