
drop table if exists task;

CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL DEFAULT 4,
    skill_level INTEGER NOT NULL DEFAULT 0,
    brand_id INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- drop index if exists idx_task_code;
-- CREATE INDEX idx_task_code ON task(code);
-- drop index if exists idx_task_brand;
-- CREATE INDEX idx_task_brand ON task(brand_id);
-- drop index if exists idx_task_skill;
-- CREATE INDEX idx_task_skill ON task(skill_level);
-- drop index if exists idx_task_active;
-- CREATE INDEX idx_task_active ON task(is_active);
