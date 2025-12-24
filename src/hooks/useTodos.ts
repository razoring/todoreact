import { useState } from "react";
import type { Todo } from "../types/todos";
import { dummyData } from "../data/todos";
import { useEffect } from "react";

export default function useTodos() {
    const [todos, setTodos] = useState(() => {
    const savedTodos:Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  function setTodoCompleted(id:number, completed:boolean) {
    setTodos((prevTodos) => prevTodos.map(todo => (
      todo.id === id ? {...todo, completed} : todo
    )))
  }

  function deleteTodo(id:number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  function addTodo(title:string) {
    setTodos(prevTodos => [{
      id: Date.now(),
      title,
      completed: false
    },
    ...prevTodos, 
  ])
  }

  function deleteAllCompletedTodos() {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  return {
    todos,
    setTodoCompleted,
    addTodo,
    deleteAllCompletedTodos,
    deleteTodo,
  }
}