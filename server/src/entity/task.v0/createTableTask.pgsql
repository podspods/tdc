
drop table if exists task;

CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL DEFAULT 4,
    skill_level INTEGER NOT NULL DEFAULT 0,
    brand_id INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL DEFAULT "system",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- drop index if exists idx_task_code;
-- CREATE INDEX idx_task_code ON task(code);
-- drop index if exists idx_task_brand;
-- CREATE INDEX idx_task_brand ON task(brand_id);
-- drop index if exists idx_task_skill;
-- CREATE INDEX idx_task_skill ON task(skill_level);
-- drop index if exists idx_task_active;
-- CREATE INDEX idx_task_active ON task(is_active);


-- Insertion de tâches avec la nouvelle convention
INSERT INTO task (code, name, description, duration, skill_level, brand_id, is_active, created_by) VALUES
-- Maintenance moteur (toutes marques)
('MAENAL001', 'Oil change', 'Engine oil', 2, 1, 0, true, 'system'),
('MAENAL005', 'filter replacement', 'Filter replacement', 2, 1, 0, true, 'system'),
('MAENAL002', 'Air filter replacement', 'Replace air filter element', 1, 1, 0, true, 'system'),
('MAENAL003', 'Spark plugs replacement', 'Change spark plugs (set of 4)', 2, 2, 0, true, 'system'),
('MAENAL004', 'Valve clearance check', 'Inspect valve clearance (no adjustment)', 2, 2, 0, true, 'system'),
--Maintenance freins (toutes marques)
('MABRAL001', 'Brake pad check', 'Inspect front/rear brake pads thickness', 1, 1, 0, true, 'system'),
('MABRAL002', 'Brake fluid replacement', 'Flush and replace DOT4 fluid', 2, 2, 0, true, 'system'),
('MABRAL003', 'Brake disc inspection', 'Check disc thickness and runout', 1, 2, 0, true, 'system'),
--Maintenance transmission (toutes marques)
('MATRAL001', 'Chain cleaning & lubrication', 'Clean and lubricate drive chain', 1, 1, 0, true, 'system'),
('MATRAL002', 'Chain replacement', 'Replace chain and sprockets', 3, 3, 0, true, 'system'),
--Diagnostic (toutes marques)
('DIECAL001', 'Engine diagnostic scan', 'Full ECU scan and fault code reading', 2, 2, 0, true, 'system'),
('DIELAL001', 'Electrical system check', 'Battery, alternator, wiring test', 2, 2, 0, true, 'system'),
('DISUAL001', 'Suspension diagnosis', 'Check fork and shock for leaks/damage', 1, 2, 0, true, 'system'),
--Réparation moteur (toutes marques)
('REENAL001', 'Valve adjustment', 'Clearance adjustment and shim replacement', 6, 4, 0, true, 'system'),
('REENAL002', 'Clutch replacement', 'Replace clutch plates and springs', 5, 3, 0, true, 'system'),
('REENAL003', 'Timing chain replacement', 'Replace cam chain and tensioner', 8, 4, 0, true, 'system'),
--Réparation suspension (toutes marques)
('RESUAL001', 'Fork seal replacement', 'Replace front fork oil seals', 4, 3, 0, true, 'system'),
('RESUAL002', 'Shock absorber rebuild', 'Rebuild rear shock', 4, 4, 0, true, 'system'),
--Customisation (toutes marques)
('CUPEAL001', 'Performance ECU tuning', 'Remap and dyno test', 4, 4, 0, true, 'system'),
('CUEXAL001', 'Exhaust installation', 'Fit aftermarket exhaust system', 3, 2, 0, true, 'system'),
--Tâches spécifiques à une marque (Honda)
('MAENHO001', 'Honda DCT oil change', 'Dual‑clutch transmission service', 3, 3, 1, true, 'system'),  -- brand_id 1 = Honda
('REENHO001', 'Honda VTEC valve adjustment', 'Specialised VTEC system', 5, 4, 1, true, 'system'),
--Tâches spécifiques à Yamaha
('MAENYA001', 'Yamaha CP3 valve check', 'MT-09 / XSR900 specific', 5, 3, 2, true, 'system'), -- brand_id 2 = Yamaha
('REBRYA001', 'Yamaha ABS pump reset', 'Reset ABS after repair', 2, 3, 2, true, 'system'),
--Tâches spécifiques à BMW
('DIECBM001', 'BMW CAN bus diagnostic', 'Advanced bus system check', 3, 4, 3, true, 'system'), -- brand_id 3 = BMW
('RESUBM001', 'BMW Telelever service', 'Front suspension pivot bearing', 5, 4, 3, true, 'system'),
--Tâches spécifiques à Ducati
('REENDU001', 'Ducati Desmo service', 'Desmodromic valve adjustment', 8, 5, 4, true, 'system'), -- brand_id 4 = Ducati
('CUPEDU001', 'Ducati race ECU', 'Track‑oriented mapping', 5, 5, 4, true, 'system');