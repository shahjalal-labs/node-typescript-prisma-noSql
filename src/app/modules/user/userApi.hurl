GET http://localhost:5002/api/v1/users/ruhulaminvai/amin
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzkzY2M3MzVkNDAzNzBlMDY0NGZkYiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1ODAyMDA3NywiZXhwIjoxNzU5MzE2MDc3fQ.lASuKtS7IcDZU4HJPlALjn4in4jGZc94S7N5gvbH_Is

GET http://localhost:5002/api/v1/users/ruhulaminvai/amin

# CREATE USER WITH OTP EMAIL VERIFICATION
POST http://localhost:5002/api/v1/users/create
Content-Type: application/json

{
  "email": "shahjalal.backend@gmail.com",
  "fullName": "Md. Shahjalal",
  "password": "Aa@123456"
}
# CREATE USER WITH OTP EMAIL VERIFICATION

#--//---- SIGNUP VERIFICATION
POST http://localhost:5002/api/v1/users/signup-verification
Content-Type: application/json

{
  "email": "shahjalal.backend@gmail.com",
  "otp": "6089"
}
#--//----- SIGNUP VERIFICATION


POST http://localhost:5002/api/v1/auth/google-login
Content-Type: application/json

{
  "email": "sadman.doe@example.com",
  "role":"Seller",
  "fullName": "Jane Doe",
  "fcmToken": "abc123xyz456"
}



#--------- CREATE USER WITHOUT OTP EMAIL VERIFICATION-----------
POST http://localhost:5002/api/v1/users/create-user
Content-Type: application/json

{
  "email": "hasan.doe@example.com",
  "password": "Aa@123456",
  "role":"Seller",
  "fullName": "Jane Doe"
}
#--------- CREATE USER WITHOUT OTP EMAIL VERIFICATION-----------00

GET http://localhost:5002/api/v1/users/ruhulaminvai/amin

