-- DROP TABLE IF EXISTS garage CASCADE;

-- =====================================================
-- TABLE: garage
-- Description: Store garage information (company details)
-- =====================================================
DROP TABLE IF EXISTS garage;
CREATE TABLE IF NOT EXISTS garage (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT,
    zipcode VARCHAR(20),
    city VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    logo_url VARCHAR(255),
    tax_code VARCHAR(50),
    tax_rate INTEGER,
    website VARCHAR(100),
    bank_name VARCHAR(100),
    bank_account VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE INDEX idx_garage_name ON garage(name);
-- CREATE INDEX idx_garage_active ON garage(is_active);
-- CREATE INDEX idx_garage_tax_code ON garage(tax_code);

-- Trigger for updated_at
-- CREATE TRIGGER trigger_garage_updated_at
--     BEFORE UPDATE ON garage
--     FOR EACH ROW
--     EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TEST DATA
-- =====================================================

INSERT INTO garage (name, address, zipcode, city, phone, email, logo_url, tax_code, tax_rate, website, bank_name, bank_account, created_by) VALUES
('TDC Moto Garage', '123 Lê Lợi', '700000', 'Ho Chi Minh City', '028 1234 5678', 'contact@tdcmoto.com', '/images/logo-tdc.png', '1234567890', 10,'www.tdcmoto.com', 'Vietcombank', '123456789', 'system'),
('Premium Moto Service', '456 Nguyễn Huệ', '700000', 'Ho Chi Minh City', '028 8765 4321', 'info@premiummoto.com', '/images/logo-premium.png', '0987654321',15, 'premiummoto.vn', 'Techcombank', '987654321', 'admin');