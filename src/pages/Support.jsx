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
    setSubmitted(true);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-white no-scrollbar relative top-36">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-sky-900/20 to-transparent blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br from-teal-900/20 to-transparent blur-2xl" />

        <div className="relative z-10 text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-700 to-teal-500 shadow-lg p-3">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 6C16.9543 6 8 13.9543 8 23.5C8 29.7211 12.6875 35.0082 19.5 36.9277V44C19.5 44.8284 20.1716 45.5 21 45.5H35C35.8284 45.5 36.5 44.8284 36.5 44V36.9277C43.3125 35.0082 48 29.7211 48 23.5C48 13.9543 39.0457 6 28 6Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="23" r="3" fill="currentColor" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-sky-800 tracking-wide">
            VeriQOS Support
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Need help? Our team is here for you.
          </p>
        </div>

        {submitted ? (
          <div className="text-green-800 bg-green-100 border border-green-200 rounded-lg p-6 text-center font-medium text-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8 text-green-700 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="12" fill="currentColor" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Thank you for contacting support!
            </div>
            <p className="text-sm text-green-700">
              We will get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-800 resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-700 to-teal-500 text-white font-bold text-lg rounded-lg shadow-lg hover:opacity-90 transition tracking-wide"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-slate-600">
          Or email us directly at{" "}
          <a
            href="mailto:support@veriqos.com"
            className="font-semibold text-sky-700 hover:text-teal-600 underline transition"
          >
            support@veriqos.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
