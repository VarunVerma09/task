import { useEffect, useState } from "react";
import LeadForm from "../components/LeadForm";
import FeesModal from "../components/FeesModal";
import { fetchUniversity } from "../api";

export default function Landing2() {
  const [uni, setUni] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUniversity("uni2").then(setUni).catch(() => null);
  }, []);

  if (!uni)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO ================= */}
      <div
        className="w-full h-[420px] md:h-[480px] rounded-b-3xl bg-cover bg-center
                   flex flex-col justify-center px-6 md:px-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg')",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
          {uni.name}
        </h1>
        <p className="text-white/90 text-lg md:text-xl mt-4 max-w-xl leading-relaxed drop-shadow">
          Your path to a brighter future begins here. Explore world-class
          education, placements and modern campus facilities.
        </p>

        <a
          href="#form"
          className="mt-6 inline-block max-w-sm text-center bg-white text-blue-700 px-6 py-3 rounded-xl
                     font-semibold shadow-lg hover:bg-blue-50 transition"
        >
          Apply Now
        </a>
      </div>

      {/* ================= CONTENT ================= */}
      <section className="grid md:grid-cols-2 gap-10 px-6 md:px-20 py-12">
        {/* ------------ LEFT SIDE ------------ */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose {uni.name}?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">{uni.overview}</p>

          {/* Placements */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Placement Highlights
            </h4>
            <p className="text-gray-700">
              Average CTC:{" "}
              <span className="text-blue-600 font-semibold">
                {uni.placements.avgCTC}
              </span>
            </p>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Campus Facilities
            </h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {uni.facilities.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white
                         rounded-xl shadow-md transition font-medium"
            >
              Check Course Fees
            </button>

            <a
              href="#"
              className="px-5 py-3 border border-blue-600 text-blue-700 rounded-xl
                         hover:bg-blue-50 transition font-medium"
            >
              Download Brochure
            </a>
          </div>
        </div>

        {/* ------------ RIGHT SIDE (FORM) ------------ */}
        <div
          id="form"
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl 
                     border border-gray-200"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Apply for Admission
          </h3>

          <p className="text-gray-600 text-sm mb-6">
            Fill in your details and our admission team will contact you soon.
          </p>

          <LeadForm uniId="uni2" />
        </div>
      </section>

      {/* ================= FEES MODAL ================= */}
      <FeesModal
        uniId="uni2"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
