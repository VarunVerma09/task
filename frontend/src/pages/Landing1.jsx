import { useEffect, useState } from "react";
import LeadForm from "../components/LeadForm";
import FeesModal from "../components/FeesModal";
import { fetchUniversity } from "../api";

export default function Landing1() {
  const [uni, setUni] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUniversity("uni1").then(setUni).catch(() => null);
  }, []);

  if (!uni)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[55vh] md:h-[70vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
          className="w-full h-full object-cover"
          alt="Campus"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-600/50" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {uni.name}
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-gray-200">
            Your path to a brighter future begins here. Explore world-class
            education, placements and modern campus facilities.
          </p>

          <a
            href="#form"
            className="mt-6 w-fit px-6 py-3 bg-white/90 text-purple-700 font-semibold rounded-xl shadow-lg hover:bg-white transition"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="grid md:grid-cols-2 gap-12 px-6 md:px-20 py-16">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose {uni.name}?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {uni.overview}
          </p>

          {/* Placements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Placement Highlights
            </h3>
            <p className="text-gray-700">
              Average CTC:{" "}
              <span className="font-semibold text-purple-700">
                {uni.placements.avgCTC}
              </span>
            </p>
          </div>

          {/* Facilities */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Campus Facilities
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-8">
            {uni.facilities.map((x) => (
              <li key={x} className="text-lg">
                {x}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition"
            >
              Check Course Fees
            </button>

            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-purple-600 text-purple-700 hover:bg-purple-50 transition"
            >
              Download Brochure
            </a>
          </div>
        </div>

        {/* FORM SECTION */}
        <div
          id="form"
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Apply for Admission
          </h3>
          <p className="text-gray-700 mb-6">
            Fill in your details and our admission team will contact you soon.
          </p>

          <LeadForm uniId={"uni1"} />
        </div>
      </section>

      {/* FEES MODAL */}
      <FeesModal
        uniId="uni1"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
