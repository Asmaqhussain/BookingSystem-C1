// ===============================
// Form handling for resources page (C1 validation)
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

function logSection(title, data) {
  console.group(title);
  console.log(data);
  console.groupEnd();
}

function cleanedValue(el) {
  return (el?.value ?? "").trim();
}

// Name: 5–30 chars, letters/numbers/spaces only
function isValidResourceName(value) {
  if (!value) return false;
  if (value.length < 5 || value.length > 30) return false;
  return /^[A-Za-z0-9 ]+$/.test(value);
}

// Description: 10–50 chars, letters/numbers/spaces only
function isValidResourceDescription(value) {
  if (!value) return false;
  if (value.length < 10 || value.length > 50) return false;
  return /^[A-Za-z0-9 ]+$/.test(value);
}

// Red/green border even when focused (override focus blue)
function setFieldState(el, ok) {
  if (!el) return;

  el.classList.remove(
    // red
    "border-red-500",
    "ring-2",
    "ring-red-200",
    "focus:border-red-500",
    "focus:ring-red-200",
    // green
    "border-green-500",
    "ring-green-200",
    "focus:border-green-500",
    "focus:ring-green-200",
    // default blue focus (remove it so our colors show)
    "focus:border-brand-blue",
    "focus:ring-brand-blue/30"
  );

  // always keep a ring
  el.classList.add("ring-2");

  if (ok) {
    el.classList.add(
      "border-green-500",
      "ring-green-200",
      "focus:border-green-500",
      "focus:ring-green-200"
    );
  } else {
    el.classList.add(
      "border-red-500",
      "ring-red-200",
      "focus:border-red-500",
      "focus:ring-red-200"
    );
  }
}

// Enable Create only when BOTH fields valid
function updateResourceFormState() {
  const nameEl = $("resourceName");
  const descEl = $("resourceDescription");
  const createBtn = $("resourceCreateBtn");

  // If resources.js hasn’t created elements yet, exit safely
  if (!nameEl || !descEl || !createBtn) return;

  const name = cleanedValue(nameEl);
  const desc = cleanedValue(descEl);

  const nameOk = isValidResourceName(name);
  const descOk = isValidResourceDescription(desc);

  setFieldState(nameEl, nameOk);
  setFieldState(descEl, descOk);

  const allOk = nameOk && descOk;

  // real enable/disable
  createBtn.disabled = !allOk;

  // update "disabled look" that resources.js uses
  createBtn.classList.toggle("cursor-not-allowed", !allOk);
  createBtn.classList.toggle("opacity-50", !allOk);
}

// Build valid payload or return null (blocks bad requests)
function getValidatedResourcePayloadOrNull(actionValue) {
  const nameEl = $("resourceName");
  const descEl = $("resourceDescription");

  const name = cleanedValue(nameEl);
  const desc = cleanedValue(descEl);

  const nameOk = isValidResourceName(name);
  const descOk = isValidResourceDescription(desc);

  // always update UI
  updateResourceFormState();

  if (!nameOk || !descOk) return null;

  return {
    action: actionValue,
    resourceName: name,
    resourceDescription: desc,
    resourceAvailable: $("resourceAvailable")?.checked ?? false,
    resourcePrice: $("resourcePrice")?.value ?? "",
    resourcePriceUnit:
      document.querySelector('input[name="resourcePriceUnit"]:checked')?.value ?? ""
  };
}

// ------------ Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) {
    console.warn('resourceForm not found. Ensure the form has id="resourceForm".');
    return;
  }

  // Live validation for name + description
  document.addEventListener("input", (e) => {
    if (e.target?.id === "resourceName" || e.target?.id === "resourceDescription") {
      updateResourceFormState();
    }
  });

  // Initial state (Create disabled)
  updateResourceFormState();

  form.addEventListener("submit", onSubmit);
});

async function onSubmit(event) {
  event.preventDefault();

  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";

  // Block if invalid
  const payload = getValidatedResourcePayloadOrNull(actionValue);
  if (!payload) {
    console.warn("Form invalid: request not sent.");
    return;
  }

  logSection("Sending payload to httpbin.org/post", payload);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();

    console.group("Response from httpbin.org");
    console.log("Status:", response.status);
    console.log("URL:", data.url);
    console.log("You sent (echo):", data.json);
    console.log("Headers (echoed):", data.headers);
    console.groupEnd();
  } catch (err) {
    console.error("POST error:", err);
  }
}
