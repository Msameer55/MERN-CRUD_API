import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoutes";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import AllPosts from "./Pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <ProtectedRoute publicOnly>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute publicOnly>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedRoute publicOnly>
            <Home />
          </ProtectedRoute>
        ),
      },
        {
        path: "/create-post",
        element: (
          <ProtectedRoute >
            <CreatePost />
          </ProtectedRoute>
        ),
      },
        {
        path: "/get-user-post",
        element: (
          <ProtectedRoute >
            <AllPosts />
          </ProtectedRoute>
        ),
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
