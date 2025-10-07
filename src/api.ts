import type {Todo} from './types';

const BASE_URL = "https://your-backend-url"

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}/todos/`)
  return res.json()
}

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  })
  return res.json()
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  })
  return res.json()
}

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" })
}
