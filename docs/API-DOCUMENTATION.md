# API Documentation — Employee Management System

Base URL: `http://localhost:8080`

---

## Departments

### 1. Get all departments

`GET /api/departments`

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "name": "Information Technology",
    "description": "Software development and infrastructure",
    "createdAt": "2026-08-06T10:00:00",
    "employeeCount": 3
  }
]
```

### 2. Get department by ID

`GET /api/departments/{id}`

**Response `200 OK`**
```json
{
  "id": 1,
  "name": "Information Technology",
  "description": "Software development and infrastructure",
  "createdAt": "2026-08-06T10:00:00",
  "employeeCount": 3
}
```

**Response `404 Not Found`**
```json
{
  "timestamp": "2026-08-06T10:05:00",
  "status": 404,
  "error": "Not Found",
  "message": "Department not found with id: 99",
  "path": "/api/departments/99",
  "fieldErrors": null
}
```

### 3. Create department

`POST /api/departments`

**Request**
```json
{
  "name": "Operations",
  "description": "Day-to-day operations and logistics"
}
```

**Response `201 Created`**
```json
{
  "id": 5,
  "name": "Operations",
  "description": "Day-to-day operations and logistics",
  "createdAt": "2026-08-06T10:10:00",
  "employeeCount": 0
}
```

### 4. Update department

`PUT /api/departments/{id}`

**Request**
```json
{
  "name": "Operations",
  "description": "Updated description"
}
```

**Response `200 OK`** — updated department object

### 5. Delete department

`DELETE /api/departments/{id}`

**Response `204 No Content`**

**Response `400 Bad Request`** (if employees still assigned)
```json
{
  "timestamp": "2026-08-06T10:15:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Cannot delete department with assigned employees. Reassign employees first.",
  "path": "/api/departments/1",
  "fieldErrors": null
}
```

---

## Employees

### 1. List employees (pagination + search)

`GET /api/employees?keyword=priya&page=0&size=5`

| Param | Default | Description |
|-------|---------|-------------|
| `keyword` | empty | Search first name, last name, or email |
| `page` | `0` | Zero-based page index |
| `size` | `5` | Page size |

**Response `200 OK`**
```json
{
  "content": [
    {
      "id": 2,
      "firstName": "Priya",
      "lastName": "Patel",
      "email": "priya.patel@company.com",
      "phone": "9876543211",
      "salary": 68000.00,
      "hireDate": "2021-07-01",
      "departmentId": 1,
      "departmentName": "Information Technology",
      "createdAt": "2026-08-06T10:00:00",
      "updatedAt": "2026-08-06T10:00:00"
    }
  ],
  "page": 0,
  "size": 5,
  "totalElements": 1,
  "totalPages": 1,
  "last": true
}
```

### 2. Get employee by ID

`GET /api/employees/{id}`

**Response `200 OK`** — single employee object

### 3. Create employee

`POST /api/employees`

**Request**
```json
{
  "firstName": "Karan",
  "lastName": "Gupta",
  "email": "karan.gupta@company.com",
  "phone": "9876543299",
  "salary": 65000,
  "hireDate": "2024-02-01",
  "departmentId": 1
}
```

**Response `201 Created`** — created employee object

**Response `400 Bad Request`** (validation)
```json
{
  "timestamp": "2026-08-06T10:20:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/employees",
  "fieldErrors": {
    "email": "Email must be valid",
    "salary": "Salary must be greater than 0"
  }
}
```

**Response `409 Conflict`** (duplicate email)
```json
{
  "timestamp": "2026-08-06T10:21:00",
  "status": 409,
  "error": "Conflict",
  "message": "Employee already exists with email: karan.gupta@company.com",
  "path": "/api/employees",
  "fieldErrors": null
}
```

### 4. Update employee

`PUT /api/employees/{id}`

**Request** — same shape as create

**Response `200 OK`** — updated employee object

### 5. Delete employee

`DELETE /api/employees/{id}`

**Response `204 No Content`**

---

## Sample cURL commands

```bash
# List employees
curl "http://localhost:8080/api/employees?page=0&size=5"

# Search employees
curl "http://localhost:8080/api/employees?keyword=sharma"

# Create employee
curl -X POST http://localhost:8080/api/employees ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Karan\",\"lastName\":\"Gupta\",\"email\":\"karan.gupta@company.com\",\"phone\":\"9876543299\",\"salary\":65000,\"hireDate\":\"2024-02-01\",\"departmentId\":1}"

# Delete employee
curl -X DELETE http://localhost:8080/api/employees/1
```

## H2 Console

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:emsdb`
- User: `sa`
- Password: *(blank)*
