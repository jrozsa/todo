import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodoLists } from "../src/pages/TodoLists";
import { AddTodoItem } from "./pages/AddTodoItem";
import { AddTodoList } from "./pages/AddTodoList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":id",
        element: <TodoLists />,
      },
      {
        path: "add",
        element: <AddTodoList />,
      },
      {
        path: ":id/addItem",
        element: <AddTodoItem />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
