import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, loading, error, onToggle, onEdit, onDelete }: TodoListProps) {
  if (loading) {
    return <div style={styles.center}>Loading...</div>;
  }

  if (error) {
    return <div style={{ ...styles.center, color: '#e74c3c' }}>Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div style={styles.center}>No todos found. Add one above!</div>;
  }

  return (
    <div style={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  list: { border: '1px solid #eee', borderRadius: 4, background: '#fff' },
  center: { textAlign: 'center', padding: 40, color: '#888', fontSize: 15 },
};
