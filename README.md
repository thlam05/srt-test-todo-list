# Todo List Application

Ứng dụng quản lý công việc (Todo List) với Spring Boot backend và React frontend.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, PostgreSQL
- **Frontend:** React 18, TypeScript, Vite
- **Database:** PostgreSQL 16
- **Build:** Maven

## Yêu cầu

- Java 17+
- Node.js 18+
- Maven
- Docker (cho PostgreSQL)

## Cách chạy

### 1. Khởi động PostgreSQL

```bash
docker compose up -d
```

### 2. Chạy Backend

```bash
cd backend
mvn spring-boot:run
```

Backend chạy tại `http://localhost:8080`.

### 3. Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại `http://localhost:5173`.

## API Endpoints

| Method | Endpoint                | Description          |
|--------|-------------------------|----------------------|
| GET    | /api/todos              | Danh sách todo       |
| POST   | /api/todos              | Thêm todo mới        |
| PUT    | /api/todos/{id}         | Cập nhật todo        |
| DELETE | /api/todos/{id}         | Xóa todo             |
| PATCH  | /api/todos/{id}/toggle  | Toggle hoàn thành    |
| GET    | /api/todos/search       | Tìm kiếm + lọc       |

### Search params

- `keyword` — tìm kiếm theo title
- `completed` — lọc theo trạng thái (`true`/`false`)

## Cấu trúc thư mục

```
todo-lists/
├── backend/                 # Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/com/todo/
│       ├── controller/      # REST controllers
│       ├── service/         # Business logic
│       ├── repository/      # JPA repositories
│       ├── model/           # Entities
│       ├── dto/             # Request/Response DTOs
│       └── exception/       # Global exception handler
├── frontend/                # React frontend
│   └── src/
│       ├── components/      # React components
│       ├── api/             # API client
│       └── types/           # TypeScript types
└── docker-compose.yml       # PostgreSQL container
```
