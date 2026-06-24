-- Insertion de données de test dans spare_parts

truncate table spare_part;
INSERT INTO spare_part (code, name, description, purchase_price, selling_price, markup_multiplier, stock_quantity, supplier, created_by) VALUES
-- Pièces moteur
('ENG-001', 'Kit chaîne de distribution', 'Kit complet chaîne + pignons', 850000, 1250000, 1.47, 5, 'Parts Co.', 'system'),
('ENG-002', 'Bougie d''allumage Iridium', 'Bougie haute performance, lot de 4', 320000, 550000, 1.72, 12, 'SparkMaster', 'system'),
('ENG-003', 'Filtre à huile', 'Filtre à huile standard', 85000, 150000, 1.76, 30, 'FilterPro', 'system'),

-- Freins
('BRK-001', 'Plaquettes de frein avant', 'Plaquettes semi-métalliques', 180000, 320000, 1.78, 15, 'BrakeWorld', 'system'),
('BRK-002', 'Disque de frein avant', 'Disque flottant 320mm', 650000, 980000, 1.51, 8, 'BrakeWorld', 'system'),
('BRK-003', 'Maître-cylindre arrière', 'Kit complet', 420000, 690000, 1.64, 4, 'MotoParts', 'system'),

-- Transmission
('TRN-001', 'Chaîne de transmission O-Ring', 'Chaîne étanche 520', 550000, 890000, 1.62, 10, 'ChainCo', 'system'),
('TRN-002', 'Pignon de sortie 16 dents', 'Acier trempé', 180000, 290000, 1.61, 12, 'SprocketPro', 'system'),
('TRN-003', 'Kit embrayage complet', 'Disques + ressorts', 980000, 1590000, 1.62, 3, 'ClutchMaster', 'system'),

-- Électricité
('ELE-001', 'Batterie lithium 12V 10Ah', 'Batterie LiFePO4', 1250000, 1890000, 1.51, 6, 'BatteryTech', 'system'),
('ELE-002', 'Alternateur', 'Alternateur 3 phases', 890000, 1350000, 1.52, 4, 'ElectroParts', 'system'),
('ELE-003', 'Faisceau optique LED', 'Ampoule H4 LED', 180000, 320000, 1.78, 20, 'LightPro', 'system'),

-- Suspension / Roues
('SUS-001', 'Kit fourche complet', 'Fourche complète 41mm', 2200000, 3290000, 1.50, 2, 'SuspensionTech', 'system'),
('SUS-002', 'Amortisseur arrière', 'Amortisseur réglable', 1350000, 1990000, 1.47, 3, 'SuspensionTech', 'system'),
('WHE-001', 'Pneu avant 120/70-17', 'Pneu sport', 980000, 1450000, 1.48, 7, 'TireShop', 'system'),

-- Consommables / Entretien
('CON-001', 'Huile moteur 10W40 (1L)', 'Huile synthétique', 85000, 135000, 1.59, 40, 'Lubricants Inc.', 'system'),
('CON-002', 'Liquide de refroidissement (1L)', 'Prêt à l''emploi', 65000, 99000, 1.52, 25, 'CoolantPro', 'system'),
('CON-003', 'Nettoyant chaîne aérosol (400ml)', 'Dégraissant puissant', 75000, 129000, 1.72, 18, 'CleanMaster', 'system');