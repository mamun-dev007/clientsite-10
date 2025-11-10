import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
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
import { AuthProvider } from "./context/AuthContext.jsx"
import PublicHabit from "./routes/PublicHabit.jsx";

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
        path: "/my-habits",
        element: (
          <ProtectedRoute>
            <MyHabits />
          </ProtectedRoute>
        ),
      },
      {
        path: "/publichabit",
        element:<PublicHabit></PublicHabit>
      },
      // {
      //   path: "habit/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <HabitDetails />
      //     </ProtectedRoute>
      //   ),
      // },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
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
