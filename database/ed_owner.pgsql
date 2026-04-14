-- =====================================================
-- TABLE: owners (clients)
-- Description: Owners/Clients with phone as unique identifier
-- Category: basic, important, VIP
-- =====================================================

CREATE TYPE owner_category AS ENUM ('basic', 'important', 'vip');

CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    address TEXT,
    city VARCHAR(100),
    category owner_category NOT NULL DEFAULT 'basic',
    notes TEXT,
    
    -- Stats
    total_motorcycles INTEGER DEFAULT 0,
    total_invoices INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    last_visit_date DATE,
    
    -- Metadata
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone_number ~ '^[0-9+\-\s]{10,15}$')
);

-- Indexes
CREATE INDEX idx_owners_phone ON owners(phone_number);
CREATE INDEX idx_owners_email ON owners(email);
CREATE INDEX idx_owners_category ON owners(category);
CREATE INDEX idx_owners_name ON owners(last_name, first_name);

-- Trigger for updated_at
CREATE TRIGGER trigger_owners_updated_at
    BEFORE UPDATE ON owners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO owners (
    first_name, last_name, phone_number, email, address, city, category,
    total_motorcycles, total_invoices, total_spent, last_visit_date, created_by
) VALUES
-- Basic customers
('Nguyen', 'Van A', '0901234567', 'nguyenvana@email.com', '123 Le Loi, District 1', 'Ho Chi Minh City', 'basic', 1, 3, 15000000, '2025-12-15', 'system'),
('Tran', 'Thi B', '0912345678', 'tranthib@email.com', '456 Nguyen Hue, District 1', 'Ho Chi Minh City', 'basic', 1, 2, 8500000, '2026-01-20', 'system'),
('Le', 'Van C', '0923456789', 'levanc@email.com', '789 Vo Van Kiet, District 5', 'Ho Chi Minh City', 'basic', 2, 4, 22000000, '2026-02-10', 'system'),

-- Important customers
('Pham', 'Thi D', '0934567890', 'phamthid@email.com', '321 Tran Hung Dao, District 1', 'Ho Chi Minh City', 'important', 2, 6, 45000000, '2026-03-01', 'system'),
('Hoang', 'Van E', '0945678901', 'hoangvane@email.com', '654 Pham Ngu Lao, District 1', 'Ho Chi Minh City', 'important', 3, 8, 78000000, '2026-02-28', 'system'),
('Nguyen', 'Thi F', '0956789012', 'nguyenthif@email.com', '987 Le Van Sy, District 3', 'Ho Chi Minh City', 'important', 2, 5, 52000000, '2026-02-25', 'system'),

-- VIP customers
('Tran', 'Van G', '0967890123', 'tranvang@email.com', '147 Nguyen Trai, District 5', 'Ho Chi Minh City', 'vip', 4, 12, 156000000, '2026-03-05', 'system'),
('Le', 'Thi H', '0978901234', 'lethih@email.com', '258 Cach Mang Thang 8, District 10', 'Ho Chi Minh City', 'vip', 3, 10, 234000000, '2026-03-02', 'system'),
('Pham', 'Van I', '0989012345', 'phamvani@email.com', '369 Dong Khoi, District 1', 'Ho Chi Minh City', 'vip', 5, 15, 312000000, '2026-03-04', 'system');

-- =====================================================
-- UPDATE registrations table to link with owners
-- =====================================================

ALTER TABLE registrations ADD COLUMN owner_id INTEGER REFERENCES owners(owner_id);
-- Update existing registrations with random owner_ids
UPDATE registrations SET owner_id = 1 WHERE registration_id = 1;
UPDATE registrations SET owner_id = 2 WHERE registration_id = 2;
UPDATE registrations SET owner_id = 3 WHERE registration_id = 3;
UPDATE registrations SET owner_id = 4 WHERE registration_id = 4;
UPDATE registrations SET owner_id = 5 WHERE registration_id = 5;
UPDATE registrations SET owner_id = 6 WHERE registration_id = 6;
UPDATE registrations SET owner_id = 7 WHERE registration_id = 7;
UPDATE registrations SET owner_id = 8 WHERE registration_id = 8;
UPDATE registrations SET owner_id = 9 WHERE registration_id = 9;

