-- =====================================================
-- TABLE: labor_catalog (Main d'œuvre)
-- Description: Catalog of labor types/services with standard rates
-- =====================================================
DROP TABLE IF EXISTS labor_catalog CASCADE;

CREATE TABLE labor_catalog (
    labor_id SERIAL PRIMARY KEY,
    labor_code VARCHAR(50) UNIQUE NOT NULL,
    labor_name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'maintenance', 'repair', 'diagnostic', 'customization'
    
    -- Pricing
    default_rate_per_hour DECIMAL(12,2) NOT NULL,
    estimated_hours DECIMAL(10,2),
    min_charge DECIMAL(12,2),
    
    -- Skill requirements
    required_skill_level VARCHAR(50), -- 'basic', 'intermediate', 'advanced', 'expert'
    required_certification VARCHAR(100),
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for labor
CREATE INDEX idx_labor_code ON labor_catalog(labor_code);
CREATE INDEX idx_labor_category ON labor_catalog(category);
CREATE INDEX idx_labor_active ON labor_catalog(is_active);

-- =====================================================
-- TABLE: consumable_catalog (Ingrédients/Consommables)
-- Description: Catalog of consumable items (oils, cleaners, etc.)
-- =====================================================
DROP TABLE IF EXISTS consumable_catalog CASCADE;
CREATE TABLE consumable_catalog (
    consumable_id SERIAL PRIMARY KEY,
    consumable_code VARCHAR(50) UNIQUE NOT NULL,
    consumable_name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'oil', 'cleaner', 'lubricant', 'coolant', 'brake_fluid', 'other'
    
    -- Units and packaging
    unit_of_measure VARCHAR(20) NOT NULL, -- 'liter', 'ml', 'kg', 'g', 'piece', 'box'
    package_size DECIMAL(10,2),
    package_unit VARCHAR(20),
    
    -- Pricing
    unit_price DECIMAL(12,2) NOT NULL,
    purchase_price DECIMAL(12,2),
    supplier VARCHAR(200),
    
    -- Stock management
    current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    minimum_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    maximum_stock DECIMAL(10,2),
    reorder_point DECIMAL(10,2),
    location_in_warehouse VARCHAR(100),
    
    -- Specifications
    viscosity VARCHAR(50), -- for oils
    specification TEXT,
    safety_data_sheet_url VARCHAR(255),
    hazardous BOOLEAN DEFAULT FALSE,
    flammable BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for consumables
CREATE INDEX idx_consumable_code ON consumable_catalog(consumable_code);
CREATE INDEX idx_consumable_category ON consumable_catalog(category);
CREATE INDEX idx_consumable_stock ON consumable_catalog(current_stock);
CREATE INDEX idx_consumable_active ON consumable_catalog(is_active);

-- =====================================================
-- TABLE: suppliers (for spare parts and consumables)
-- =====================================================
DROP TABLE IF EXISTS suppliers CASCADE;

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_code VARCHAR(50) UNIQUE NOT NULL,
    supplier_name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    address TEXT,
    tax_code VARCHAR(50),
    payment_terms VARCHAR(100),
    delivery_terms VARCHAR(100),
    minimum_order DECIMAL(12,2),
    lead_time_days INTEGER,
    rating DECIMAL(2,1),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for suppliers
CREATE INDEX idx_supplier_code ON suppliers(supplier_code);
CREATE INDEX idx_supplier_name ON suppliers(supplier_name);

-- =====================================================
-- TABLE: spare_part_catalog (Pièces de rechange)
-- Description: Catalog of spare parts
-- =====================================================
DROP TABLE IF EXISTS spare_part_catalog CASCADE;
CREATE TABLE spare_part_catalog (
    part_id SERIAL PRIMARY KEY,
    part_code VARCHAR(50) UNIQUE NOT NULL,
    part_name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Classification
    category VARCHAR(100), -- 'engine', 'transmission', 'brakes', 'suspension', 'electrical', 'body'
    subcategory VARCHAR(100),
    part_type VARCHAR(50), -- 'OEM', 'aftermarket', 'performance', 'reconditioned'
    
    -- Compatibility
    compatible_brands TEXT[], -- Array of compatible motorcycle brands
    compatible_models TEXT[], -- Array of compatible models
    year_from INTEGER,
    year_to INTEGER,
    engine_types TEXT[], -- Array of engine types
    
    -- Part numbers
    oem_part_number VARCHAR(100),
    manufacturer_part_number VARCHAR(100),
    alternative_part_numbers TEXT[], -- Array of alternative/reference numbers
    
    -- Specifications
    material VARCHAR(100),
    weight_grams INTEGER,
    dimensions VARCHAR(100),
    color VARCHAR(50),
    
    -- Pricing
    unit_price DECIMAL(12,2) NOT NULL,
    purchase_price DECIMAL(12,2),
    wholesale_price DECIMAL(12,2),
    tax_rate DECIMAL(5,2) DEFAULT 10.0,
    
    -- Supplier information
    primary_supplier_id INTEGER REFERENCES suppliers(supplier_id),
    secondary_supplier_ids INTEGER[],
    manufacturer VARCHAR(200),
    country_of_origin VARCHAR(100),
    
    -- Warranty
    warranty_months INTEGER DEFAULT 6,
    warranty_terms TEXT,
    
    -- Stock management
    current_stock INTEGER NOT NULL DEFAULT 0,
    minimum_stock INTEGER NOT NULL DEFAULT 0,
    maximum_stock INTEGER,
    reorder_point INTEGER,
    location_in_warehouse VARCHAR(100),
    bin_number VARCHAR(50),
    
    -- Images and documents
    image_urls TEXT[],
    technical_drawing_url VARCHAR(255),
    installation_guide_url VARCHAR(255),
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    is_discontinued BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for spare parts
CREATE INDEX idx_part_code ON spare_part_catalog(part_code);
CREATE INDEX idx_part_name ON spare_part_catalog(part_name);
CREATE INDEX idx_part_category ON spare_part_catalog(category);
CREATE INDEX idx_part_oem ON spare_part_catalog(oem_part_number);
CREATE INDEX idx_part_stock ON spare_part_catalog(current_stock);
CREATE INDEX idx_part_active ON spare_part_catalog(is_active);

-- GiST indexes for array searches
CREATE INDEX idx_part_brands ON spare_part_catalog USING GIN (compatible_brands);
CREATE INDEX idx_part_models ON spare_part_catalog USING GIN (compatible_models);
CREATE INDEX idx_part_alt_numbers ON spare_part_catalog USING GIN (alternative_part_numbers);

-- =====================================================
-- TRIGGERS for updated_at
-- =====================================================
CREATE TRIGGER trigger_labor_updated_at
    BEFORE UPDATE ON labor_catalog
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_consumable_updated_at
    BEFORE UPDATE ON consumable_catalog
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_spare_part_updated_at
    BEFORE UPDATE ON spare_part_catalog
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_supplier_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Sample suppliers
INSERT INTO suppliers (supplier_code, supplier_name, contact_person, phone, email, address, tax_code, payment_terms, lead_time_days, created_by) VALUES
('SUP001', 'Honda Parts Vietnam', 'Nguyen Van A', '0281234567', 'parts@honda.com.vn', '123 Le Loi, HCMC', '123456789', 'Net 30', 3, 'system'),
('SUP002', 'Yamaha Motor Parts', 'Tran Thi B', '0282345678', 'parts@yamaha.com.vn', '456 Nguyen Hue, HCMC', '234567890', 'Net 30', 3, 'system'),
('SUP003', 'BMW Motorrad Parts', 'Le Van C', '0283456789', 'parts@bmw.com.vn', '789 Vo Van Kiet, HCMC', '345678901', 'Net 15', 5, 'system'),
('SUP004', 'Vietnam Auto Parts', 'Pham Thi D', '0284567890', 'sales@vap.vn', '321 Tran Hung Dao, HCMC', '456789012', 'Net 15', 2, 'system'),
('SUP005', 'MotoCare Supplies', 'Hoang Van E', '0285678901', 'info@motocare.vn', '654 Pham Ngu Lao, HCMC', '567890123', 'COD', 1, 'system');


truncate table labor_catalog ; 
-- Sample labor catalog
INSERT INTO labor_catalog (labor_code, labor_name, description, category, default_rate_per_hour, estimated_hours, required_skill_level, created_by) VALUES
('LAB001', 'Oil Change', 'Engine oil replacement including filter check', 'maintenance', 350000, 0.5, 'basic', 'system'),
('LAB002', 'Brake Pad Replacement', 'Replace front or rear brake pads', 'maintenance', 400000, 1.0, 'intermediate', 'system'),
('LAB003', 'Chain Cleaning and Lubrication', 'Clean and lubricate drive chain', 'maintenance', 250000, 0.5, 'basic', 'system'),
('LAB004', 'Engine Diagnostic', 'Full engine diagnostic using computer', 'diagnostic', 600000, 1.0, 'advanced', 'system'),
('LAB005', 'Valve Adjustment', 'Adjust engine valve clearance', 'repair', 500000, 2.0, 'advanced', 'system'),
('LAB006', 'Clutch Replacement', 'Replace clutch plates and springs', 'repair', 550000, 2.5, 'advanced', 'system'),
('LAB007', 'Tire Change', 'Remove old tire and mount new one', 'maintenance', 300000, 1.0, 'intermediate', 'system'),
('LAB008', 'Wheel Balancing', 'Balance wheels after tire change', 'maintenance', 200000, 0.5, 'intermediate', 'system'),
('LAB009', 'Full Service', 'Complete motorcycle service (oil, filters, chain, inspection)', 'maintenance', 1200000, 3.0, 'advanced', 'system'),
('LAB010', 'Suspension Tuning', 'Adjust and tune suspension', 'customization', 450000, 1.5, 'expert', 'system'),
('LAB011', 'Electrical System Diagnosis', 'Diagnose electrical issues', 'diagnostic', 500000, 1.0, 'advanced', 'system'),
('LAB012', 'Engine Rebuild', 'Complete engine overhaul', 'repair', 1500000, 8.0, 'expert', 'system');

-- Sample consumable catalog
INSERT INTO consumable_catalog (consumable_code, consumable_name, description, category, unit_of_measure, package_size, package_unit, unit_price, purchase_price, current_stock, minimum_stock, location_in_warehouse, created_by) VALUES
('CON001', 'Engine Oil 10W40', 'Semi-synthetic 4-stroke engine oil', 'oil', 'liter', 1, 'liter', 120000, 90000, 50, 10, 'A1-01', 'system'),
('CON002', 'Engine Oil 20W50', 'Mineral 4-stroke engine oil', 'oil', 'liter', 1, 'liter', 100000, 75000, 30, 10, 'A1-02', 'system'),
('CON003', 'Brake Fluid DOT4', 'High-performance brake fluid', 'brake_fluid', 'liter', 0.5, 'bottle', 150000, 110000, 25, 5, 'B2-01', 'system'),
('CON004', 'Chain Lubricant Spray', 'Wet-type chain lubricant', 'lubricant', 'ml', 400, 'spray', 180000, 130000, 20, 5, 'C3-01', 'system'),
('CON005', 'Chain Cleaner Spray', 'Degreaser for chains', 'cleaner', 'ml', 400, 'spray', 160000, 115000, 20, 5, 'C3-02', 'system'),
('CON006', 'Coolant Concentrate', 'Engine coolant, mix with water', 'coolant', 'liter', 1, 'liter', 140000, 100000, 15, 5, 'A2-01', 'system'),
('CON007', 'Brake Cleaner', 'Quick-drying brake parts cleaner', 'cleaner', 'ml', 500, 'spray', 130000, 90000, 30, 10, 'B2-02', 'system'),
('CON008', 'Contact Cleaner', 'Electrical contact cleaner', 'cleaner', 'ml', 300, 'spray', 170000, 120000, 15, 5, 'D1-01', 'system'),
('CON009', 'Lithium Grease', 'Multi-purpose lithium grease', 'lubricant', 'gram', 400, 'tube', 90000, 60000, 25, 5, 'C3-03', 'system'),
('CON010', 'Copper Grease', 'High-temperature anti-seize compound', 'lubricant', 'gram', 200, 'tube', 110000, 75000, 10, 3, 'C3-04', 'system'),
('CON011', 'Windshield Cleaner', 'Plastic-safe windshield cleaner', 'cleaner', 'ml', 500, 'spray', 95000, 65000, 12, 5, 'D2-01', 'system'),
('CON012', 'Degreaser', 'Heavy-duty degreaser', 'cleaner', 'liter', 1, 'bottle', 85000, 55000, 20, 5, 'D2-02', 'system');

-- Sample spare parts catalog

truncate table spare_part_catalog ; 
INSERT INTO spare_part_catalog (part_code, part_name, description, category, subcategory, part_type, compatible_brands, compatible_models, oem_part_number, unit_price, purchase_price, primary_supplier_id, warranty_months, current_stock, minimum_stock, location_in_warehouse, created_by) VALUES
-- Brake parts
('BRK001', 'Brake Pads - Front', 'Sintered brake pads for front', 'brakes', 'pads', 'OEM', ARRAY['Honda', 'Yamada'], ARRAY['CB 650 R', 'MT-07'], '06455-MGE-D01', 450000, 320000, 1, 6, 20, 5, 'B1-01', 'system'),
('BRK002', 'Brake Pads - Rear', 'Sintered brake pads for rear', 'brakes', 'pads', 'OEM', ARRAY['Honda', 'Yamada'], ARRAY['CB 650 R', 'MT-07'], '06455-MGE-D02', 420000, 300000, 1, 6, 20, 5, 'B1-02', 'system'),
('BRK003', 'Brake Disc - Front', 'Wave brake disc 320mm', 'brakes', 'discs', 'aftermarket', ARRAY['Honda', 'Yamaha', 'Kawasaki'], ARRAY['CB 650 R', 'MT-07', 'Z900'], 'BRAKEDISC-FR-001', 1200000, 850000, 4, 12, 5, 2, 'B1-03', 'system'),
('BRK004', 'Brake Disc - Rear', 'Wave brake disc 240mm', 'brakes', 'discs', 'aftermarket', ARRAY['Honda', 'Yamaha', 'Kawasaki'], ARRAY['CB 650 R', 'MT-07', 'Z900'], 'BRAKEDISC-RR-001', 950000, 680000, 4, 12, 5, 2, 'B1-04', 'system'),

-- -- Filters
('FIL001', 'Oil Filter', 'Spin-on oil filter', 'engine', 'filters', 'OEM', ARRAY['Honda', 'Yamaha', 'Suzuki'], ARRAY['Most models'], '15410-MFJ-D01', 150000, 100000, 1, 3, 50, 20, 'A3-01', 'system'),
('FIL002', 'Air Filter', 'Air filter element', 'engine', 'filters', 'OEM', ARRAY['Honda'], ARRAY['CB 650 R'], '17210-MJE-D01', 250000, 180000, 1, 3, 15, 5, 'A3-02', 'system'),
('FIL003', 'Fuel Filter', 'In-line fuel filter', 'engine', 'filters', 'OEM', ARRAY['Honda', 'Yamaha'], ARRAY['Various'], '16910-MT3-000', 120000, 80000, 1, 3, 20, 5, 'A3-03', 'system'),

-- Engine parts
('ENG001', 'Spark Plug - Standard', 'NGK Standard spark plug', 'engine', 'ignition', 'OEM', ARRAY['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'], ARRAY['Most models'], 'NGK-CR8E', 80000, 50000, 4, 1, 100, 30, 'E1-01', 'system'),
('ENG002', 'Spark Plug - Iridium', 'NGK Iridium spark plug', 'engine', 'ignition', 'performance', ARRAY['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW'], ARRAY['Most models'], 'NGK-IX-CR8E', 180000, 130000, 4, 6, 40, 10, 'E1-02', 'system'),
('ENG003', 'Drive Chain - 520', '520 pitch drive chain 110 links', 'transmission', 'chain', 'OEM', ARRAY['Honda', 'Yamaha'], ARRAY['CB 650 R', 'MT-07'], 'DID520-110L', 850000, 600000, 4, 6, 10, 3, 'T1-01', 'system'),
('ENG004', 'Drive Chain - 525', '525 pitch drive chain 112 links', 'transmission', 'chain', 'OEM', ARRAY['Kawasaki', 'Suzuki'], ARRAY['Z900', 'GSX-R'], 'DID525-112L', 950000, 680000, 4, 6, 8, 3, 'T1-02', 'system'),
('ENG005', 'Front Sprocket', '15T front sprocket', 'transmission', 'sprockets', 'OEM', ARRAY['Honda'], ARRAY['CB 650 R'], '23801-MJE-D00', 250000, 170000, 1, 6, 12, 4, 'T1-03', 'system'),
('ENG006', 'Rear Sprocket', '42T rear sprocket', 'transmission', 'sprockets', 'OEM', ARRAY['Honda'], ARRAY['CB 650 R'], '41201-MJE-D00', 320000, 230000, 1, 6, 12, 4, 'T1-04', 'system'),

-- Suspension
('SUS001', 'Fork Oil - 10W', 'Suspension fork oil 10W', 'suspension', 'oil', 'OEM', ARRAY['All brands'], ARRAY['Most models'], 'FORKOIL-10W', 180000, 130000, 4, 1, 20, 5, 'S1-01', 'system'),
('SUS002', 'Fork Seal Kit', 'Front fork seal kit (pair)', 'suspension', 'seals', 'OEM', ARRAY['Honda'], ARRAY['CB 650 R'], '51490-MJE-D01', 450000, 320000, 1, 6, 8, 3, 'S1-02', 'system'),

-- Electrical
('ELE001', 'Battery - 12V 10Ah', 'Maintenance-free battery', 'electrical', 'batteries', 'OEM', ARRAY['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'], ARRAY['Most 600cc models'], 'YTX12-BS', 850000, 600000, 4, 12, 15, 5, 'E2-01', 'system'),
('ELE002', 'Battery - 12V 14Ah', 'High-capacity maintenance-free battery', 'electrical', 'batteries', 'OEM', ARRAY['BMW', 'Ducati'], ARRAY['R 1250 GS', 'Monster'], 'YTX14-BS', 1100000, 800000, 2, 12, 8, 3, 'E2-02', 'system'),
('ELE003', 'LED Headlight Bulb', 'LED conversion bulb H4', 'electrical', 'lighting', 'aftermarket', ARRAY['All brands'], ARRAY['Most models'], 'LED-H4-001', 450000, 300000, 4, 6, 25, 10, 'E2-03', 'system'),

-- Body parts
-- ('BDY001', 'Clutch Lever', 'Adjustable clutch lever', 'body', 'controls', 'aftermarket', ARRAY['Honda', 'Yamaha'], ARRAY['CB 650 R', 'MT-07'], 'LEVER-CLT-001', 280000, 190000, 4, 3, 15, 5, 'B3-01', 'system'),
('BDY002', 'Brake Lever', 'Adjustable brake lever', 'body', 'controls', 'aftermarket', ARRAY['Honda', 'Yamaha'], ARRAY['CB 650 R', 'MT-07'], 'LEVER-BRK-001', 280000, 190000, 4, 3, 15, 5, 'B3-02', 'system');


