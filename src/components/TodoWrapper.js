import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import Calendar from 'react-calendar';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date()); // Nouvel état pour la date du calendrier

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const writtingTaskComplete = (id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  }

  const editTodo = (id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
    );
  }

  const editTask = (task, id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
    );
  };

  return (
      <div className="TodoWrapper">
        <h1>Votre liste de tache</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo) =>
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    writtingTaskComplete={writtingTaskComplete}
                />
            )
        )}
        <Calendar value={date} onChange={setDate} />
      </div>
  );
};