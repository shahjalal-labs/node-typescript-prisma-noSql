POST {{baseUrl}}/auth/login
Content-Type:application/json

{
 "email": "hasan.doe@example.com",
 "password": "Aa@123456",
 "fcmToken": null
}


POST {{baseUrl}}/auth/login
Content-Type:application/json

{
 "email": "shahjalal.backend@gmail.com",
 "password": "Aa@123456",
 "fcmToken": "token"
}


GET {{baseUrl}}/auth/profile

