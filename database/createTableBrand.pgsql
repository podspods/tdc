-- =====================================================
-- TABLE: motorcycle_brands
-- Description: Simplified version with essential brand information
-- =====================================================

CREATE TABLE motorcycle_brands (
    -- Primary identification
    brand_id SERIAL PRIMARY KEY,
    -- Brand name
    brand_name VARCHAR(100) NOT NULL UNIQUE,  -- Brand name (e.g., 'Honda', 'Yamaha')
    
    -- Origin
    country_of_origin VARCHAR(100) NOT NULL,   -- Country where the brand originated
    
    -- Metadata and audit
    created_by VARCHAR(100) NOT NULL,           -- User who created the record
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Creation timestamp
    
    -- Constraint for country name
    CONSTRAINT valid_country CHECK (country_of_origin != '')
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Index for faster searches on brand_name
CREATE INDEX idx_brands_name ON motorcycle_brands(brand_name);

-- Index for filtering by country
CREATE INDEX idx_brands_country ON motorcycle_brands(country_of_origin);

-- Index for date-based queries
CREATE INDEX idx_brands_create_date ON motorcycle_brands(create_date);

-- =====================================================
-- INSERT MOTORCYCLE BRANDS IN VIETNAM
-- =====================================================

INSERT INTO motorcycle_brands (brand_name, country_of_origin, created_by) VALUES
-- Japanese brands (dominant in Vietnam)
('Honda', 'Japan', 'system'),
('Yamaha', 'Japan', 'system'),
('Suzuki', 'Japan', 'system'),
('Kawasaki', 'Japan', 'system'),

-- European brands
('BMW', 'Germany', 'system'),
('Ducati', 'Italy', 'system'),
('Piaggio', 'Italy', 'system'),
('KTM', 'Austria', 'system'),
('Triumph', 'United Kingdom', 'system'),
('Moto Guzzi', 'Italy', 'system'),

-- American brands
('Harley-Davidson', 'United States', 'system'),
('Indian Motorcycle', 'United States', 'system'),

-- Chinese brands
('CFMOTO', 'China', 'system'),
('Zongshen', 'China', 'system'),
('Lifan', 'China', 'system'),

-- Taiwanese brands
('SYM', 'Taiwan', 'system'),
('Kymco', 'Taiwan', 'system'),

-- Vietnamese brands
('VinFast', 'Vietnam', 'system'),
('Pega', 'Vietnam', 'system'),
('Detech', 'Vietnam', 'system'),
('Yadea', 'China', 'system'),  -- Popular electric brand in Vietnam

-- Other Asian brands
('Royal Enfield', 'India', 'system'),
('Benelli', 'Italy/China', 'system'),  -- Italian brand now Chinese-owned
('QJMotor', 'China', 'system');

-- =====================================================
-- VIEW: All brands ordered by name
-- =====================================================

CREATE VIEW v_all_brands AS
SELECT 
    brand_id,
    brand_name,
    country_of_origin,
    created_by,
    create_date
FROM motorcycle_brands
ORDER BY brand_name;

-- =====================================================
-- VIEW: Brands by country
-- =====================================================

CREATE VIEW v_brands_by_country AS
SELECT 
    country_of_origin,
    COUNT(*) as brand_count,
    ARRAY_AGG(brand_name ORDER BY brand_name) as brands
FROM motorcycle_brands
GROUP BY country_of_origin
ORDER BY country_of_origin;

-- =====================================================
-- COMMENTS ON TABLE AND COLUMNS
-- =====================================================

COMMENT ON TABLE motorcycle_brands IS 'Simplified table of motorcycle brands in Vietnam';
COMMENT ON COLUMN motorcycle_brands.brand_id IS 'Unique identifier for each brand';
COMMENT ON COLUMN motorcycle_brands.brand_name IS 'Name of the motorcycle brand';
COMMENT ON COLUMN motorcycle_brands.country_of_origin IS 'Country where the brand originated';
COMMENT ON COLUMN motorcycle_brands.created_by IS 'User who created the record';
COMMENT ON COLUMN motorcycle_brands.create_date IS 'Timestamp when the record was created';