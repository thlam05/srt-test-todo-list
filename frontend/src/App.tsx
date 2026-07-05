import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoRequest } from './types/todo';
import { todoApi } from './api/todoApi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

type FilterValue = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterValue>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const completed = filter === 'all' ? undefined : filter === 'completed';
      const data = searchKeyword || completed !== undefined
        ? await todoApi.search({ keyword: searchKeyword || undefined, completed })
        : await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [filter, searchKeyword]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreate = async (data: TodoRequest) => {
    try {
      setError(null);
      await todoApi.create(data);
      setEditingTodo(null);
      fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    }
  };

  const handleUpdate = async (data: TodoRequest) => {
    if (!editingTodo) return;
    try {
      setError(null);
      await todoApi.update(editingTodo.id, data);
      setEditingTodo(null);
      fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      setError(null);
      await todoApi.toggle(id);
      fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await todoApi.delete(id);
      fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo List</h1>
      <TodoForm
        editingTodo={editingTodo}
        onSubmit={editingTodo ? handleUpdate : handleCreate}
        onCancel={() => setEditingTodo(null)}
      />
      <TodoFilter
        filter={filter}
        onFilterChange={handleFilterChange}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
      />
      <TodoList
        todos={todos}
        loading={loading}
        error={error}
        onToggle={handleToggle}
        onEdit={setEditingTodo}
        onDelete={handleDelete}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '40px 16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 300,
    color: '#333',
    marginBottom: 24,
  },
};
