-- =====================================================
-- TABLE: owners (clients)
-- Description: Owners/Clients with phone as unique identifier
-- Category: basic, important, VIP
-- =====================================================

drop table owners CASCADE;

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    category INTEGER NULL DEFAULT 0,
    notes TEXT,
    
    -- Stats
    total_motorcycles INTEGER DEFAULT 0,
    total_invoices INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    last_visit_date DATE,
    
    -- Metadata
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
    -- Constraints
    -- CONSTRAINT valid_email CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    -- CONSTRAINT valid_phone CHECK (phone_number ~ '^[0-9+\-\s]{10,15}$')
);

-- Indexes
-- CREATE INDEX idx_owners_phone ON owners(phone_number);
-- CREATE INDEX idx_owners_email ON owners(email);
-- CREATE INDEX idx_owners_category ON owners(category);
-- CREATE INDEX idx_owners_name ON owners(last_name, first_name);


INSERT INTO owners (first_name, last_name, phone_number, email, address, city, category, notes, total_motorcycles, total_invoices, total_spent, last_visit_date, created_by) VALUES
('Nguyen', 'Van A', '0901234561', 'nguyenvana@example.com', '123 Le Loi', 'Ho Chi Minh City', 2, 'VIP customer, prefers email', 2, 5, 12500000, '2025-05-01', 'system'),
('Tran', 'Thi B', '0901234562', 'tranthib@example.com', '456 Nguyen Hue', 'Ho Chi Minh City', 1, 'Important client, often uses Zalo', 1, 3, 6700000, '2025-05-10', 'system'),
('Le', 'Van C', '0901234563', 'levanc@example.com', '789 Vo Van Kiet', 'Ho Chi Minh City', 0, 'Basic customer', 1, 1, 1500000, '2025-05-05', 'system'),
('Pham', 'Thi D', '0901234564', 'phamthid@example.com', '321 Tran Hung Dao', 'Hanoi', 2, 'VIP, bought premium service', 3, 7, 28900000, '2025-05-12', 'admin'),
('Hoang', 'Van E', '0901234565', 'hoangvane@example.com', '654 Pham Ngu Lao', 'Da Nang', 1, 'Important, rides often', 2, 4, 9200000, '2025-05-08', 'system');