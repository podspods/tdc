-- =====================================================
-- TABLE: model
-- Description: Motorcycle models with relation to brands
-- =====================================================
-- drop table if exists model CASCADE ;

CREATE TABLE model (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL ,
    name VARCHAR(200) NOT NULL,
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
    )
);

-- Indexes
-- CREATE INDEX idx_models_brand ON model(brand_id);
-- CREATE INDEX idx_models_name ON model(model_name);
-- CREATE INDEX idx_models_year ON model(year_start);
-- CREATE INDEX idx_models_current ON model(is_current);

-- Trigger for updated_at
CREATE TRIGGER trigger_models_updated_at
    BEFORE UPDATE ON model
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO model (brand_id, name, year_start, year_end, is_current, engine_displacement, engine_type, power_hp, description, created_by) VALUES
-- Honda models
((SELECT id FROM brand WHERE name = 'Honda'), 'CB 650 R', 2019, NULL, TRUE, 649, '4-stroke', 94, 'Naked bike with inline-four engine', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'CBR 600 RR', 2020, NULL, TRUE, 599, '4-stroke', 120, 'Sport bike', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'Africa Twin', 2020, NULL, TRUE, 1084, '4-stroke', 102, 'Adventure bike', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'Gold Wing', 2018, NULL, TRUE, 1833, '4-stroke', 126, 'Touring bike', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'CB 500 X', 2016, 2022, FALSE, 471, '4-stroke', 47, 'Adventure style', 'system'),

-- Yamaha models
((SELECT id FROM brand WHERE name = 'Yamaha'), 'MT-07', 2018, NULL, TRUE, 689, '4-stroke', 74, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'MT-09', 2021, NULL, TRUE, 889, '4-stroke', 117, 'Hyper naked', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'R6', 2017, 2020, FALSE, 599, '4-stroke', 117, 'Sport bike discontinued', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'Tracer 9', 2021, NULL, TRUE, 889, '4-stroke', 117, 'Sport touring', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'Tenere 700', 2019, NULL, TRUE, 689, '4-stroke', 74, 'Adventure bike', 'system'),

-- BMW models
((SELECT id FROM brand WHERE name = 'BMW'), 'R 1250 GS', 2019, NULL, TRUE, 1254, '4-stroke', 136, 'Adventure bike', 'system'),
((SELECT id FROM brand WHERE name = 'BMW'), 'S 1000 RR', 2019, NULL, TRUE, 999, '4-stroke', 205, 'Sport bike', 'system'),
((SELECT id FROM brand WHERE name = 'BMW'), 'F 900 R', 2020, NULL, TRUE, 895, '4-stroke', 99, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'BMW'), 'G 310 R', 2016, NULL, TRUE, 313, '4-stroke', 34, 'Entry level', 'system'),

-- Ducati models
((SELECT id FROM brand WHERE name = 'Ducati'), 'Panigale V4', 2018, NULL, TRUE, 1103, '4-stroke', 214, 'Sport bike', 'system'),
((SELECT id FROM brand WHERE name = 'Ducati'), 'Monster', 2021, NULL, TRUE, 937, '4-stroke', 111, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'Ducati'), 'Scrambler', 2015, NULL, TRUE, 803, '4-stroke', 73, 'Classic style', 'system'),

-- Kawasaki models
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Ninja ZX-10R', 2016, NULL, TRUE, 998, '4-stroke', 200, 'Sport bike', 'system'),
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Z 900', 2017, NULL, TRUE, 948, '4-stroke', 125, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Versys 650', 2015, NULL, TRUE, 649, '4-stroke', 67, 'Adventure bike', 'system'),

-- Harley-Davidson
((SELECT id FROM brand WHERE name = 'Harley-Davidson'), 'Street Glide', 2018, NULL, TRUE, 1868, '4-stroke', 87, 'Touring', 'system'),
((SELECT id FROM brand WHERE name = 'Harley-Davidson'), 'Iron 883', 2017, NULL, TRUE, 883, '4-stroke', 47, 'Sportster', 'system'),

-- Triumph
((SELECT id FROM brand WHERE name = 'Triumph'), 'Street Triple', 2017, NULL, TRUE, 765, '4-stroke', 118, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'Triumph'), 'Tiger 900', 2020, NULL, TRUE, 888, '4-stroke', 94, 'Adventure', 'system'),

-- KTM
((SELECT id FROM brand WHERE name = 'KTM'), '390 Duke', 2017, NULL, TRUE, 373, '4-stroke', 44, 'Entry naked', 'system'),
((SELECT id FROM brand WHERE name = 'KTM'), '890 Adventure', 2021, NULL, TRUE, 889, '4-stroke', 105, 'Adventure', 'system');







