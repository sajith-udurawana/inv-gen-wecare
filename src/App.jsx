import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Editor from "./Editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Editor />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
