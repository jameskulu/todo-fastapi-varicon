import { useEffect, useState } from "react";
import api from "../api";
import "./TodoList.css"; // import custom css

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/api/v1/todos/");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post("/api/v1/todos/", { title, completed: false });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await api.put(`/api/v1/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/api/v1/todos/${id}`);
    fetchTodos();
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    await api.put(`/api/v1/todos/${id}`, { title: editTitle });
    setEditingId(null);
    setEditTitle("");
    fetchTodos();
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-box">
        <h1>My Todo List</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleTodo(todo.id, todo.completed)}>
                    {todo.title}
                  </span>
                  <div className="actions">
                    <button onClick={() => startEditing(todo)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="no-todo">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
