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
│   │   ├── routes/
│   │   │   └── motorcycleBrand.routes.ts
│   │   ├── controllers/
│   │   │   └── motorcycleBrand.controller.ts
│   │   ├── services/
│   │   │   └── motorcycleBrand.service.ts
│   │   ├── repositories/
│   │   │   └── motorcycleBrand.repository.ts
│   │   ├── models/
│   │   │   └── motorcycleBrand.model.ts
│   │   └── types/
│   │       └── motorcycleBrand.types.ts
│   └── server.ts
├── client/
│   ├── src/
│   │   ├── common/
│   │   │   └── motorcycleBrand.service.ts
│   │   ├── types/
│   │   │   └── motorcycleBrand.types.ts
│   │   ├── styles/
│   │   │   └── motorcycleBrand.style.ts
│   │   ├── services/
│   │   │   └── motorcycleBrand.service.ts
│   │   ├── components/
│   │   │   ├── Layout
│   │   │   ├── Navigation
│   │   │   ├── UI
│   │   │   └── MotorcycleBrandList.tsx
│   │   └── pages/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       ├── Test.tsx
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
