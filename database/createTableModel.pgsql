-- =====================================================
-- TABLE: motorcycle_models
-- Description: Motorcycle models with relation to brands
-- =====================================================

CREATE TABLE motorcycle_models (
    model_id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL REFERENCES motorcycle_brands(brand_id) ON DELETE CASCADE,
    model_name VARCHAR(200) NOT NULL,
    year_start INTEGER NOT NULL,
    year_end INTEGER,
    is_current BOOLEAN DEFAULT FALSE,
    engine_displacement INTEGER, -- in cc
    engine_type VARCHAR(50), -- '4-stroke', '2-stroke', 'electric', 'hybrid'
    power_hp INTEGER,
    torque_nm INTEGER,
    weight_kg INTEGER,
    fuel_capacity_liters DECIMAL(5,2),
    description TEXT,
    image_url VARCHAR(255),
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_years CHECK (
        year_start BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE) + 1
        AND (year_end IS NULL OR year_end >= year_start)
    ),
    CONSTRAINT unique_brand_model UNIQUE (brand_id, model_name, year_start)
);

-- Indexes
CREATE INDEX idx_models_brand ON motorcycle_models(brand_id);
CREATE INDEX idx_models_name ON motorcycle_models(model_name);
CREATE INDEX idx_models_year ON motorcycle_models(year_start);
CREATE INDEX idx_models_current ON motorcycle_models(is_current);

-- Trigger for updated_at
CREATE TRIGGER trigger_models_updated_at
    BEFORE UPDATE ON motorcycle_models
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO motorcycle_models (brand_id, model_name, year_start, year_end, is_current, engine_displacement, engine_type, power_hp, description, created_by) VALUES
-- Honda models
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Honda'), 'CB 650 R', 2019, NULL, TRUE, 649, '4-stroke', 94, 'Naked bike with inline-four engine', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Honda'), 'CBR 600 RR', 2020, NULL, TRUE, 599, '4-stroke', 120, 'Sport bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Honda'), 'Africa Twin', 2020, NULL, TRUE, 1084, '4-stroke', 102, 'Adventure bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Honda'), 'Gold Wing', 2018, NULL, TRUE, 1833, '4-stroke', 126, 'Touring bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Honda'), 'CB 500 X', 2016, 2022, FALSE, 471, '4-stroke', 47, 'Adventure style', 'system'),

-- Yamaha models
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Yamaha'), 'MT-07', 2018, NULL, TRUE, 689, '4-stroke', 74, 'Naked bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Yamaha'), 'MT-09', 2021, NULL, TRUE, 889, '4-stroke', 117, 'Hyper naked', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Yamaha'), 'R6', 2017, 2020, FALSE, 599, '4-stroke', 117, 'Sport bike discontinued', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Yamaha'), 'Tracer 9', 2021, NULL, TRUE, 889, '4-stroke', 117, 'Sport touring', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Yamaha'), 'Tenere 700', 2019, NULL, TRUE, 689, '4-stroke', 74, 'Adventure bike', 'system'),

-- BMW models
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 'R 1250 GS', 2019, NULL, TRUE, 1254, '4-stroke', 136, 'Adventure bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 'S 1000 RR', 2019, NULL, TRUE, 999, '4-stroke', 205, 'Sport bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 'F 900 R', 2020, NULL, TRUE, 895, '4-stroke', 99, 'Naked bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 'G 310 R', 2016, NULL, TRUE, 313, '4-stroke', 34, 'Entry level', 'system'),

-- Ducati models
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Ducati'), 'Panigale V4', 2018, NULL, TRUE, 1103, '4-stroke', 214, 'Sport bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Ducati'), 'Monster', 2021, NULL, TRUE, 937, '4-stroke', 111, 'Naked bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Ducati'), 'Scrambler', 2015, NULL, TRUE, 803, '4-stroke', 73, 'Classic style', 'system'),

-- Kawasaki models
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Kawasaki'), 'Ninja ZX-10R', 2016, NULL, TRUE, 998, '4-stroke', 200, 'Sport bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Kawasaki'), 'Z 900', 2017, NULL, TRUE, 948, '4-stroke', 125, 'Naked bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Kawasaki'), 'Versys 650', 2015, NULL, TRUE, 649, '4-stroke', 67, 'Adventure bike', 'system'),

-- Harley-Davidson
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Harley-Davidson'), 'Street Glide', 2018, NULL, TRUE, 1868, '4-stroke', 87, 'Touring', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Harley-Davidson'), 'Iron 883', 2017, NULL, TRUE, 883, '4-stroke', 47, 'Sportster', 'system'),

-- Triumph
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Triumph'), 'Street Triple', 2017, NULL, TRUE, 765, '4-stroke', 118, 'Naked bike', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Triumph'), 'Tiger 900', 2020, NULL, TRUE, 888, '4-stroke', 94, 'Adventure', 'system'),

-- KTM
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'KTM'), '390 Duke', 2017, NULL, TRUE, 373, '4-stroke', 44, 'Entry naked', 'system'),
((SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'KTM'), '890 Adventure', 2021, NULL, TRUE, 889, '4-stroke', 105, 'Adventure', 'system');