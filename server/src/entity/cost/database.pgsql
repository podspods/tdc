CREATE TABLE IF NOT EXISTS cost (
    id SERIAL PRIMARY KEY,
    monthly_base DECIMAL(12,2) NOT NULL,
    day_work DECIMAL(12,2) NOT NULL DEFAULT 0,
    hour_work DECIMAL(12,2) NOT NULL DEFAULT 0,
    effective_date DATE NOT NULL,
    end_date DATE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_overlap EXCLUDE USING gist (
        daterange(effective_date, COALESCE(end_date, 'infinity'::date), '[)') WITH &&
    )
);