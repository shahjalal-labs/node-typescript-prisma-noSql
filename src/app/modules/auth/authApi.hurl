#------//----------// LOGIN EXISTING USER ------//----------//

POST {{baseUrl}}/auth/login
Content-Type:application/json

{
 "email": "hasan.doe@example.com",
 "password": "Aa@123456",
 "fcmToken": null
}

#------//----------// LOGIN EXISTING USER ------//----------//

#------//----------// LOGIN EXISTING USER ------//----------//
POST {{baseUrl}}/auth/login
Content-Type:application/json

{
 "email": "shahjalal.backend@gmail.com",
 "password": "Aa@123456",
 "fcmToken": "token"
}

#------//----------// LOGIN EXISTING USER ------//----------//


#
#
#
#------//----------//  Get  logged in user profile------//----------//
GET {{baseUrl}}/auth/profile
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2U0Y2QwOGYyOWQ5YTUxNGVkZjc5YyIsImVtYWlsIjoic2hhaGphbGFsLmJhY2tlbmRAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3NTgzNjE0NjksImV4cCI6MTc1OTY1NzQ2OX0.lJ8gdEMuMqb1JHoRxme-6jNiuZ9-3tlDqqLILZgZJxM

#------//----------//  Get  logged in user profile------//----------//
#
#
#


# ============================================================
# =====================   LOGIN USER 1   =====================
# ============================================================

POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "hasan.doe@example.com",
  "password": "Aa@123456",
  "fcmToken": null
}


# ============================================================
# =====================   LOGIN USER 2   =====================
# ============================================================

POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "shahjalal.backend@gmail.com",
  "password": "Aa@123456",
  "fcmToken": "token"
}


# ============================================================
# ===============   GET LOGGED IN USER PROFILE   =============
# ============================================================

GET {{baseUrl}}/auth/profile
Authorization: <JWT_TOKEN>


# ============================================================
# ===============   SEnd FORGOT PASSWORD OTP      =============
# ============================================================

POST {{baseUrl}}/auth/send-otp

Content-Type: application/json
{
  "email": "shahjalal.backend@gmail.com"
}


# ============================================================
# ===============   verifyForgotPasswordOtpCode  =============
# ============================================================

POST {{baseUrl}}/auth/verify-otp

Content-Type: application/json
{
  "email": "shahjalal.backend@gmail.com",
  "otp": "4111"
}
