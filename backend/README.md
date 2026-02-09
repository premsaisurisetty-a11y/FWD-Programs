# Backend Setup

This project requires a Java Spring Boot backend.

## Prerequisites
1.  **Java 17+** (You have Java 25)
2.  **Maven**: You need to handle dependencies and building.

## How to Run

1.  **Install Maven**:
    *   Download from [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
    *   Add `bin` to your PATH.

2.  **Run with Maven**:
    Open a terminal in this `backend` directory and run:
    ```bash
    mvn spring-boot:run
    ```

## Configuration
Ensure your `application.properties` (in `src/main/resources`) has the correct `gemini.api.key`.
You can pass it as an environment variable:
```bash
set GEMINI_API_KEY=your_actual_key_here
mvn spring-boot:run
```
