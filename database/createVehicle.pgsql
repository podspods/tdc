drop table  if exists vehicle ;

CREATE TABLE IF NOT EXISTS vehicle (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER ,
    model_id INTEGER ,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(50),
    vintage INTEGER,  --  millesime
    mileage INTEGER DEFAULT 0,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_year CHECK (vintage BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE) + 1)
);
