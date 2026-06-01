curl -X GET http://localhost:3002/api/correspondance

curl -X GET http://localhost:3002/api/correspondance/subject/500

curl -X POST http://localhost:3002/api/correspondance \
  -H "Content-Type: application/json" \
  -d '{
    "subjectCode": 0,
    "code": 0,
    "value": "test_value",
    "description": "Description de test",
    "sortOrder": 1,
    "createdBy": "tester"
  }'

  curl -X PUT http://localhost:3002/api/correspondance/1 \
  -H "Content-Type: application/json" \
  -d '{
    "value": "draft_updated",
    "description": "Brouillon modifié"
  }'


  curl -X DELETE http://localhost:3002/api/correspondance/99