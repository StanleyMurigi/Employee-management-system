# Employee Management System

A professional, full-stack CRUD application built with **Spring Boot 3** and **Java 21**.
This project demonstrates clean architecture, robust validation, and a dynamic frontend for managing employee records.

---

## Tech Stack

**Backend:**

* Java 21
* Spring Boot 3
* Spring Data JPA
* Hibernate

**Database:**

* H2 In-Memory Database (zero installation required)

**Frontend:**

* HTML5
* CSS3
* JavaScript (ES6+)

**Validation:**

* Jakarta Bean Validation (Hibernate Validator)

---

## Project Structure

```
src/main/java/com/company/
├── controller/        # REST Endpoints
├── service/           # Service Interfaces (EmployeeService)
│   └── implement/     # Business Logic (EmployeeServiceImpl)
├── repository/        # Data Access Layer (JpaRepository)
├── model/             # JPA Entities with Validation (@NotBlank, @Email)
└── exception/         # Global Exception Handler (@ControllerAdvice)

src/main/resources/
├── static/            # Frontend Assets (index.html, style.css, script.js)
└── application.properties # Database & JPA Configuration
```

---

## Setup and Run Instructions

### 1. Prerequisites

* JDK 21 installed and configured in your IDE
* IntelliJ IDEA (or any Java-compatible IDE)
* A modern web browser (Chrome, Firefox, etc.)

---

### 2. Opening the Project

* Open IntelliJ IDEA
* Select **File > Open** and choose the project root directory
* Allow Gradle to sync and download dependencies

---

### 3. Running the Backend

* Navigate to:
  `src/main/java/com/company/Application.java`
* Right-click and select: **Run 'Application'**


---

### 4. Accessing the System

* **Management UI:**
  http://localhost:8080/index.html

* **H2 Database Console:**
  http://localhost:8080/h2-console

**Database Credentials:**

```
JDBC URL: jdbc:h2:mem:employeedb
Username: sa
Password: (Leave blank)
```

---

## API Endpoints

| Method | Endpoint            | Description        | Status Code                   |
| ------ | ------------------- | ------------------ | ----------------------------- |
| GET    | /api/employees      | List all employees | 200 OK                        |
| POST   | /api/employees      | Create new record  | 201 Created / 400 Bad Request |
| GET    | /api/employees/{id} | Find by ID         | 200 OK / 404 Not Found        |
| PUT    | /api/employees/{id} | Update record      | 200 OK / 404 Not Found        |
| DELETE | /api/employees/{id} | Remove record      | 204 No Content                |

---

## Key Features & Implementation

* **Service Layer Pattern**
  Full separation of concerns using interfaces and implementations

* **Custom Queries**
  Repository includes:

  ```
  findBySalaryGreaterThan
  ```

* **Global Exception Handling**
  Centralized handling for:

  * ResourceNotFoundException
  * Validation errors

* **CORS Configuration**
  Enabled using `@CrossOrigin`

* **Dynamic UI**
  JavaScript `fetch` handles all CRUD operations without page refresh

* **Data Integrity**

  * Valid email format
  * Non-empty names
  * Positive salary values

