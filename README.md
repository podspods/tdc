# TDC developpment

Je veux développer un projet avec react.
mobile first avec burger menu

dev avec ubuntu, vscode, typscript
tout le code et les commentaires du code seront en anglais mais les explication sont en francais
pas d'utilisation d'ORM

```
npm create vite@latest ./
```

# tdc

see doc requierement /tdc/doc/01_Opportunity Study.md

- basics :
  - mecano : 1 utilisateur exécutant des réparations
  - part management : 2 utilisateur gestion des pièces
  - billing : 3 utilisateur : facturation client
  - task cost : gestion du cout des tâches
  - quotes : devis client.
  - CRM

- admin
  - payroll 4 user : emission des salaires
  - trial : balance comptable

# developpement

## mobile first

- burgerMenu

## design

MVC.

```
postgres-demo/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── rateConfig.json
│   │   │   └── rateMultipliers.json
│   │   ├── routes/
│   │   │   ├── motorcycleBrand.routes.ts
│   │   │   ├── registration.routes.ts
│   │   │   ├── hourlyRate.routes.ts
│   │   │   ├── invoice.routes.ts
│   │   │   ├── owner.routes.ts
│   │   │   ├── labor.routes.ts
│   │   │   ├── consumable.routes.ts
│   │   │   ├── sparePart.routes.ts
│   │   │   ├── rateConfig.routes.ts
│   │   │   └── motorcycleModel.routes.ts
│   │   ├── controllers/
│   │   │   ├── motorcycleBrand.controller.ts
│   │   │   ├── registration.controller.ts
│   │   │   ├── hourlyRate.controller.ts
│   │   │   ├── invoice.controller.ts
│   │   │   ├── owner.controller.ts
│   │   │   ├── labor.controller.ts
│   │   │   ├── consumable.controller.ts
│   │   │   ├── sparePart.controller.ts
│   │   │   ├── rateConfig.controller.ts
│   │   │   └── motorcycleModel.controller.ts
│   │   ├── services/
│   │   │   ├── motorcycleBrand.service.ts
│   │   │   ├── registration.service.ts
│   │   │   ├── hourlyRate.service.ts
│   │   │   ├── invoice.service.ts
│   │   │   ├── owner.service.ts
│   │   │   ├── labor.service.ts
│   │   │   ├── consumable.service.ts
│   │   │   ├── sparePart.service.ts
│   │   │   ├── rateConfig.service.ts
│   │   │   ├── motorcycleModel.service.ts
│   │   ├── repositories/
│   │   │   ├── motorcycleBrand.repository.ts
│   │   │   ├── registration.repository.ts
│   │   │   ├── hourlyRate.repository.ts
│   │   │   ├── invoice.repository.ts
│   │   │   ├── owner.repository.ts
│   │   │   ├── labor.repository.ts
│   │   │   ├── consumable.repository.ts
│   │   │   ├── sparePart.repository.ts
│   │   │   ├── motorcycleModel.repository.ts
│   │   ├── models/
│   │   │   ├── motorcycleBrand.model.ts
│   │   │   ├── registration.model.ts
│   │   │   ├── hourlyRate.model.ts
│   │   │   ├── invoice.model.ts
│   │   │   ├── owner.model.ts
│   │   │   ├── registration.model.ts
│   │   │   ├── labor.model.ts
│   │   │   ├── consumable.model.ts
│   │   │   ├── sparePart.model.ts
│   │   │   ├── motorcycleModel.model.ts
│   │   └── types/
│   │       ├── motorcycleBrand.types.ts
│   │       ├── registration.types.ts
│   │       ├── hourlyRate.types.ts
│   │       ├── invoice.types.ts
│   │       ├── owner.types.ts
│   │       ├── labor.types.ts
│   │       ├── consumable.types.ts
│   │       ├── sparePart.types.ts
│   │       ├── rateConfig.types.ts
│   │       ├── motorcycleModel.types.ts
│   └── server.ts
├── client/
│   ├── src/
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   ├── config.ts
│   │   │   └── locales/
│   │   │       ├── en/
│   │   │       │   ├── common.json
│   │   │       │   ├── navigation.json
│   │   │       │   ├── labor.json
│   │   │       │   ├── sparePart.json
│   │   │       │   ├── owner.json
│   │   │       │   └── invoice.json
│   │   │       ├── vi/
│   │   │       │   ├── common.json
│   │   │       │   ├── navigation.json
│   │   │       │   ├── labor.json
│   │   │       │   └── ...
│   │   │       └── fr/
│   │   │           ├── common.json
│   │   │           ├── navigation.json
│   │   │           └── ...
│   │   ├── common/
│   │   │   ├── motorcycleBrand.common.ts
│   │   │   ├── registration.common.ts
│   │   │   ├── hourlyRate.common.ts
│   │   │   ├── invoice.common.ts
│   │   │   ├── owner.common.ts
│   │   │   ├── labor.common.ts
│   │   │   ├── consumable.common.ts
│   │   │   ├── sparePart.common.ts
│   │   │   ├── motorcycleModel.common.ts
│   │   ├── types/
│   │   │   ├── motorcycleBrand.types.ts
│   │   │   ├── registration.types.ts
│   │   │   ├── hourlyRate.types.ts
│   │   │   ├── invoice.types.ts
│   │   │   ├── owner.types.ts
│   │   │   ├── labor.types.ts
│   │   │   ├── consumable.types.ts
│   │   │   ├── sparePart.types.ts
│   │   │   ├── motorcycleModel.types.ts
│   │   ├── styles/
│   │   │   ├── motorcycleBrand.style.ts
│   │   │   ├── registration.style.ts
│   │   │   ├── hourlyRate.style.ts
│   │   │   ├── invoice.style.ts
│   │   │   ├── owner.style.ts
│   │   │   ├── consumable.style.ts
│   │   │   ├── labor.style.ts
│   │   │   ├── sparePart.style.ts
│   │   │   ├── motorcycleModel.style.ts
│   │   ├── services/
│   │   │   ├── motorcycleBrand.service.ts
│   │   │   ├── registration.service.ts
│   │   │   ├── hourlyRate.service.ts
│   │   │   ├── invoice.service.ts
│   │   │   ├── owner.service.ts
│   │   │   ├── consumable.service.ts
│   │   │   ├── labor.service.ts
│   │   │   ├── sparePart.service.ts
│   │   │   ├── motorcycleModel.service.ts
│   │   ├── components/
│   │   │   ├── Layout
│   │   │   ├── Navigation
│   │   │   ├── UI
│   │   │   ├── LaborEdit.tsx
│   │   │   └── MotorcycleBrandList.tsx
│   │   └── pages/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       ├── Test.tsx
│   │       ├── motorcycleModel.page.tsx
│   │       ├── registration.page.tsx
│   │       ├── owner.page.tsx
│   │       ├── ownerAdm.page.tsx
│   │       ├── invoice.page.tsx
│   │       ├── invoiceAdm.page.tsx
│   │       ├── labor.page.tsx
│   │       ├── laborAdm.page.tsx
│   │       ├── consumable.page.tsx
│   │       ├── consumableAdm.page.tsx
│   │       ├── sparePart.page.tsx
│   │       ├── sparePartAdm.page.tsx
│   │       └── MotorcycleBrand.page.tsx
└── database.sql
```

