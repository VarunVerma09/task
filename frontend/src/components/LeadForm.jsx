import { useState } from "react";
import { API_BASE } from "../api";

export default function LeadForm({ uniId }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    course: "",
    intakeYear: "",
    consent: false,
  });

  const [status, setStatus] = useState(null);
  const pipedream = import.meta.env.VITE_PIPEDREAM_URL || "";

  const handle = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (!/^\d{10}$/.test(form.phone))
      return setStatus({ error: "Phone must be 10 digits" });

    const payload = { ...form, pipedreamUrl: pipedream };

    try {
      const res = await fetch(
        (API_BASE) +
          "/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus({ success: "Thank you! We received your details." });
        setForm({
          fullName: "",
          email: "",
          phone: "",
          state: "",
          course: "",
          intakeYear: "",
          consent: false,
        });
      } else {
        setStatus({ error: data.error || "Something went wrong" });
      }
    } catch (err) {
      setStatus({ error: err.message });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Apply for Admission
      </h2>

      <form onSubmit={handle} className="space-y-4">
        
        <input
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="Full Name"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email Address"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone Number (10 digits)"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          placeholder="State"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          placeholder="Course Interested"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          value={form.intakeYear}
          onChange={(e) => setForm({ ...form, intakeYear: e.target.value })}
          placeholder="Intake Year"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <label className="flex items-center gap-3 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) =>
              setForm({ ...form, consent: e.target.checked })
            }
            className="w-5 h-5 rounded-md border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-gray-700">
            I agree to be contacted by the university.
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-medium shadow-lg transition-all"
        >
          Apply Now
        </button>

        {status && (
          <p
            className={`text-center font-medium ${
              status.error ? "text-red-600" : "text-green-600"
            }`}
          >
            {status.error || status.success}
          </p>
        )}
      </form>
    </div>
  );
}
