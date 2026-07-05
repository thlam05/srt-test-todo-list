import React, { useState, FormEvent } from 'react';
import { Todo, TodoRequest } from '../types/todo';

interface TodoFormProps {
  editingTodo?: Todo | null;
  onSubmit: (data: TodoRequest) => void;
  onCancel?: () => void;
}

export default function TodoForm({ editingTodo, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({ title: title.trim(), description: description.trim() || undefined });
    if (!editingTodo) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
        />
        {error && <span style={styles.error}>{error}</span>}
      </div>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <div style={styles.actions}>
        <button type="submit" style={styles.button}>
          {editingTodo ? 'Update' : 'Add'}
        </button>
        {editingTodo && onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { marginBottom: 24 },
  inputGroup: { marginBottom: 8 },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: 16,
    border: '1px solid #ddd',
    borderRadius: 4,
    boxSizing: 'border-box',
    marginBottom: 8,
  },
  inputError: { borderColor: '#e74c3c' },
  error: { color: '#e74c3c', fontSize: 13 },
  actions: { display: 'flex', gap: 8 },
  button: {
    padding: '10px 20px',
    fontSize: 14,
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: 14,
    background: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};
