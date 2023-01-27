import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const BASE_PATH = "https://63bef2ade348cb07621cf32a.mockapi.io/";

export type TodoList = {
  name: string;
  id: string;
};

export type TodoItem = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isDone: boolean;
};

/*
 *  Todo Lists
 */
const fetchAllTodoLists = async () => {
  const response = await fetch(BASE_PATH + "todoList");
  return response.json();
};

export const useGetTodoLists = () => {
  return useQuery<TodoList[]>({
    queryKey: ["todoLists"],
    queryFn: fetchAllTodoLists,
  });
};

const createTodoList = async (name: string) => {
  const response = await fetch(BASE_PATH + "todoList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const useCreateTodoList = () => {
  const queryClient = useQueryClient();
  return useMutation<Response, unknown, string>(
    (name) => createTodoList(name),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoLists"]);
      },
    }
  );
};

/*
 *   Todo Items
 */
const fetchAllTodoItemsInList = async (todoListId: string | undefined) => {
  if (!todoListId) {
    return null;
  }
  const response = await fetch(BASE_PATH + `todoList/${todoListId}/todoItem`);
  return response.json();
};

export const useGetTodoItemsInList = (listId: string | undefined) => {
  return useQuery<TodoItem[]>({
    queryKey: ["todoListItems", listId],
    queryFn: () => fetchAllTodoItemsInList(listId),
  });
};

export type CreateItemData = {
  title: string;
  description: string;
  dueDate: string;
};

export const createTodoItem = async (
  todoItemData: CreateItemData,
  todoListId: string | undefined
) => {
  const response = await fetch(BASE_PATH + `todoList/${todoListId}/todoItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItemData),
  });
  return response.json();
};

export const useCreateTodoItem = (listId: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<Response, unknown, CreateItemData>(
    (data) => createTodoItem(data, listId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoListItems", listId]);
        navigate(`/${listId}`);
      },
    }
  );
};

export type UpdateItemData = {
  isDone: boolean;
  id: string;
};

const updateTodoItem = async (
  data: UpdateItemData,
  todoListId: string | undefined
) => {
  const response = await fetch(
    BASE_PATH + `todoList/${todoListId}/todoItem/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const useUpdateTodoItem = (listId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<Response, unknown, UpdateItemData>(
    (data) => updateTodoItem(data, listId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoListItems", listId]);
      },
    }
  );
};

type DeleteItemData = {
  todoItemId: string;
};

export const useDeleteTodoItem = (listId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<Response, unknown, DeleteItemData>(
    async (data) =>
      await fetch(
        BASE_PATH + `todoList/${listId}/todoItem/${data.todoItemId}`,
        {
          method: "DELETE",
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoListItems", listId]);
      },
    }
  );
};
