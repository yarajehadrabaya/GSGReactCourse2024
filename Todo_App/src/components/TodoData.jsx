function TodoData({ todos }) {
    const createdTasks = todos.length;
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const urgentTasks = todos.filter((todo) => todo.isUrgent).length;
  
    return (
      <div>
        <p>{createdTasks} Created tasks</p>
        <p>{completedTasks} Completed tasks</p>
        <p>{urgentTasks} Urgent tasks</p>
      </div>
    );
  }
  
  export default TodoData;
  