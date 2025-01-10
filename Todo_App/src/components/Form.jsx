import { useState } from 'react';

function Form({ addTodo }) {
  const [title, setTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    addTodo({ title, isUrgent, completed: false });
    setTitle('');
    setIsUrgent(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type Your Todo  Item here ^_^"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
        />
        Urgent
      </label>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default Form;
