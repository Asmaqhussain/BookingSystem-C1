# 1️⃣ CREATE – RResource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Submit form
    F->>F: Client-side validation
    F->>B: POST /api/resources (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: create Resource(data)
        S->>DB: INSERT INTO resources
        DB-->>S: Result / Duplicate error

        alt Duplicate
            S-->>B: Duplicate detected
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            S-->>B: Created resource
            B-->>F: 201 Created
            F-->>U: Show success message
        end
    end
```

# 2️⃣ READ — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    actor User
    participant Frontend as resources.js
    participant Backend as Express (GET /api/resources)
    participant DB as PostgreSQL

    User->>Frontend: Open resources page
    Frontend->>Backend: GET /api/resources
    Backend->>DB: SELECT * FROM resources ORDER BY created_at DESC
    DB-->>Backend: Return resource rows
    Backend-->>Frontend: 200 OK + JSON { ok: true, data: [...] }
    Frontend-->>User: Display resources list

    alt Error (DB failure)
        DB-->>Backend: Error
        Backend-->>Frontend: 500 Internal Server Error
        Frontend-->>User: Show error message
    end
```

# 3️⃣ UPDATE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant DB as PostgreSQL

    U->>F: Select resource and submit Update
    F->>F: Client-side validation / collect form data
    F->>B: PUT /api/resources/:id (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>DB: UPDATE resources ... WHERE id = :id RETURNING *
        DB-->>B: Updated row / not found / duplicate error

        alt Resource not found
            B-->>F: 404 Not Found
            F-->>U: Show not found message
        else Duplicate
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            B-->>F: 200 OK + updated resource
            F-->>U: Show success message
        end
    end
```

# 4️⃣ DELETE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Select resource and click Delete
    F->>B: DELETE /api/resources/:id

    B->>DB: DELETE FROM resources WHERE id = :id
    DB-->>B: rowCount / not found

    alt Resource not found
        B-->>F: 404 Not Found
        F-->>U: Show not found message
    else Success
        B-->>F: 204 No Content
        F-->>U: Remove resource from UI / refresh list
    end
```