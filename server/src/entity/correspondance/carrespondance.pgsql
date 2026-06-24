CREATE TABLE IF NOT EXISTS correspondance (
    id SERIAL PRIMARY KEY,
    subject_code INTEGER NOT NULL,
    code INTEGER NOT NULL,
    valueStr VARCHAR(100) NULL,
    valueNum DECIMAL(10,2) NULL;
    description TEXT,
    sort_order INTEGER,
   created_by VARCHAR(100) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour accélérer les recherches par code et subject
CREATE INDEX idx_correspondance_subject_code ON correspondance(subject_code, code);

INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 1, 1, 'draft', 'Invoice is being edited', 1),
( 1, 2, 'pending', 'Waiting for payment', 2),
( 1, 3, 'overdue', 'Payment overdue', 3),
( 1, 4, 'paid', 'Fully paid', 4),
( 1, 5, 'cancelled', 'Invoice cancelled', 5),
( 200, 1, 'task', 'Labor / task', 1),
( 200, 2, 'spare_part', 'Replacement part', 2),
( 200, 3, 'consumable', 'Consumable item (oil, etc.)', 3),
( 200, 4, 'selling', 'Sales item', 4),
( 200, 5, 'other_service', 'Other service', 5);



INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 0, 10, 'SkillLevel', 'Skill level for macanics', 1),



( 0, 200, 'invoice line', 'code for invoice line ', 1),
( 0, 0, 'code', 'code for code ', 1),
( 0, 500, 'task category', 'task category for task code', 1),
( 0, 600, 'sub task category', 'sub task category for task code', 1),
( 0, 700, 'brand', 'brand for task code', 1),
( 0, 1500, 'sparepart category', 'sparepart category for sparepart code', 1),
( 0, 1600, 'sub sparepart category', 'sub sparepart category for sparepart code', 1),
( 0, 1700, 'brand', 'brand for sparepart code', 1),
( 0, 2500, 'consumable category', 'consumable category for consumable code', 1),
( 0, 2600, 'sub consumable category', 'sub consumable category for consumable code', 1),
( 0, 2700, 'brand', 'brand for consumable code', 1);

INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES


( 500,1, 'MA',  'opération de maintenance', 1),
( 500,2, 'DI',  'Diagnostic', 2),
( 500,3, 'RE',  'Repair', 3),

( 600,1, 'EN',  'Engine', 1),
( 600,2, 'BR',  'Brakes', 2),
( 600,3, 'EC',  'Electronic', 3),
( 600,4, 'CA',  'chassis', 4),

( 700,1, 'AL',  'all brand', 1),
( 700,2, 'HO',  'Honda', 2),
( 700,3, 'YA',  'Yamaha', 3),
( 700,4, 'SU',  'Suzuki', 4),
( 700,5, 'DU',  'Ducati', 5);



INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 10,1, 'intership',  'no skill needed', 1),
( 10,2, 'basic',  'basic mecanic', 2),
( 10,3, 'advanced',  'mecanic skilled', 3),
( 10,4, 'expert',  'expert or chief mecanics', 4);




INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 3,1, 'General',  'General', 1),
( 3,2, 'Basic',  'Basic', 2),
( 3,3, 'Important',  'Important', 3),
( 3,4, 'VIP',  'VIP', 4),
( 3,5, 'Gold',  'Gold', 5),
( 3,6, 'Platinum',  'Platinum', 6);

INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 4,1, 'Active',  'Active', 1),
( 4,2, 'Inactive',  'Inactive', 2),
( 4,3, 'Blocked',  'Blocked', 3)


INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES
( 5,1, 'servicesPerformed',  'Services Performed', 1),
( 5,2, 'spareParts',  'Spare Parts', 2),
( 5,3, 'consumable',  'Consumable', 3),
( 5,4, 'accessoriesSales',  'Accessories Sales', 4),
( 5,5, 'others',  'Miscellaneous items or other services', 5)


update correspondance set sort_order = 5 WHERE subject_code = 5 and code = 5 


select * from correspondance where subject_code = 5 





INSERT INTO correspondance ( subject_code, code, valueStr, valueNum, description, sort_order) VALUES
( 6,1, 'Base salary', 300000, 'Base salary for cost calculation', 1)
