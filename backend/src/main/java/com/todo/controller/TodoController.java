package com.todo.controller;

import com.todo.dto.TodoRequest;
import com.todo.dto.TodoResponse;
import com.todo.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAll() {
        return ResponseEntity.ok(todoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(todoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TodoResponse> create(@Valid @RequestBody TodoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> update(@PathVariable UUID id, @Valid @RequestBody TodoRequest request) {
        return ResponseEntity.ok(todoService.update(id, request));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoResponse> toggle(@PathVariable UUID id) {
        return ResponseEntity.ok(todoService.toggle(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<TodoResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean completed) {
        return ResponseEntity.ok(todoService.search(keyword, completed));
    }
}
