-- Active: 1740942987883@@127.0.0.1@5432@tdc
CREATE TABLE vietnam_provinces (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL, -- Province code (e.g., "SG" for Ho Chi Minh)
    name_en VARCHAR(100) NOT NULL, -- English name
    name_vi VARCHAR(100) NOT NULL, -- Vietnamese name
    region VARCHAR(50), -- North, Central, South
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert major Vietnamese provinces for reference
INSERT INTO vietnam_provinces (code, name_en, name_vi, region) VALUES
('HN', 'Hanoi', 'Hà Nội', 'North'),
('HCM', 'Ho Chi Minh City', 'Thành phố Hồ Chí Minh', 'South'),
('DN', 'Da Nang', 'Đà Nẵng', 'Central'),
('HP', 'Hai Phong', 'Hải Phòng', 'North'),
('CT', 'Can Tho', 'Cần Thơ', 'South'),
('BD', 'Binh Duong', 'Bình Dương', 'South'),
('DN', 'Dong Nai', 'Đồng Nai', 'South'),
('KH', 'Khanh Hoa', 'Khánh Hòa', 'Central'),
('QN', 'Quang Ninh', 'Quảng Ninh', 'North'),
('LA', 'Long An', 'Long An', 'South');

-- Qui suis-je ? (utilisateur actuel)
SELECT 
    current_user AS "👤 Utilisateur actuel",
    session_user AS "👥 Utilisateur session",
    current_database() AS "💾 Base de données",
    inet_client_addr() AS "🌐 Adresse IP",
    inet_client_port() AS "🔌 Port",
    version() AS "📦 Version PostgreSQL";

    SET ROLE tdc2026;
