-- =====================================================
-- TABLE: hourly_rates
-- Description: Manages hourly rates for labor based on various criteria
-- =====================================================

CREATE TABLE hourly_rates (
    rate_id SERIAL PRIMARY KEY,
    rate_code VARCHAR(50) UNIQUE NOT NULL,
    rate_name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Rate value
    hourly_rate DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    
    -- Rate type
    rate_type VARCHAR(50) NOT NULL, -- 'standard', 'skill_based', 'service_type', 'brand_specific', 'custom'
    
    -- Skill level (for skill_based rates)
    skill_level VARCHAR(50), -- 'basic', 'intermediate', 'advanced', 'expert', 'master'
    
    -- Service category (for service_type rates)
    service_category VARCHAR(50), -- 'maintenance', 'repair', 'diagnostic', 'customization', 'emergency'
    
    -- Brand specific (for brand_specific rates)
    brand_id INTEGER REFERENCES motorcycle_brands(brand_id),
    
    -- Validity period
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    
    -- Priority (higher priority takes precedence)
    priority INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_hourly_rates_type ON hourly_rates(rate_type);
CREATE INDEX idx_hourly_rates_active ON hourly_rates(is_active);
CREATE INDEX idx_hourly_rates_brand ON hourly_rates(brand_id);
CREATE INDEX idx_hourly_rates_skill ON hourly_rates(skill_level);

-- Trigger for updated_at
CREATE TRIGGER trigger_hourly_rates_updated_at
    BEFORE UPDATE ON hourly_rates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Standard rates
INSERT INTO hourly_rates (rate_code, rate_name, description, hourly_rate, rate_type, priority, is_default, created_by) VALUES
('RATE-STD-001', 'Standard Rate', 'Standard hourly rate for regular maintenance', 350000, 'standard', 0, TRUE, 'system'),
('RATE-STD-002', 'Premium Rate', 'Premium rate for complex repairs', 500000, 'standard', 0, FALSE, 'system'),
('RATE-STD-003', 'Emergency Rate', 'Emergency/after-hours rate', 700000, 'standard', 0, FALSE, 'system');

-- Skill-based rates
INSERT INTO hourly_rates (rate_code, rate_name, description, hourly_rate, rate_type, skill_level, priority, created_by) VALUES
('RATE-SKL-001', 'Basic Technician', 'Entry level technician', 250000, 'skill_based', 'basic', 10, 'system'),
('RATE-SKL-002', 'Intermediate Technician', 'Mid-level technician', 350000, 'skill_based', 'intermediate', 20, 'system'),
('RATE-SKL-003', 'Advanced Technician', 'Senior technician', 500000, 'skill_based', 'advanced', 30, 'system'),
('RATE-SKL-004', 'Expert Technician', 'Master technician', 700000, 'skill_based', 'expert', 40, 'system');

-- Service category rates
INSERT INTO hourly_rates (rate_code, rate_name, description, hourly_rate, rate_type, service_category, priority, created_by) VALUES
('RATE-SVC-001', 'Maintenance Rate', 'Regular maintenance services', 300000, 'service_type', 'maintenance', 10, 'system'),
('RATE-SVC-002', 'Repair Rate', 'Complex repair services', 450000, 'service_type', 'repair', 20, 'system'),
('RATE-SVC-003', 'Diagnostic Rate', 'Diagnostic services', 500000, 'service_type', 'diagnostic', 30, 'system'),
('RATE-SVC-004', 'Customization Rate', 'Customization and modification', 600000, 'service_type', 'customization', 25, 'system'),
('RATE-SVC-005', 'Emergency Rate', 'Emergency/express service', 800000, 'service_type', 'emergency', 40, 'system');

-- Brand-specific rates (for premium brands)
INSERT INTO hourly_rates (rate_code, rate_name, description, hourly_rate, rate_type, brand_id, priority, created_by) VALUES
('RATE-BRD-001', 'BMW Specialist', 'Specialized rate for BMW motorcycles',
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 650000, 'brand_specific', 
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'BMW'), 35, 'system'),
 