### database

PostgreSQL

### schema

client
vehicule

# technique

## postgresql

- comment se connecter à la base
- créer l'utilisateur tdc2026 (utilisateur system)
- créer la basede donnée tdc2026
- créer la table region par une requette SQL
- faire une API REST pour CRUD de cette table.

# tdc

![diagrame entite](public/diagrame-entite.drawio.png)

# I18N

## structure des fichiers

```
client/
├── src/
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en/
│   │       │   ├── common.json
│   │       │   ├── navigation.json
│   │       │   ├── labor.json
│   │       │   ├── sparePart.json
│   │       │   ├── owner.json
│   │       │   └── invoice.json
│   │       ├── vi/
│   │       │   ├── common.json
│   │       │   ├── navigation.json
│   │       │   ├── labor.json
│   │       │   └── ...
│   │       └── fr/
│   │           ├── common.json
│   │           ├── navigation.json
│   │           └── ...
│   ├── components/
│   │   ├── LanguageSelector.tsx
│   │   └── ...
│   └── hooks/
│       └── useLanguage.ts
└── ...

```

# API REST

## 📋 API Endpoints Summary
Method URL Description
GET /api/rate-config Get full configuration
PUT /api/rate-config Update full configuration
GET /api/rate-config/base-rate Get base rate
PUT /api/rate-config/base-rate Update base rate
GET /api/rate-config/rate-types Get all rate types
GET /api/rate-config/rate-types/:code Get rate type by code
POST /api/rate-config/rate-types Create rate type
PUT /api/rate-config/rate-types/:code Update rate type
DELETE /api/rate-config/rate-types/:code Delete rate type
GET /api/rate-config/skill-levels Get all skill levels
POST /api/rate-config/skill-levels Create skill level
PUT /api/rate-config/skill-levels/:code Update skill level
DELETE /api/rate-config/skill-levels/:code Delete skill level
GET /api/rate-config/service-categories Get all service categories
POST /api/rate-config/service-categories Create service category
PUT /api/rate-config/service-categories/:code Update service category
DELETE /api/rate-config/service-categories/:code Delete service category
GET /api/rate-config/brand-multipliers Get brand multipliers
GET /api/rate-config/rounding-rules Get rounding rules
GET /api/rate-config/minimum-charge Get minimum charge rules
