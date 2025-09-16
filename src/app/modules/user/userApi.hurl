GET http://localhost:5002/api/v1/users
Authorization: Bearer =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzkzY2M3MzVkNDAzNzBlMDY0NGZkYiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1ODAyMDA3NywiZXhwIjoxNzU5MzE2MDc3fQ.lASuKtS7IcDZU4HJPlALjn4in4jGZc94S7N5gvbH_Is


POST http://localhost:5002/api/v1/auth/google-login
Content-Type: application/json

{
  "email": "jane.doe@example.com",
  "fullName": "Jane Doe",
  "fcmToken": "abc123xyz456"
}