INSERT INTO model (brand_id, name, year_start, year_end, is_current, engine_displacement, engine_type, power_hp, description, created_by) VALUES
-- Honda models
((SELECT id FROM brand WHERE name = 'Honda'), 'Scooter Lead', 2019, NULL, TRUE, 110, '4-stroke', 94, 'Scooter 110 cc', 'system');


-- Insertion des modèles pour toutes les marques (IDs 2 à 24)
INSERT INTO model (
    brand_id, name, year_start, year_end, is_current,
    engine_displacement, engine_type, power_hp, description, created_by
) VALUES

-- Honda (déjà existant, ajout de quelques variantes)
((SELECT id FROM brand WHERE name = 'Honda'), 'CBR 1000 RR-R', 2020, NULL, TRUE, 999, '4-stroke', 217, 'Sport bike flagship', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'CRF 1100 L Africa Twin', 2020, NULL, TRUE, 1084, '4-stroke', 102, 'Adventure bike', 'system'),
((SELECT id FROM brand WHERE name = 'Honda'), 'NC 750 X', 2014, NULL, TRUE, 745, '4-stroke', 58, 'Urban adventure', 'system'),

-- Yamaha (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'Yamaha'), 'R1', 2015, NULL, TRUE, 998, '4-stroke', 200, 'Superbike', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'XSR 700', 2016, NULL, TRUE, 689, '4-stroke', 74, 'Retro style', 'system'),
((SELECT id FROM brand WHERE name = 'Yamaha'), 'TMAX', 2012, NULL, TRUE, 530, '4-stroke', 45, 'Maxi scooter', 'system'),

-- Suzuki
((SELECT id FROM brand WHERE name = 'Suzuki'), 'GSX-R1000', 2017, NULL, TRUE, 999, '4-stroke', 199, 'Sport bike', 'system'),
((SELECT id FROM brand WHERE name = 'Suzuki'), 'SV650', 1999, NULL, TRUE, 645, '4-stroke', 72, 'V-twin naked', 'system'),
((SELECT id FROM brand WHERE name = 'Suzuki'), 'V-Strom 650', 2004, NULL, TRUE, 645, '4-stroke', 70, 'Adventure touring', 'system'),
((SELECT id FROM brand WHERE name = 'Suzuki'), 'Hayabusa', 1999, NULL, TRUE, 1340, '4-stroke', 190, 'Hyper sport', 'system'),
((SELECT id FROM brand WHERE name = 'Suzuki'), 'GSX-S750', 2017, NULL, TRUE, 749, '4-stroke', 112, 'Naked bike', 'system'),

-- Kawasaki (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Ninja 400', 2018, NULL, TRUE, 399, '4-stroke', 44, 'Entry sport', 'system'),
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Z 650', 2017, NULL, TRUE, 649, '4-stroke', 68, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'Kawasaki'), 'Vulcan S', 2015, NULL, TRUE, 649, '4-stroke', 61, 'Cruiser', 'system'),

-- BMW (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'BMW'), 'R 1250 RT', 2019, NULL, TRUE, 1254, '4-stroke', 136, 'Touring', 'system'),
((SELECT id FROM brand WHERE name = 'BMW'), 'S 1000 XR', 2015, NULL, TRUE, 999, '4-stroke', 165, 'Adventure sport', 'system'),
((SELECT id FROM brand WHERE name = 'BMW'), 'K 1600 GT', 2011, NULL, TRUE, 1649, '4-stroke', 160, 'Luxury touring', 'system'),

-- Ducati (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'Ducati'), 'Diavel 1260', 2019, NULL, TRUE, 1262, '4-stroke', 159, 'Power cruiser', 'system'),
((SELECT id FROM brand WHERE name = 'Ducati'), 'SuperSport 950', 2017, NULL, TRUE, 937, '4-stroke', 110, 'Sport touring', 'system'),
((SELECT id FROM brand WHERE name = 'Ducati'), 'Multistrada V4', 2021, NULL, TRUE, 1158, '4-stroke', 170, 'Adventure touring', 'system'),

-- Piaggio
((SELECT id FROM brand WHERE name = 'Piaggio'), 'MP3 500', 2015, NULL, TRUE, 493, '4-stroke', 40, 'Three-wheel scooter', 'system'),
((SELECT id FROM brand WHERE name = 'Piaggio'), 'Beverly 350', 2013, NULL, TRUE, 330, '4-stroke', 33, 'Maxi scooter', 'system'),
((SELECT id FROM brand WHERE name = 'Piaggio'), 'Liberty 125', 2016, NULL, TRUE, 124, '4-stroke', 11, 'Urban scooter', 'system'),

