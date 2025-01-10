function TodoItem({ todo, toggleComplete, deleteTodo }) {
    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <span style={{ color: todo.isUrgent ? 'red' : 'black' }}>
          {todo.title}
        </span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    );
  }
  
  export default TodoItem;
  