import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: false },
    { id: 3, text: 'Finish homework', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleToggle = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const getTotalTasks = () => {
    return todos.length;
  };

  const getCompletedTasks = () => {
    return todos.filter((todo) => todo.completed).length;
  };

  return (
    <div className="TodoList">
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li className="Task" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            {todo.completed && (
              <button className="removeButton" onClick={() => handleRemoveTask(todo.id)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="AddTask">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <p>
        Total tasks: {getTotalTasks()} | Completed tasks: {getCompletedTasks()}
      </p>
      <button className="clearButton" onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoList;
