# Book Store API

ASP.NET Core Web API for managing books with full CRUD functionality.

The project is built using layered architecture principles with separation of concerns between API, Application, Domain and Infrastructure layers.

---

# Preview

## Swagger UI

> <img width="1840" height="375" alt="image" src="https://github.com/user-attachments/assets/ee3bfe2f-64bb-47ce-9797-333b73a89332" />

## Post example
> <img width="1799" height="744" alt="image" src="https://github.com/user-attachments/assets/161948c0-ff53-4455-83da-79dbf2299656" />

---

## Database (PostgreSQL / pgAdmin)

> <img width="1706" height="204" alt="image" src="https://github.com/user-attachments/assets/743c18f9-886d-4f9e-b016-afbb090678c6" />



---

# Features

- Get all books async
- Create new books async
- Update existing books async
- Delete books async
- DTO mapping
- Validation in Domain layer
- Entity Framework Core integration
- PostgreSQL database
- Swagger/OpenAPI support
- Dependency Injection
- Layered Architecture

---

# Architecture

The project uses layered architecture:

```text
BookStore.API
    Controllers

BookStore.Application
    Services
    DTOs

BookStore.Domain
    Entities
    Interfaces

BookStore.Infrastructure
    Entity Framework Core
    PostgreSQL
    Repositories
