-- =====================================================
-- TABLE: correspondance
-- Stores code-value pairs for various subjects (status, line types, etc.)
-- =====================================================
DROP TABLE IF EXISTS correspondance CASCADE;
CREATE TABLE IF NOT EXISTS correspondance (
    id SERIAL PRIMARY KEY,
    subject_code INTEGER NOT NULL,      -- e.g., 1 = invoice status, 200 = line type
    code INTEGER NOT NULL,
    value VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- =====================================================
-- TEST DATA - correspondance
-- =====================================================
INSERT INTO correspondance (subject_code, code, value, description, sort_order) VALUES
(1, 1, 'draft', 'Invoice is being edited', 1),
(1, 2, 'pending', 'Waiting for payment', 2),
(1, 3, 'overdue', 'Payment overdue', 3),
(1, 4, 'paid', 'Fully paid', 4),
(1, 5, 'cancelled', 'Invoice cancelled', 5),
(200, 1, 'task', 'Labor / task', 1),
(200, 2, 'spare_part', 'Replacement part', 2),
(200, 3, 'consumable', 'Consumable item (oil, etc.)', 3),
(200, 4, 'selling', 'Sales item', 4),
(200, 5, 'other_service', 'Other service', 5);
-- =====================================================
-- TABLE: invoice
-- Main invoice header
-- =====================================================
 DROP TABLE IF EXISTS invoice CASCADE;

CREATE TABLE IF NOT EXISTS invoice (
    id SERIAL PRIMARY KEY,
    garage_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
     invoice_number VARCHAR(50) UNIQUE NOT NULL,   -- nouveau champ

    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status_code INTEGER NOT NULL,
    notes TEXT,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: invoice_line
-- Invoice lines (tasks, spare parts, consumables, etc.)
-- =====================================================
DROP TABLE IF EXISTS invoice_line CASCADE;
CREATE TABLE IF NOT EXISTS invoice_line (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL,
    line_type_code INTEGER NOT NULL,      -- corresponds to subject_code=200
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    discount_rate DECIMAL(5,2) DEFAULT 0,
    amount DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price * (1 - discount_rate/100)) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES (performance)
-- =====================================================
-- CREATE INDEX idx_invoice_garage ON invoice(garage_id);
-- CREATE INDEX idx_invoice_vehicle ON invoice(vehicle_id);
-- CREATE INDEX idx_invoice_status ON invoice(status_code);
-- CREATE INDEX idx_invoice_line_invoice ON invoice_line(invoice_id);
-- CREATE INDEX idx_invoice_line_type ON invoice_line(line_type_code);
-- CREATE INDEX idx_correspondance_subject ON correspondance(subject_code, code);



-- Assume we have at least one garage (id=1) and one vehicle (id=1) from existing data.
-- For testing, we insert sample garage and vehicle if they don't exist (optional, but we rely on presence).

-- Sample invoices
INSERT INTO invoice (garage_id, vehicle_id, invoice_number,issue_date, due_date, status_code, notes, created_by) VALUES
(1, 1,'12345202605121', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 2, 'Routine maintenance', 'system'),
(2, 1,'25678202605122', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE - INTERVAL '5 days', 3, 'Overdue payment', 'admin'),
(2, 1,'25678202605123', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE - INTERVAL '30 days', 4, 'Paid invoice', 'system');

-- Sample invoice lines for invoice_id = 1
INSERT INTO invoice_line (invoice_id, line_type_code, description, quantity, unit_price, discount_rate) VALUES
(1, 1, 'Oil change', 1.0, 350000, 0),
(1, 1, 'Brake inspection', 0.5, 500000, 0),
(1, 2, 'Oil filter', 1, 150000, 0),
(1, 3, 'Engine oil 10W40 (1L)', 2, 120000, 10);

-- For invoice_id = 2
INSERT INTO invoice_line (invoice_id, line_type_code, description, quantity, unit_price, discount_rate) VALUES
(2, 1, 'Engine diagnostic', 1.5, 600000, 0),
(2, 2, 'Spark plugs set', 1, 350000, 0);

-- For invoice_id = 3
INSERT INTO invoice_line (invoice_id, line_type_code, description, quantity, unit_price, discount_rate) VALUES
(3, 5, 'Chain cleaning service', 1, 250000, 0);