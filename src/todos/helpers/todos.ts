import { Todo } from "@prisma/client";


// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {

  // await sleep(1000);

  const body = { complete };

  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  console.log(response);
  return response;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {

  await fetch('/api/todos', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return true;
};
