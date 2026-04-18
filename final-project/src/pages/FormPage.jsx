import { useState } from "react";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    date: false,
  });

  const [responseData, setResponseData] = useState(null);

  const validateField = (field, value) => {
    if (field === "name") {
      return value.trim() ? "" : "Name is required";
    }
    if (field === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
      return "";
    }
    if (field === "date") {
      return value ? "" : "Date is required";
    }
    return "";
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const isValid =
    validateField("name", formData.name) === "" &&
    validateField("email", formData.email) === "" &&
    validateField("date", formData.date) === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  return (
    <section className="order-form">
      <h1>Booking Form</h1>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="form-row">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && errors.name && (
            <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* EMAIL */}
        <div className="form-row">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email && (
            <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* DATE */}
        <div className="form-row">
          <label htmlFor="date">Booking Date</label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            onBlur={() => handleBlur("date")}
          />
          {touched.date && errors.date && (
            <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn primary"
            type="submit"
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Submit
          </button>
        </div>
      </form>

      {/* RESPONSE BOX */}
      {responseData && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "var(--card)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Response from Server</h2>
          <pre style={{ color: "var(--text)" }}>
            {JSON.stringify(responseData.json, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