('RATE-BRD-002', 'Ducati Specialist', 'Specialized rate for Ducati motorcycles',
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Ducati'), 700000, 'brand_specific',
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Ducati'), 35, 'system'),
 
('RATE-BRD-003', 'Harley Specialist', 'Specialized rate for Harley-Davidson',
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Harley-Davidson'), 600000, 'brand_specific',
 (SELECT brand_id FROM motorcycle_brands WHERE brand_name = 'Harley-Davidson'), 35, 'system');

-- Custom rates (with date validity)
INSERT INTO hourly_rates (rate_code, rate_name, description, hourly_rate, rate_type, effective_from, effective_to, priority, created_by) VALUES
('RATE-CST-001', 'Summer Promotion', 'Summer discount rate', 300000, 'custom', '2026-06-01', '2026-08-31', 100, 'system'),
('RATE-CST-002', 'VIP Customer', 'Special rate for VIP customers', 280000, 'custom', '2026-01-01', NULL, 90, 'system');

-- =====================================================
-- FUNCTION: Get applicable hourly rate
-- =====================================================
CREATE OR REPLACE FUNCTION get_applicable_hourly_rate(
    p_skill_level VARCHAR DEFAULT NULL,
    p_service_category VARCHAR DEFAULT NULL,
    p_brand_id INTEGER DEFAULT NULL,
    p_custom_rate_code VARCHAR DEFAULT NULL
) RETURNS DECIMAL AS $$
DECLARE
    v_rate DECIMAL(12,2);
BEGIN
    -- Priority order: custom code > brand specific > skill level > service category > standard default
    
    -- 1. Check if custom rate code is provided
    IF p_custom_rate_code IS NOT NULL THEN
        SELECT hourly_rate INTO v_rate
        FROM hourly_rates
        WHERE rate_code = p_custom_rate_code
          AND is_active = TRUE
          AND effective_from <= CURRENT_DATE
          AND (effective_to IS NULL OR effective_to >= CURRENT_DATE);
        
        IF FOUND THEN
            RETURN v_rate;
        END IF;
    END IF;
    
    -- 2. Check brand-specific rate
    IF p_brand_id IS NOT NULL THEN
        SELECT hourly_rate INTO v_rate
        FROM hourly_rates
        WHERE rate_type = 'brand_specific'
          AND brand_id = p_brand_id
          AND is_active = TRUE
          AND effective_from <= CURRENT_DATE
          AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
        ORDER BY priority DESC
        LIMIT 1;
        
        IF FOUND THEN
            RETURN v_rate;
        END IF;
    END IF;
    
    -- 3. Check skill level rate
    IF p_skill_level IS NOT NULL THEN
        SELECT hourly_rate INTO v_rate
        FROM hourly_rates
        WHERE rate_type = 'skill_based'
          AND skill_level = p_skill_level
          AND is_active = TRUE
          AND effective_from <= CURRENT_DATE
          AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
        ORDER BY priority DESC
        LIMIT 1;
        
        IF FOUND THEN
            RETURN v_rate;
        END IF;
    END IF;
    
    -- 4. Check service category rate
    IF p_service_category IS NOT NULL THEN
        SELECT hourly_rate INTO v_rate
        FROM hourly_rates
        WHERE rate_type = 'service_type'
          AND service_category = p_service_category
          AND is_active = TRUE
          AND effective_from <= CURRENT_DATE
          AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
        ORDER BY priority DESC
        LIMIT 1;
        
        IF FOUND THEN
            RETURN v_rate;
        END IF;
    END IF;
    
    -- 5. Return default standard rate
    SELECT hourly_rate INTO v_rate
    FROM hourly_rates
    WHERE rate_type = 'standard'
      AND is_default = TRUE
      AND is_active = TRUE
    LIMIT 1;
    
    RETURN COALESCE(v_rate, 350000);
END;
$$ LANGUAGE plpgsql;