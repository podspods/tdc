#!/bin/bash

BASE_URL="http://localhost:3002/api/spare-parts"

echo "========================================"
echo "Test des endpoints spare-parts"
echo "========================================"

# 1. Créer une pièce (POST)
echo ""
echo "1. POST / → Création d'une pièce"
RESPONSE=$(curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "TEST-002",
    "name": "Plaquette de frein test2",
    "description": "Jeu de plaquettes avant",
    "purchasePrice": 250000,
    "sellingPrice": 450000,
    "markupMultiplier": 1.8,
    "stockQuantity": 20,
    "supplier": "TestSupplier",
    "createdBy": "bash-script"
  }')
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# Extraire l'ID créé (si succès)
PART_ID=$(echo "$RESPONSE" | jq -r '.data.id // empty' 2>/dev/null)
if [ -n "$PART_ID" ]; then
  echo "✅ Pièce créée avec ID = $PART_ID"
else
  echo "❌ Échec de la création"
  exit 1
fi

# 2. Récupérer toutes les pièces (GET)
echo ""
echo "2. GET / → Liste toutes les pièces"
curl -s "$BASE_URL" | jq . 2>/dev/null || curl -s "$BASE_URL"

# 3. Récupérer par code (GET /code/:code)
echo ""
echo "3. GET /code/TEST-001"
curl -s "$BASE_URL/code/TEST-001" | jq . 2>/dev/null || curl -s "$BASE_URL/code/TEST-001"

# 4. Récupérer par ID (GET /:id)
echo ""
echo "4. GET /$PART_ID"
curl -s "$BASE_URL/$PART_ID" | jq . 2>/dev/null || curl -s "$BASE_URL/$PART_ID"

# 5. Mettre à jour la pièce (PUT)
echo ""
echo "5. PUT /$PART_ID → Modification du prix et du stock"
curl -s -X PUT "$BASE_URL/$PART_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "sellingPrice": 490000,
    "stockQuantity": 18,
    "markupMultiplier": 1.9
  }' | jq . 2>/dev/null || curl -s -X PUT "$BASE_URL/$PART_ID" -H "Content-Type: application/json" -d '{"sellingPrice":490000,"stockQuantity":18}'

# 6. Vérifier la mise à jour
echo ""
echo "6. GET /$PART_ID (après mise à jour)"
curl -s "$BASE_URL/$PART_ID" | jq . 2>/dev/null || curl -s "$BASE_URL/$PART_ID"

# 7. Supprimer la pièce (DELETE)
echo ""
echo "7. DELETE /$PART_ID"
curl -s -X DELETE "$BASE_URL/$PART_ID" | jq . 2>/dev/null || curl -s -X DELETE "$BASE_URL/$PART_ID"

# 8. Vérifier la suppression (doit retourner 404)
echo ""
echo "8. GET /$PART_ID (après suppression) – doit être 404"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/$PART_ID" | jq . 2>/dev/null || curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/$PART_ID"

echo ""
echo "========================================"
echo "Tests terminés"
echo "========================================"