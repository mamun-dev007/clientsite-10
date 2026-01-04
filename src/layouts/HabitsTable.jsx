import { useEffect, useState } from "react";
import api from "../axios";

const HabitsTable = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    api.get("/dashboard/habits").then((res) => setHabits(res.data));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="mb-4 font-semibold">Recent Habits</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Title</th>
            <th>Category</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => (
            <tr key={h._id} className="border-b">
              <td>{h.title}</td>
              <td>{h.category}</td>
              <td>{h.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitsTable;
