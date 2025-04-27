## What this project is about?

1. Learning Role-based Access Control (RBAC)
2. Implementing a strong authorization mechanism
3. Preventing unauthorized access

## What did I do in this project?

1. Created a simple REST API with Node.js and Express and simulated authentication flow. I didn't want to dive into the details of authentication, so I used a simple approach.

- Simulated getting a JWT token through request cookies and extracting the user's role from the token.

2. Implemented a simple role-based access control system.

- I decided to create multiple resources and store them in a MongoDB collection called `resources`.
- Each document in the collection contains a `name` field and a Map called `rolePermissionsMap` that has roles as keys and an array of permissions as values.
- Permissions is simply an array of strings that represents what all HTTP methods are allowed for a particular resource for that role.
- Here is a sample schema -

```
name: "orders",
rolePermissionsMap: {
    "admin": ["*"],
    "subAdmin": ["GET", "PUT", "PATCH"],
    "guest": [],
    "member": ["GET", "POST", "PUT", "PATCH"]
}
```

- The `*` permission means that the role has all permissions for the resource.
- Whenever a user makes a request, I check if the user's role has the permission to access the resource. If not, I return a 403 Forbidden response.

3. Added a simple middleware that checks if the user is authenticated and has the required role to access the resource.

## Local Project Setup

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory. The environment variables are not shared publicly for security reasons.
4. Run the project using `npm start`
