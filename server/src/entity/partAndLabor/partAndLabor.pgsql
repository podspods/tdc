-- Create table part_and_labor
drop table if exists  part_and_labor;
CREATE TABLE IF NOT EXISTS part_and_labor (
    id SERIAL PRIMARY KEY,
    type_line_code VARCHAR(10) NOT NULL,
    category_code VARCHAR(10) NOT NULL,
    sub_category_code VARCHAR(10) NOT NULL,
    brand_code VARCHAR(10) NOT NULL,
    duration INTEGER DEFAULT 0,
    skill_level INTEGER DEFAULT 0,
    cost INTEGER DEFAULT 0, -- percentage
    margin INTEGER DEFAULT 0,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_time_used TIMESTAMP NULL DEFAULT NULL,
    created_by VARCHAR(100) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_part_labor_type_line ON part_and_labor(type_line_code);
CREATE INDEX idx_part_labor_category ON part_and_labor(category_code);
CREATE INDEX idx_part_labor_sub_category ON part_and_labor(sub_category_code);
CREATE INDEX idx_part_labor_brand ON part_and_labor(brand_code);
CREATE INDEX idx_part_labor_code ON part_and_labor(code);

-- Insert test data for PartAndLabor
INSERT INTO part_and_labor (
    type_line_code, category_code, sub_category_code, brand_code,
    duration, skill_level, cost, margin, code, name, description, created_by
) VALUES
-- Oil change for Ducati (TA-MA-EN-DU-1)
('TA', 'MA', 'EN', 'DU', 60, 2, 100, 30, 'TA-MA-EN-DU-1', 'Oil Change - Ducati', 
 'Complete oil change service for Ducati motorcycles', 'system'),
-- Brake pad replacement for Yamaha (TA-MA-BR-YA-2)
('TA', 'MA', 'BR', 'YA', 90, 3, 150, 40, 'TA-MA-BR-YA-2', 'Brake Pad Replacement - Yamaha',
 'Front and rear brake pad replacement', 'system'),
-- Diagnostic for BMW (TA-DI-EC-BM-3)
('TA', 'DI', 'EC', 'BM', 45, 4, 80, 50, 'TA-DI-EC-BM-3', 'Electronic Diagnostic - BMW',
 'Full electronic system diagnostic', 'system'),
-- Engine repair for Honda (TA-RE-EN-HO-4)
('TA', 'RE', 'EN', 'HO', 240, 5, 500, 60, 'TA-RE-EN-HO-4', 'Engine Repair - Honda',
 'Complete engine overhaul and repair', 'system'),
-- Spare part: Brake disc for KTM (SP-MA-BR-KT-5)
('SP', 'MA', 'BR', 'KT', 0, 0, 120, 25, 'SP-MA-BR-KT-5', 'Brake Disc - KTM',
 'OEM replacement brake disc', 'system'),
-- Consumable: Engine oil for all brands (CO-MA-EN-AL-6)
('CO', 'MA', 'EN', 'AL', 0, 0, 50, 15, 'CO-MA-EN-AL-6', 'Engine Oil 10W40',
 'High performance engine oil, 1 liter', 'system');