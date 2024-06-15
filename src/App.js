import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import DeletePost from "./pages/DeletePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "authors", element: <Authors /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
