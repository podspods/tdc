# Récupérer toutes les factures
curl "http://localhost:3002/api/invoice"

# Récupérer une facture avec ses lignes
curl "http://localhost:3002/api/invoice/1"

# Créer une facture
curl -X POST http://localhost:3002/api/invoice \
  -H "Content-Type: application/json" \
  -d '{"garageId":1,"vehicleId":1,"dueDate":"2025-06-30","statusCode":2,"createdBy":"admin"}'

# Ajouter une ligne
curl -X POST http://localhost:3002/api/invoice/1/lines \
  -H "Content-Type: application/json" \
  -d '{"invoiceId":1,"lineTypeCode":1,"description":"Test task","quantity":1,"unitPrice":100000}'

# Modifier une ligne
curl -X PUT http://localhost:3002/api/invoice/lines/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity":2}'

# Supprimer une ligne
curl -X DELETE http://localhost:3002/api/invoice/lines/1

# Supprimer une facture
curl -X DELETE http://localhost:3002/api/invoice/1


curl -X GET http://localhost:3002/api/invoice/4/lines