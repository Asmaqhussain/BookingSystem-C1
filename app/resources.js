// ===============================
// Resources page UI wiring (C1 updated)
// - resources.js creates the dynamic elements (name input + action buttons)
// - form.js handles validation, colors, and enabling/disabling Create
// ===============================

// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameContainer = document.getElementById("resourceNameContainer");

// Example roles
const role = "admin"; // "reserver" | "admin"

// Button refs
let createButton = null;
let updateButton = null;
let deleteButton = null;

// ===============================
// 2) Button creation helpers
// ===============================
const BUTTON_BASE_CLASSES =
  "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";

const BUTTON_ENABLED_CLASSES =
  "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

function addButton({ label, type = "button", value, classes = "" }) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = label;
  btn.name = "action";
  if (value) btn.value = value;

  btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();
  actions.appendChild(btn);
  return btn;
}

function setButtonEnabled(btn, enabled) {
  if (!btn) return;

  btn.disabled = !enabled;

  // disabled look
  btn.classList.toggle("cursor-not-allowed", !enabled);
  btn.classList.toggle("opacity-50", !enabled);

  // remove hover feel when disabled
  if (!enabled) {
    btn.classList.remove("hover:bg-brand-dark/80");
  } else {
    if (btn.value === "create" || btn.textContent === "Create") {
      btn.classList.add("hover:bg-brand-dark/80");
    }
  }
}

function renderActionButtons(currentRole) {
  // Clear container in case it rerenders
  actions.innerHTML = "";

  if (currentRole === "reserver") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      value: "create",
      classes: BUTTON_ENABLED_CLASSES,
    });
  }

  if (currentRole === "admin") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      value: "create",
      classes: BUTTON_ENABLED_CLASSES,
    });

    updateButton = addButton({
      label: "Update",
      type: "submit",
      value: "update",
      classes: BUTTON_ENABLED_CLASSES,
    });

    deleteButton = addButton({
      label: "Delete",
      type: "submit",
      value: "delete",
      classes: BUTTON_ENABLED_CLASSES,
    });
  }

  // IMPORTANT: id that form.js expects
  if (createButton) createButton.id = "resourceCreateBtn";

  // Default: disabled until form.js validation enables Create
  setButtonEnabled(createButton, false);
  setButtonEnabled(updateButton, false);
  setButtonEnabled(deleteButton, false);
}

// ===============================
// 3) Input creation (name input is dynamic)
// ===============================
function createResourceNameInput(container) {
  container.innerHTML = "";

  const input = document.createElement("input");

  // Core attributes
  input.id = "resourceName";
  input.name = "resourceName";
  input.type = "text";
  input.placeholder = "e.g., Meeting Room A";

  // Base Tailwind styling (same as your version)
  input.className = `
    mt-2 w-full rounded-2xl border border-black/10 bg-white
    px-4 py-3 text-sm outline-none
    focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30
    transition-all duration-200 ease-out
  `;

  container.appendChild(input);
  return input;
}

// ===============================
// 4) Bootstrapping
// ===============================
renderActionButtons(role);
createResourceNameInput(resourceNameContainer);

// After dynamic elements exist, ask form.js to compute state + wire live validation
// (form.js already listens to input events, but we call once to set initial disabled state + colors)
if (typeof updateResourceFormState === "function") {
  updateResourceFormState();
}
