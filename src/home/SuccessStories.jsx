import React from "react";

const SuccessStories = () => (
 <section className="bg-blue-50 py-12 mt-12">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-blue-700 mb-8"> Success Stories</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[
        { name: "Arif H.", habit: "Morning Exercise", quote: "Now I wake up early and feel more energetic!", img: "https://i.ibb.co/0fN4GZv/avatar1.png" },
        { name: "Sadia R.", habit: "Reading Daily", quote: "Consistency changed my mindset.", img: "https://i.ibb.co/Fx9wHZK/avatar2.png" },
        { name: "Tanvir K.", habit: "Meditation", quote: "Less stress, more focus — life feels balanced!", img: "https://i.ibb.co/6tH90KJ/avatar3.png" },
      ].map((s, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow text-center">
          <img src={s.img} alt={s.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
          <h4 className="font-semibold text-lg">{s.name}</h4>
          <p className="text-sm text-gray-500 italic">“{s.quote}”</p>
          <p className="text-xs text-blue-600 mt-2">Habit: {s.habit}</p>
        </div>
      ))}
    </div>
  </div>
</section>

);

export default SuccessStories;