-- KTM (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'KTM'), '1290 Super Duke R', 2013, NULL, TRUE, 1301, '4-stroke', 177, 'Hyper naked', 'system'),
((SELECT id FROM brand WHERE name = 'KTM'), '250 Duke', 2015, NULL, TRUE, 248, '4-stroke', 30, 'Entry naked', 'system'),
((SELECT id FROM brand WHERE name = 'KTM'), '790 Adventure', 2019, NULL, TRUE, 799, '4-stroke', 95, 'Adventure', 'system'),

-- Triumph (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'Triumph'), 'Bonneville T120', 2016, NULL, TRUE, 1200, '4-stroke', 80, 'Classic retro', 'system'),
((SELECT id FROM brand WHERE name = 'Triumph'), 'Speed Twin 1200', 2019, NULL, TRUE, 1200, '4-stroke', 97, 'Modern classic', 'system'),
((SELECT id FROM brand WHERE name = 'Triumph'), 'Rocket 3', 2020, NULL, TRUE, 2458, '4-stroke', 167, 'Power cruiser', 'system'),

-- Moto Guzzi
((SELECT id FROM brand WHERE name = 'Moto Guzzi'), 'V7 III', 2017, 2020, FALSE, 744, '4-stroke', 52, 'Classic retro', 'system'),
((SELECT id FROM brand WHERE name = 'Moto Guzzi'), 'V85 TT', 2019, NULL, TRUE, 853, '4-stroke', 80, 'Adventure touring', 'system'),
((SELECT id FROM brand WHERE name = 'Moto Guzzi'), 'California 1400', 2013, 2018, FALSE, 1380, '4-stroke', 96, 'Touring cruiser', 'system'),

-- Harley-Davidson (déjà présent, ajout)
((SELECT id FROM brand WHERE name = 'Harley-Davidson'), 'Road King', 2014, NULL, TRUE, 1746, '4-stroke', 83, 'Touring', 'system'),
((SELECT id FROM brand WHERE name = 'Harley-Davidson'), 'Sportster 1200', 2015, 2021, FALSE, 1202, '4-stroke', 68, 'Sportster cruiser', 'system'),

-- Indian Motorcycle
((SELECT id FROM brand WHERE name = 'Indian Motorcycle'), 'Scout Bobber', 2015, NULL, TRUE, 1133, '4-stroke', 100, 'Cruiser', 'system'),
((SELECT id FROM brand WHERE name = 'Indian Motorcycle'), 'Chief Dark Horse', 2020, NULL, TRUE, 1811, '4-stroke', 86, 'Cruiser', 'system'),
((SELECT id FROM brand WHERE name = 'Indian Motorcycle'), 'Challenger', 2020, NULL, TRUE, 1769, '4-stroke', 122, 'Bagging tourer', 'system'),

-- CFMOTO
((SELECT id FROM brand WHERE name = 'CFMOTO'), '650 NK', 2016, NULL, TRUE, 649, '4-stroke', 60, 'Naked bike', 'system'),
((SELECT id FROM brand WHERE name = 'CFMOTO'), '700 CL-X', 2021, NULL, TRUE, 693, '4-stroke', 74, 'Modern retro', 'system'),
((SELECT id FROM brand WHERE name = 'CFMOTO'), '800 MT', 2021, NULL, TRUE, 799, '4-stroke', 95, 'Adventure', 'system'),

-- Zongshen
((SELECT id FROM brand WHERE name = 'Zongshen'), 'RX3', 2015, 2020, FALSE, 249, '4-stroke', 24, 'Adventure entry', 'system'),
((SELECT id FROM brand WHERE name = 'Zongshen'), 'ZS 150', 2018, NULL, TRUE, 149, '4-stroke', 11, 'Urban commuter', 'system'),
((SELECT id FROM brand WHERE name = 'Zongshen'), 'Cyclone 600', 2020, NULL, TRUE, 598, '4-stroke', 60, 'Naked', 'system'),

-- Lifan
((SELECT id FROM brand WHERE name = 'Lifan'), 'KP350', 2019, NULL, TRUE, 350, '4-stroke', 30, 'Naked', 'system'),
((SELECT id FROM brand WHERE name = 'Lifan'), 'KPR 150', 2017, 2021, FALSE, 149, '4-stroke', 13, 'Sport entry', 'system'),
((SELECT id FROM brand WHERE name = 'Lifan'), 'V16', 2018, NULL, TRUE, 249, '4-stroke', 18, 'Cruiser', 'system'),

