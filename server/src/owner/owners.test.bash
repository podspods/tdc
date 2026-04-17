# =====================================================
# 1. GET /api/owners - Récupérer tous les propriétaires
# =====================================================
curl -X GET http://localhost:3002/api/owners

# Avec pagination
curl -X GET "http://localhost:3002/api/owners?page=1&limit=10"

# Avec recherche
curl -X GET "http://localhost:3002/api/owners?search=nguyen"

# Avec filtres
curl -X GET "http://localhost:3002/api/owners?category=1&city=HCMC"

# =====================================================
# 2. GET /api/owners/stats - Statistiques
# =====================================================
curl -X GET http://localhost:3002/api/owners/stats

# =====================================================
# 3. GET /api/owners/:id - Propriétaire par ID
# =====================================================
curl -X GET http://localhost:3002/api/owners/1

# =====================================================
# 4. GET /api/owners/phone/:phone - Par téléphone
# =====================================================
curl -X GET http://localhost:3002/api/owners/phone/0901234567

# =====================================================
# 5. GET /api/owners/:id/details - Détails complets
# =====================================================
curl -X GET http://localhost:3002/api/owners/1/details

# =====================================================
# 6. POST /api/owners - Créer un propriétaire
# =====================================================
curl -X POST http://localhost:3002/api/owners \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test-Jean",
    "lastName": "Test-Dupont",
    "phoneNumber": "0987654321",
    "email": "Test-jean.dupont@email.com",
    "address": "123 Rue de Paris",
    "city": "HCMC",
    "category": 1,
    "notes": "Client VIP",
    "createdBy": "admin"
  }'

# =====================================================
# 7. PUT /api/owners/:id - Mettre à jour
# =====================================================
curl -X PUT http://localhost:3002/api/owners/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jean-Michel",
    "lastName": "Dupont",
    "city": "Danang"
  }'

# =====================================================
# 8. DELETE /api/owners/:id - Supprimer
# =====================================================
curl -X DELETE http://localhost:3002/api/owners/5