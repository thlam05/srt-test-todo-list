# Todo List Application - AI Implementation Plan

## Tech Stack
- **Backend:** Java + Spring Boot (REST API)
- **Frontend:** Vite + React (TypeScript)
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS
- **Backend Testing:** JUnit 5 + Mockito
- **Frontend Testing:** Vitest + React Testing Library
- **E2E Testing:** Selenium

## Project Structure

```
todo-lists/
├── backend/                 # Spring Boot backend
│   ├── pom.xml             # Maven config
│   ├── src/main/java/com/todo/
│   │   ├── TodoApplication.java
│   │   ├── controller/
│   │   │   └── TodoController.java
│   │   ├── service/
│   │   │   └── TodoService.java
│   │   ├── repository/
│   │   │   └── TodoRepository.java
│   │   ├── model/
│   │   │   └── Todo.java
│   │   ├── dto/
│   │   │   ├── TodoRequest.java
│   │   │   └── TodoResponse.java
│   │   └── exception/
│   │       └── GlobalExceptionHandler.java
│   └── src/main/resources/
│       └── application.yml
├── frontend/                # React frontend (Vite)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoFilter.tsx
│   │   ├── types/
│   │   │   └── todo.ts
│   │   └── api/
│   │       └── todoApi.ts
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── docs/
│   ├── Requirement.md
│   └── ai.md
└── README.md
```

## Backend API (Spring Boot)

### REST Endpoints

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | /api/todos              | Lấy danh sách todo         |
| POST   | /api/todos              | Thêm todo mới              |
| PUT    | /api/todos/{id}         | Cập nhật todo              |
| DELETE | /api/todos/{id}         | Xóa todo                   |
| PATCH  | /api/todos/{id}/toggle  | Toggle hoàn thành          |
| GET    | /api/todos/search       | Tìm kiếm + lọc theo status |

### Todo Entity (JPA)

```java
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title max 200 characters")
    @Column(nullable = false)
    private String title;

    @Size(max = 1000, message = "Description max 1000 characters")
    private String description;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

### Validation Rules
- `title`: @NotBlank, @Size(max=200) -> trả về 400 nếu vi phạm
- `description`: @Size(max=1000) -> trả về 400 nếu vi phạm
- Xử lý global exception bằng @ControllerAdvice

## Frontend (React + Vite)

### Components
- `App.tsx` - Layout chính
- `TodoForm.tsx` - Form thêm/sửa todo (validate empty title)
- `TodoList.tsx` - Danh sách todo (có thể kéo thả sắp xếp nếu có time)
- `TodoItem.tsx` - Item hiển thị title + checkbox complete + edit/delete buttons
- `TodoFilter.tsx` - Filter: All / Active / Completed + search input

### UI/UX
- Responsive (mobile-first)
- Loading state khi fetch API
- Empty state khi không có todo
- Error state + toast notification
- Confirmation dialog trước khi xóa

## Implementation Order

1. **Init project**: Spring Boot (Spring Initializr) + Vite React app + docker-compose.yml (PostgreSQL)
2. **Backend CRUD**: Entity, Repository, Service, Controller, DTO, Global exception handler
3. **Frontend CRUD**: API layer (axios/fetch), components, state management (useState/useReducer)
4. **Filter & Search**: JPA Specifications / @Query + frontend filter/search UI
5. **Error handling**: @ControllerAdvice backend + error toast/state frontend
6. **README**: Hướng dẫn cài đặt (Java 17+, Maven, Node) và chạy project

## Optional (nếu còn thời gian)
- Pagination (Spring Pageable + page/limit params)
- Docker (Dockerfile multi-stage cho backend + frontend)
- Unit test (JUnit 5 + Mockito cho backend, Vitest + React Testing Library cho frontend)
- E2E test (Selenium / Playwright)
- Deploy lên Render / Railway / Vercel
