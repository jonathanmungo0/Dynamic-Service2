# Frontend ↔ Backend connection

The supplied React frontend already uses:

`VITE_API_URL || http://localhost:5000/api`

Therefore the backend in this package is directly compatible.

For an explicit configuration, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart Vite after changing `.env.local`.

Test the backend in the browser:
- http://localhost:5000/
- http://localhost:5000/api/health
- http://localhost:5000/api/config
- http://localhost:5000/api/products
