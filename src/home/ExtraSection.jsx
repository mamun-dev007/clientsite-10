import React from "react";

const testimonials = [
  { name: "Alice", text: "Tracking habits changed my life!" },
  { name: "Bob", text: "I love seeing my streaks every day." },
];

const ExtraSection = () => (
  <section className="py-12 max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-6 text-center">What Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="p-6 border rounded shadow">
          <p className="text-gray-700 mb-2">"{t.text}"</p>
          <p className="font-semibold">- {t.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExtraSection;
