# Employee Management System

A resume-ready full-stack CRUD application built with **Spring Boot**, **Angular**, **Hibernate (JPA)**, **H2**, and **Maven**.

## Project Overview

This project manages **Employees** and **Departments** with complete CRUD operations, form validation, global exception handling, pagination, and search. It follows a clean layered backend architecture and a responsive Angular frontend that consumes REST APIs.

**No authentication/authorization** is included intentionally to keep the project interview-friendly and easy to explain.

## Features

- Create, Read, Update, Delete for Employees and Departments
- Bean Validation on the backend + Reactive Forms on the frontend
- Global exception handling with consistent error JSON
- Employee list pagination (`page`, `size`)
- Search employees by first name, last name, or email
- One-to-Many relationship (Department → Employees)
- CORS enabled for Angular (`localhost:4200`)
- H2 in-memory database with seed data and H2 console
- Responsive UI for desktop and mobile

## Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17+, Spring Boot 3.3, Spring Web, Spring Data JPA |
| ORM | Hibernate (via Spring Data JPA) |
| Database | H2 (in-memory) |
| Build | Maven |
| Frontend | Angular 19, TypeScript, Reactive Forms |
| API style | REST + JSON |

## Project Structure

```text
Java-Project/
├── backend/                 # Spring Boot API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/ems/
│       │   ├── controller/
│       │   ├── service/
│       │   ├── repository/
│       │   ├── entity/
│       │   ├── dto/
│       │   ├── exception/
│       │   └── config/
│       └── resources/
│           ├── application.properties
│           └── data.sql
├── frontend/                # Angular UI
│   └── src/app/
│       ├── components/
│       ├── models/
│       └── services/
├── docs/
│   ├── ER-DIAGRAM.md
│   ├── API-DOCUMENTATION.md
│   └── INTERVIEW-QA.md
└── README.md
```

## Setup and Run Instructions

### Prerequisites

- JDK 17+ (project compiles with `--release 17`)
- Maven 3.6.3+ recommended (3.6.1 works with pinned compiler plugin)
- Node.js 18+ and npm

### 1) Start Backend

```bash
cd backend
mvn spring-boot:run
```

API: `http://localhost:8080`  
H2 Console: `http://localhost:8080/h2-console`  
- JDBC URL: `jdbc:h2:mem:emsdb`
- Username: `sa`
- Password: *(leave blank)*

### 2) Start Frontend

```bash
cd frontend
npm install
npm start
```

UI: `http://localhost:4200`

### Quick API smoke test

```bash
curl http://localhost:8080/api/employees?page=0&size=5
curl http://localhost:8080/api/departments
```

## Database ER Diagram

![Employee Management System ER Diagram](docs/images/er-diagram.png)

## Documentation

- [Database ER Diagram & Schema](docs/ER-DIAGRAM.md)
- [API Documentation](docs/API-DOCUMENTATION.md)
- [Interview Q&A](docs/INTERVIEW-QA.md)

## Resume Project Description

**Employee Management System (Spring Boot + Angular)** — Developed a full-stack CRUD web application to manage employees and departments using Spring Boot, Spring Data JPA/Hibernate, H2, and Angular. Implemented layered REST APIs with DTO validation, global exception handling, pagination, and search, and built a responsive Angular UI with Reactive Forms consuming the backend APIs.

## Git Commands (initialize, commit, push)

```bash
cd C:\Docu\Documents-P\Ha\Java-Project

git init
git add .
git commit -m "Initial commit: Employee Management System (Spring Boot + Angular CRUD)"

# Create a new empty repo on GitHub, then:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

> Replace `<your-username>` and `<your-repo-name>` with your GitHub details.

## Interview Tip

Be ready to explain:
1. Layered architecture and request flow
2. JPA relationship mapping
3. Why DTOs + validation + `@ControllerAdvice` matter
4. How pagination/search are implemented
5. How Angular `HttpClient` talks to Spring Boot
