GET {{baseUrl}}/products

GET {{baseUrl}}/products/usersproduct/68ca50ed1768bf9be41c45db
GET {{baseUrl}}/products/usersproduct/68ca50e21768bf9be41c45da

POST {{baseUrl}}/products
Content-Type: application/json

{
  "name": "Hitter",
  "price": 1000,
  "description": "This is a product",
  "sellerId": "68ca50ed1768bf9be41c45db"
}


POST {{baseUrl}}/products
Content-Type: application/json

{
  "name": "Rice Cooker",
  "price": 3000,
  "description": "This is a product",
  "sellerId": "68ca50ed1768bf9be41c45db"
}


POST {{baseUrl}}/products
Content-Type: application/json

{
  "name": "Iron Machine",
  "price": 500,
  "description": "This is Iron Machine",
  "sellerId": "68ca50ed1768bf9be41c45db"
}

