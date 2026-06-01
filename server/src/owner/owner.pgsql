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
    
    -- Metadata
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
-- CREATE INDEX idx_owners_phone ON owners(phone_number);
-- CREATE INDEX idx_owners_email ON owners(email);
-- CREATE INDEX idx_owners_category ON owners(category);
-- CREATE INDEX idx_owners_name ON owners(last_name, first_name);
