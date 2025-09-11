import React, { useState } from "react";

const Support = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "rgba(255,255,255,0.98)",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(10, 26, 47, 0.18)",
          padding: "40px 32px 32px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, #0a1a2f33 60%, transparent 100%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, #1a2a4033 60%, transparent 100%)",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                background: "linear-gradient(135deg,#004B89 60%,#00B5AA 100%)",
                borderRadius: "50%",
                padding: 8,
                marginBottom: 8,
                boxShadow: "0 2px 8px rgba(10,26,47,0.10)",
              }}
            >
              <path
                d="M28 6C16.9543 6 8 13.9543 8 23.5C8 29.7211 12.6875 35.0082 19.5 36.9277V44C19.5 44.8284 20.1716 45.5 21 45.5H35C35.8284 45.5 36.5 44.8284 36.5 44V36.9277C43.3125 35.0082 48 29.7211 48 23.5C48 13.9543 39.0457 6 28 6Z"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="23" r="3" fill="#fff" />
            </svg>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 28,
                color: "#00518C",
                margin: 0,
                letterSpacing: 1,
              }}
            >
              VeriQOS Support
            </h2>
            <p style={{ color: "#223354", marginTop: 8, fontSize: 16 }}>
              Need help? Our team is here for you.
            </p>
          </div>
          {submitted ? (
            <div
              style={{
                color: "#176b3a",
                background: "#e6f4ea",
                border: "1px solid #b7e0c3",
                borderRadius: 8,
                padding: "20px 16px",
                textAlign: "center",
                fontWeight: 500,
                fontSize: 18,
                marginTop: 24,
                boxShadow: "0 1px 4px rgba(23,107,58,0.08)",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                style={{ verticalAlign: "middle", marginRight: 8 }}
              >
                <circle cx="12" cy="12" r="12" fill="#176b3a" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Thank you for contacting support!
              <br />
              We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#1a2a40",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #b0b8c1",
                    borderRadius: 6,
                    fontSize: 16,
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#1a2a40",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #b0b8c1",
                    borderRadius: 6,
                    fontSize: 16,
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#1a2a40",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #b0b8c1",
                    borderRadius: 6,
                    fontSize: 16,
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#1a2a40",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #b0b8c1",
                    borderRadius: 6,
                    fontSize: 16,
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px 0",
                  background: "linear-gradient(90deg,#00518C 60%,#00B5AA 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 18,
                  border: "none",
                  borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(10,26,47,0.10)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  letterSpacing: 1,
                }}
              >
                Send Message
              </button>
            </form>
          )}
          <div
            style={{
              marginTop: 32,
              textAlign: "center",
              fontSize: 15,
              opacity: 0.85,
            }}
          >
            <span>
              Or email us directly at{" "}
              <a
                href="mailto:support@veriqos.com"
                style={{
                  color: "#004B8A",
                  fontWeight: 600,
                  textDecoration: "underline",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#00B8AB")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#004B8A")}
              >
                support@veriqos.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
