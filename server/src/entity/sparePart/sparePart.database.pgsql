DROP TABLE IF EXISTS spare_part CASCADE;

CREATE TABLE spare_part (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    purchase_price INTEGER NOT NULL DEFAULT 0,
    selling_price INTEGER NOT NULL DEFAULT 0,
    markup_multiplier DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    supplier VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE INDEX idx_spare_parts_code ON spare_part(code);
-- CREATE INDEX idx_spare_parts_name ON spare_part(name);
-- CREATE INDEX idx_spare_parts_supplier ON spare_part(supplier);
-- CREATE INDEX idx_spare_parts_active ON spare_part(is_active);

-- Trigger updated_at
-- CREATE TRIGGER trigger_spare_parts_updated_at
--     BEFORE UPDATE ON spare_part
--     FOR EACH ROW
--     EXECUTE FUNCTION update_updated_at_column();