-- SYM
((SELECT id FROM brand WHERE name = 'SYM'), 'Maxsym 400', 2017, NULL, TRUE, 399, '4-stroke', 32, 'Maxi scooter', 'system'),
((SELECT id FROM brand WHERE name = 'SYM'), 'Joyride 200', 2015, NULL, TRUE, 172, '4-stroke', 15, 'Urban scooter', 'system'),
((SELECT id FROM brand WHERE name = 'SYM'), 'Fiddle 125', 2018, NULL, TRUE, 124, '4-stroke', 11, 'Retro scooter', 'system'),

-- Kymco
((SELECT id FROM brand WHERE name = 'Kymco'), 'AK550', 2016, NULL, TRUE, 550, '4-stroke', 53, 'Maxi scooter', 'system'),
((SELECT id FROM brand WHERE name = 'Kymco'), 'Downtown 350', 2015, NULL, TRUE, 320, '4-stroke', 30, 'Urban scooter', 'system'),
((SELECT id FROM brand WHERE name = 'Kymco'), 'Like 150', 2017, NULL, TRUE, 149, '4-stroke', 10, 'Vintage scooter', 'system'),

-- VinFast
((SELECT id FROM brand WHERE name = 'VinFast'), 'Vento', 2021, NULL, TRUE, 175, '4-stroke', 15, 'Urban scooter', 'system'),
((SELECT id FROM brand WHERE name = 'VinFast'), 'Feliz', 2020, NULL, TRUE, 125, '4-stroke', 10, 'Scooter', 'system'),
((SELECT id FROM brand WHERE name = 'VinFast'), 'Klara', 2019, NULL, TRUE, 125, '4-stroke', 10, 'Classic scooter', 'system'),

-- Pega (modèle générique)
((SELECT id FROM brand WHERE name = 'Pega'), 'Retro 250', 2018, NULL, TRUE, 249, '4-stroke', 20, 'Retro naked', 'system'),
((SELECT id FROM brand WHERE name = 'Pega'), 'Urban 125', 2020, NULL, TRUE, 124, '4-stroke', 11, 'Commuter', 'system'),

-- Detech
((SELECT id FROM brand WHERE name = 'Detech'), 'Explorer 250', 2019, NULL, TRUE, 249, '4-stroke', 22, 'Adventure', 'system'),
((SELECT id FROM brand WHERE name = 'Detech'), 'Sport 125', 2017, NULL, TRUE, 124, '4-stroke', 10, 'Naked', 'system'),

-- Royal Enfield
((SELECT id FROM brand WHERE name = 'Royal Enfield'), 'Classic 350', 2009, NULL, TRUE, 346, '4-stroke', 20, 'Retro classic', 'system'),
((SELECT id FROM brand WHERE name = 'Royal Enfield'), 'Interceptor 650', 2019, NULL, TRUE, 648, '4-stroke', 47, 'Modern retro', 'system'),
((SELECT id FROM brand WHERE name = 'Royal Enfield'), 'Himalayan', 2016, NULL, TRUE, 411, '4-stroke', 24, 'Adventure', 'system'),

-- QJMotor
((SELECT id FROM brand WHERE name = 'QJMotor'), 'SRK 600', 2020, NULL, TRUE, 600, '4-stroke', 76, 'Naked', 'system'),
((SELECT id FROM brand WHERE name = 'QJMotor'), 'SRK 300', 2019, NULL, TRUE, 298, '4-stroke', 27, 'Entry naked', 'system'),
((SELECT id FROM brand WHERE name = 'QJMotor'), 'SRK 1000', 2021, NULL, TRUE, 999, '4-stroke', 130, 'Sport naked', 'system'),

-- Benelli
((SELECT id FROM brand WHERE name = 'Benelli'), 'Leoncino 500', 2017, NULL, TRUE, 499, '4-stroke', 47, 'Retro naked', 'system'),
((SELECT id FROM brand WHERE name = 'Benelli'), 'TRK 502', 2016, NULL, TRUE, 499, '4-stroke', 47, 'Adventure', 'system'),
((SELECT id FROM brand WHERE name = 'Benelli'), '502C', 2019, NULL, TRUE, 499, '4-stroke', 47, 'Cruiser', 'system'),
((SELECT id FROM brand WHERE name = 'Benelli'), 'TNT 300', 2014, NULL, TRUE, 298, '4-stroke', 37, 'Naked', 'system');