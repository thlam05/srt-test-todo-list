import { Todo, TodoRequest, SearchParams } from '../types/todo';

const BASE_URL = '/api/todos';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }
  return response.json();
}

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await fetch(BASE_URL);
    return handleResponse<Todo[]>(response);
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<Todo>(response);
  },

  create: async (data: TodoRequest): Promise<Todo> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  update: async (id: string, data: TodoRequest): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  toggle: async (id: string): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
    });
    return handleResponse<Todo>(response);
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Delete failed' }));
      throw new Error(error.error || 'Delete failed');
    }
  },

  search: async (params: SearchParams): Promise<Todo[]> => {
    const query = new URLSearchParams();
    if (params.keyword) query.set('keyword', params.keyword);
    if (params.completed !== undefined) query.set('completed', String(params.completed));
    const response = await fetch(`${BASE_URL}/search?${query.toString()}`);
    return handleResponse<Todo[]>(response);
  },
};
