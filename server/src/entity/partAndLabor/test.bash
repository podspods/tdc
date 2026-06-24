# GET all (with pagination - default limit 20)
curl -X GET http://localhost:3002/api/part-and-labor

# GET all with limit=0 (no pagination)
curl -X GET "http://localhost:3002/api/part-and-labor?limit=0"

# GET with filters
curl -X GET "http://localhost:3002/api/part-and-labor?typeLineCode=TA&limit=0"
curl -X GET "http://localhost:3002/api/part-and-labor?categoryCode=MA&limit=0"
curl -X GET "http://localhost:3002/api/part-and-labor?brandCode=DU&limit=0"
curl -X GET "http://localhost:3002/api/part-and-labor?search=oil&limit=0"

# GET by ID
curl -X GET http://localhost:3002/api/part-and-labor/31

# POST (create)
curl -X POST http://localhost:3002/api/part-and-labor \
  -H "Content-Type: application/json" \
  -d '{
    "typeLineCode": "TA",
    "categoryCode": "MA",
    "subCategoryCode": "EN",
    "brandCode": "SU",
    "duration": 60,
    "skillLevel": 2,
    "cost": 100,
    "margin": 30,
    "code": "TA-MA-EN-SU-7",
    "name": "Oil Change - Suzuki",
    "description": "Standard oil change service",
    "createdBy": "admin"
  }'

# PUT (update)
curl -X PUT http://localhost:3002/api/part-and-labor/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Oil Change - Ducati",
    "cost": 120
  }'

# DELETE
curl -X DELETE http://localhost:3002/api/part-and-labor/7


curl -X PUT http://localhost:3002/api/part-and-labor/31 \
  -H "Content-Type: application/json" \
  -d '{
    lastTimeUsed	"2026-06-18T11:38:23.499Z",
  }'