-- =====================================================
-- TABLE: invoices
-- Description: Invoices linked to owners
-- =====================================================

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    owner_id INTEGER NOT NULL REFERENCES owners(owner_id) ON DELETE CASCADE,
    
    -- Invoice details
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    paid_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'overdue', 'cancelled'
    
    -- Amounts
    subtotal DECIMAL(12,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 10.0,
    tax_amount DECIMAL(12,2) GENERATED ALWAYS AS (subtotal * tax_rate / 100) STORED,
    total_amount DECIMAL(12,2) GENERATED ALWAYS AS (subtotal + (subtotal * tax_rate / 100)) STORED,
    
    -- Payment
    payment_method VARCHAR(50), -- 'cash', 'card', 'bank_transfer', 'e_wallet'
    payment_reference VARCHAR(100),
    
    -- Items (simplified - in real app would be separate table)
    description TEXT,
    
    -- Metadata
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_invoices_owner ON invoices(owner_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);

-- Trigger for invoices updated_at
CREATE TRIGGER trigger_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample invoices
INSERT INTO invoices (
    invoice_number, owner_id, issue_date, due_date, status,
    subtotal, payment_method, description, created_by
) VALUES
-- Owner 1 (Nguyen Van A)
('INV-2026-0001', 1, '2026-01-15', '2026-02-15', 'paid', 5000000, 'cash', 'Oil change and tire replacement', 'system'),
('INV-2026-0002', 1, '2026-02-10', '2026-03-10', 'paid', 3500000, 'card', 'Brake pads replacement', 'system'),
('INV-2026-0003', 1, '2026-03-01', '2026-04-01', 'pending', 6500000, NULL, 'Chain and sprockets replacement', 'system'),

-- Owner 2 (Tran Thi B)
('INV-2026-0004', 2, '2026-01-20', '2026-02-20', 'paid', 2800000, 'cash', 'Battery replacement', 'system'),
('INV-2026-0005', 2, '2026-02-25', '2026-03-25', 'pending', 5700000, NULL, 'General service', 'system'),

-- Owner 3 (Le Van C)
('INV-2026-0006', 3, '2026-01-05', '2026-02-05', 'paid', 4200000, 'card', 'Tire change', 'system'),
('INV-2026-0007', 3, '2026-02-12', '2026-03-12', 'paid', 8900000, 'bank_transfer', 'Engine repair', 'system'),
('INV-2026-0008', 3, '2026-02-28', '2026-03-28', 'paid', 3500000, 'cash', 'Oil service', 'system'),
('INV-2026-0009', 3, '2026-03-05', '2026-04-05', 'pending', 5400000, NULL, 'Brake system', 'system'),

-- Owner 4 (Pham Thi D - Important)
('INV-2026-0010', 4, '2026-01-10', '2026-02-10', 'paid', 12500000, 'card', 'Major service', 'system'),
('INV-2026-0011', 4, '2026-02-15', '2026-03-15', 'paid', 8900000, 'bank_transfer', 'Suspension work', 'system'),
('INV-2026-0012', 4, '2026-03-01', '2026-04-01', 'paid', 15600000, 'card', 'Performance upgrade', 'system'),

-- Owner 5 (Hoang Van E - Important)
('INV-2026-0013', 5, '2026-01-18', '2026-02-18', 'paid', 23400000, 'bank_transfer', 'Full restoration', 'system'),
('INV-2026-0014', 5, '2026-02-20', '2026-03-20', 'paid', 8700000, 'cash', 'Routine maintenance', 'system'),
('INV-2026-0015', 5, '2026-03-02', '2026-04-02', 'pending', 18900000, NULL, 'Engine overhaul', 'system'),

-- Owner 7 (Tran Van G - VIP)
('INV-2026-0016', 7, '2026-01-22', '2026-02-22', 'paid', 34500000, 'bank_transfer', 'Complete service package', 'system'),
('INV-2026-0017', 7, '2026-02-18', '2026-03-18', 'paid', 27800000, 'card', 'Custom parts installation', 'system'),
('INV-2026-0018', 7, '2026-03-03', '2026-04-03', 'pending', 41200000, NULL, 'Full customization', 'system');