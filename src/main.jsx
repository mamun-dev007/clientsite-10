import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import Home from "./routes/Home.jsx";
import AddHabit from "./routes/AddHabit.jsx";
import MyHabits from "./routes/MyHabits.jsx";
import HabitDetails from "./routes/HabitDetails.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import NotFound from "./routes/NotFound.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import UpdateHabit from "./routes/UpdateHabit.jsx";
import PublicHabits from "./routes/PublicHabit.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./layouts/DashboardHome.jsx";
import Profile from "./layouts/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "/add-habit",
        element: (
          <ProtectedRoute>
            <AddHabit />
          </ProtectedRoute>
        ),
      },

      {
        path: "/add-habits",
        element: (
            <AddHabit />
        ),
      },
      {
        path: "/PublicHabit",
        element: <PublicHabits />,
      },
      {
        path: "/habit-details/:id",
        element: <HabitDetails />,
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/updatehabit/:id",
        element: (
          <ProtectedRoute>
            <UpdateHabit />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      { path: "my-Habits", element: <MyHabits /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
