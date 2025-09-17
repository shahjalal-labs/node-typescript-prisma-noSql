GET http://localhost:5002/api/v1/products

GET http://localhost:5002/api/v1/products/usersproduct/68ca50ed1768bf9be41c45db
GET http://localhost:5002/api/v1/products/usersproduct/68ca50e21768bf9be41c45da

POST http://localhost:5002/api/v1/products
Content-Type: application/json

{
  "name": "Electric bulb",
  "price": 100,
  "description": "This is a product",
  "sellerId": "68ca50ed1768bf9be41c45db"
}

