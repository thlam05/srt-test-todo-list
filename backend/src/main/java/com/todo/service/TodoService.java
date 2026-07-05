package com.todo.service;

import com.todo.dto.TodoRequest;
import com.todo.dto.TodoResponse;
import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<TodoResponse> getAll() {
        return todoRepository.findAll().stream()
                .map(TodoResponse::fromEntity)
                .toList();
    }

    public TodoResponse getById(UUID id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        return TodoResponse.fromEntity(todo);
    }

    public TodoResponse create(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(request.getCompleted() != null ? request.getCompleted() : false)
                .build();
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public TodoResponse update(UUID id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todo.setTitle(request.getTitle());
        if (request.getDescription() != null) {
            todo.setDescription(request.getDescription());
        }
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public TodoResponse toggle(UUID id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todo.setCompleted(!todo.getCompleted());
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public void delete(UUID id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    public List<TodoResponse> search(String keyword, Boolean completed) {
        return todoRepository.search(keyword, completed).stream()
                .map(TodoResponse::fromEntity)
                .toList();
    }
}
