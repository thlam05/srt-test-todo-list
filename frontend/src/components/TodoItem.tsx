import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div style={{ ...styles.item, ...(todo.completed ? styles.completed : {}) }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={styles.checkbox}
      />
      <div style={styles.content}>
        <span style={{ ...styles.title, ...(todo.completed ? styles.titleDone : {}) }}>
          {todo.title}
        </span>
        {todo.description && <span style={styles.description}>{todo.description}</span>}
      </div>
      <div style={styles.actions}>
        <button onClick={() => onEdit(todo)} style={styles.editButton}>Edit</button>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderBottom: '1px solid #eee',
    background: '#fff',
  },
  completed: { opacity: 0.7 },
  checkbox: { marginTop: 4, cursor: 'pointer' },
  content: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  title: { fontSize: 16 },
  titleDone: { textDecoration: 'line-through', color: '#999' },
  description: { fontSize: 13, color: '#666' },
  actions: { display: 'flex', gap: 6 },
  editButton: {
    padding: '4px 12px',
    fontSize: 13,
    background: '#f39c12',
    color: '#fff',
    border: 'none',
    borderRadius: 3,
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '4px 12px',
    fontSize: 13,
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: 3,
    cursor: 'pointer',
  },
};
