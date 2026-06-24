#!/bin/bash
BASE_URL="http://localhost:3002/api/task"

echo "1. POST create task"
curl -s -X POST $BASE_URL -H "Content-Type: application/json" -d '{
  "code": "TEST-01",
  "title": "Test Task",
  "description": "Task de test",
  "durationHours": 2,
  "skillLevel": 0,
  "brandId": 0,
  "createdBy": "script"
}' | jq .

echo -e "\n2. GET all tasks"
curl -s "$BASE_URL" | jq .

echo -e "\n3. GET by code"
curl -s "$BASE_URL/code/TEST-01" | jq .

echo -e "\n4. PUT update"
curl -s -X PUT "$BASE_URL/1" -H "Content-Type: application/json" -d '{"title": "Updated Task"}' | jq .

echo -e "\n5. DELETE task"
curl -s -X DELETE "$BASE_URL/1" | jq .