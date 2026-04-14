-- =====================================================
-- TABLE: owners (clients)
-- Description: Owners/Clients with phone as unique identifier
-- Category: basic, important, VIP
-- =====================================================

drop table owners CASCADE;

CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
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