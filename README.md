# Employee Management System

A premium, role-based Employee Management System built with Java Spring Boot, Hibernate, MySQL, and Vanilla CSS/JS.

## Features
- **CRUD Operations**: Add, Edit, Delete, and View employees.
- **Role-Based Access Control**:
  - **User**: View only.
  - **Admin**: Add, Edit, Delete privileges.
- **Premium UI**: Dark mode, glassmorphism design, responsive layout.

## Prerequisites
- Java 8 or higher
- Maven
- MySQL Database

## Setup Instructions

### 1. Database Setup
Ensure your MySQL server is running and create the database:
```sql
CREATE DATABASE employee_db;
```
*Note: The application uses `root` / `password` as default credentials. Update `src/main/resources/application.properties` if your MySQL configuration is different.*

### 2. Run the Application
Open a terminal in the project root and run:
```bash
mvn spring-boot:run
```
Or import the project into IntelliJ IDEA / Eclipse as a Maven project and run `EmployeeManagementApplication.java`.

### 3. Access the Application
Open your browser and navigate to:
[http://localhost:8080](http://localhost:8080)

## Login Credentials
- **Admin** (Full Access): `admin` / `admin`
- **User** (Read Only): `user` / `user`

## Technology Stack
- **Backend**: Spring Boot 2.7 (Spring Web, Spring Data JPA, Spring Security)
- **Database**: MySQL, Hibernate
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (Fetch API)
