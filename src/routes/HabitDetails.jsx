import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaFire } from "react-icons/fa";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];  
const [completedToday, setCompletedToday] = useState(false);
const [currentStreak, setCurrentStreak] = useState(0);



useEffect(() => {
   if (habit) {
    setCurrentStreak(habit.streak || 0);
  }
  const completedData = JSON.parse(
    localStorage.getItem("completedHabits") || "{}"
  );

  if (completedData[id] === today) {
    setCompletedToday(true);
  }
}, [habit,id, today]);



  useEffect(() => {
    fetch(`https://backend-10-lime.vercel.app/api/habits/${id}`)
      .then(res => res.json())
      .then(data => setHabit(data))
      .finally(() => setLoading(false));
  }, [id]);

const handleMarkComplete = () => {
  if (completedToday) {
    toast.info("Already completed today!");
    return;
  }

  
  const newStreak = currentStreak + 1;
  setCurrentStreak(newStreak);
  setCompletedToday(true);

  toast.success("Habit marked complete!");

  const completedData = JSON.parse(
    localStorage.getItem("completedHabits") || "{}"
  );
  completedData[id] = today;
  localStorage.setItem("completedHabits", JSON.stringify(completedData));

  const streakData = JSON.parse(
    localStorage.getItem("habitStreaks") || "{}"
  );
  streakData[id] = newStreak;
  localStorage.setItem("habitStreaks", JSON.stringify(streakData));
};



  if (loading)
    return <p className="text-center mt-10">Loading habit details...</p>;

  if (!habit)
    return <p className="text-center text-red-500 mt-10">Habit not found!</p>;

  return (
    <section className="
  min-h-screen bg-gray-50 dark:bg-gray-900
  text-white
">


<div className="max-w-7xl mx-auto  pt-32 px-5">
<div className="flex lg:gap-20 gap-5 mx-auto">
  <div className=" mb-10">
            <img
              src={habit.image}
              alt="habit"
              className="h-64 w-full object-cover rounded-xl"
            />
      </div>
      
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-3 text-black dark:text-white ">{habit.title}</h2>
        <p className="text-gray-600 leading-relaxed pb-10">
          {habit.description}
        </p>

<div className="hidden sm:block">
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Category</h4>
          <p>{habit.category}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow ">
          <h4 className="font-semibold mb-2">Current Streak</h4>
          <p className="flex items-center gap-2 text-orange-500">
            <FaFire /> {currentStreak} days

          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Difficulty</h4>
          <p>{habit.difficulty || "Medium"}</p>
        </div>
      </div>
</div>
       
      </div>
</div>
   
<div className="sm:block md:hidden">
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Category</h4>
          <p>{habit.category}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Current Streak</h4>
          <p className="flex items-center gap-2 text-orange-500">
            <FaFire /> {habit.streak || 0} days
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Difficulty</h4>
          <p>{habit.difficulty || "Medium"}</p>
        </div>
      </div>
</div>
     
     <div className="py-4">
      <h3 className="text-2xl font-semibold mb-4">Description </h3>
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
        {habit.description}
      </div>
      
     </div>

      <div className="mb-14">
        <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <p className="flex items-center gap-2 mb-2">
            <FaStar className="text-yellow-500" /> 4.8 / 5
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            “This habit helped me stay consistent for over 30 days!”
          </p>
          <p className="text-sm mt-2 text-gray-400">— Anonymous User</p>
        </div>
      </div>

      <button
  onClick={handleMarkComplete}
  disabled={completedToday}
  className={`
    block w-full text-center py-3 rounded-md transition mb-16
    ${completedToday
      ? "bg-gray-400 cursor-not-allowed text-gray-700"
      : "bg-gradient-to-r from-[#255f85] to-[#1f4f6d] hover:from-[#133247] hover:to-[#133c55] text-white"}
  `}
>
  {completedToday ? "Completed Today ✔" : "Mark Today as Complete"}
</button>


      <div>
        <h3 className="text-2xl font-semibold mb-6">
          Related Habits
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow "
            >
              <h4 className="font-semibold mb-2">
                Morning Routine
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Build a productive start to your day.
              </p>

              <Link
                to={`/habit-details/`}
                className="btn-primary"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
</div>

     

    </section>
  );
};

export default HabitDetails;
