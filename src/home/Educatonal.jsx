import React from 'react';

const Educatonal = () => {
    return (
        <div>
            <section className="py-16 bg-blue-50 mt-10">
  <div className="max-w-6xl mx-auto text-center px-4">
    <h2 className="text-3xl font-bold text-blue-700 mb-10"> How It Works</h2>
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
      {[
        { title: "Create Habit", desc: "Add a new habit with your goal and reminder time." },
        { title: "Track Progress", desc: "Mark it complete daily to keep your streak alive." },
        { title: "Stay Motivated", desc: "See your progress and never lose consistency." },
        { title: "Achieve Goals", desc: "Build life-changing habits, one day at a time." },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all border border-blue-100"
        >
          <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        </div>
    );
};

export default Educatonal;