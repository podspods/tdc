"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllVehicles = findAllVehicles;
exports.findAllVehicleInfo = findAllVehicleInfo;
exports.findVehicleInfoById = findVehicleInfoById;
exports.findVehicleById = findVehicleById;
exports.findVehicleByPlate = findVehicleByPlate;
exports.createVehicle = createVehicle;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;
//--------------------------------------------------------------------------------------------------------------------------
// Fonctions de mapping pour chaque entité
function mapDbToBrand(row) {
    return {
        id: row.brand_id,
        name: row.brand_name,
        code: row.brand_code,
        countryOfOrigin: row.country_of_origin,
        createDate: row.create_date, // selon votre schéma
        createdBy: row.created_by, // selon votre schéma
    };
}
function mapDbToModel(row) {
    return {
        id: row.model_id,
        brandId: row.brand_id,
        name: row.model_name,
        yearStart: row.year_start,
        yearEnd: row.year_end,
        isCurrent: row.is_current,
        engineDisplacement: row.engine_displacement,
        engineType: row.engine_type,
        powerHp: row.power_hp,
        torqueNm: row.torque_nm,
        weightKg: row.weight_kg,
        fuelCapacityLiters: row.fuel_capacity_liters,
        description: row.model_description,
        imageUrl: row.image_url,
        createdAt: row.model_created_at, // selon votre schéma
        updatedAt: row.model_updated_at, // selon votre schéma
        createdBy: row.model_created_by, // selon votre schéma
    };
}
function mapDbToOwner(row) {
    return {
        id: row.owner_id,
        firstName: row.first_name,
        lastName: row.last_name,
        phoneNumber: row.phone_number,
        email: row.email,
        address: row.address,
        city: row.city,
        category: row.category,
        notes: row.notes,
        createdAt: row.owner_created_at,
        updatedAt: row.owner_updated_at,
        createdBy: row.owner_created_by,
    };
}
//--------------------------------------------------------------------------------------------------------------------------
function mapDbToVehicle(row) {
    return {
        id: row.id,
        ownerId: row.owner_id,
        modelId: row.model_id,
        plateNumber: row.plate_number,
        color: row.color,
        vintage: row.vintage,
        mileage: row.mileage,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
//--------------------------------------------------------------------------------------------------------------------------
async function findAllVehicles(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, ownerId, modelId, search } = params;
    const offset = (page - 1) * limit;
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (ownerId) {
        whereClause += ` WHERE v.owner_id = $${idx++}`;
        values.push(ownerId);
    }
    if (modelId) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` v.model_id = $${idx++}`;
        values.push(modelId);
    }
    if (search) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` (v.plate_number ILIKE $${idx} OR o.first_name ILIKE $${idx} OR o.last_name ILIKE $${idx} OR m.name ILIKE $${idx})`;
        values.push(`%${search}%`);
        idx++;
    }
    const countQuery = `
    SELECT COUNT(*)
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    ${whereClause}
  `;
    const dataQuery = `
    SELECT v.*, 
           o.first_name || ' ' || o.last_name AS owner_name,
           m.name,
           b.name
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    LEFT JOIN brand b ON m.brand_id = b.id
    ${whereClause}
    ORDER BY v.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;
    const [countResult, dataResult] = await Promise.all([
        pg.query(countQuery, values),
        pg.query(dataQuery, [...values, limit, offset]),
    ]);
    return {
        data: dataResult.rows.map(mapDbToVehicle),
        total: parseInt(countResult.rows[0].count),
    };
}
//--------------------------------------------------------------------------------------------------------------------------
async function findAllVehicleInfo(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, ownerId, modelId, search } = params;
    // 1. Construction de la clause WHERE
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (ownerId) {
        whereClause += ` WHERE v.owner_id = $${idx++}`;
        values.push(ownerId);
    }
    if (modelId) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` v.model_id = $${idx++}`;
        values.push(modelId);
    }
    if (search) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` (v.plate_number ILIKE $${idx} OR o.first_name ILIKE $${idx} OR o.last_name ILIKE $${idx} OR m.name ILIKE $${idx})`;
        values.push(`%${search}%`);
        idx++;
    }
    // 2. Requête de comptage (toujours sans LIMIT)
    const countQuery = `
    SELECT COUNT(*)
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    ${whereClause}
  `;
    // 3. Construction de la requête de données (avec ou sans LIMIT/OFFSET)
    let dataQuery = `
    SELECT v.*, 
           b.id AS brand_id,
           b.name AS brand_name,
           b.code AS brand_code,
           b.country_of_origin,
           m.id AS model_id,
           m.name AS model_name,
           m.year_start,
           m.year_end,
           m.is_current,
           m.engine_displacement,
           m.engine_type,
           m.power_hp,
           m.torque_nm,
           m.weight_kg,
           m.fuel_capacity_liters,
           m.description AS model_description,
           m.image_url,
           o.id AS owner_id,
           o.first_name,
           o.last_name,
           o.phone_number,
           o.email,
           o.address,
           o.city,
           o.category,
           o.notes,
           o.created_by AS owner_created_by,
           o.created_at AS owner_created_at,
           o.updated_at AS owner_updated_at
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    LEFT JOIN brand b ON m.brand_id = b.id
    ${whereClause}
    ORDER BY v.created_at DESC
  `;
    // 4. Ajout de LIMIT/OFFSET uniquement si limit > 0
    const queryParams = [...values];
    if (limit > 0) {
        const offset = (page - 1) * limit;
        dataQuery += ` LIMIT $${idx} OFFSET $${idx + 1}`;
        queryParams.push(limit, offset);
        idx += 2;
    }
    // 5. Exécution des requêtes
    const [countResult, dataResult] = await Promise.all([
        pg.query(countQuery, values),
        pg.query(dataQuery, queryParams),
    ]);
    // 6. Construction des données
    const total = parseInt(countResult.rows[0].count, 10);
    if (dataResult.rows.length === 0) {
        return { data: [], total };
    }
    const vehicleInfoList = dataResult.rows.map((row) => {
        const vehicle = mapDbToVehicle(row);
        const brand = mapDbToBrand(row);
        const model = mapDbToModel(row);
        const owner = mapDbToOwner(row);
        return { vehicle, brand, model, owner };
    });
    return { data: vehicleInfoList, total };
}
//--------------------------------------------------------------------------------------------------------------------------
async function findVehicleInfoById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT 
       v.*,
       b.id AS brand_id,
       b.name AS brand_name,
       b.code AS brand_code,
       b.country_of_origin,
       m.id AS model_id,
       m.name AS model_name,
       m.year_start,
       m.year_end,
       m.is_current,
       m.engine_displacement,
       m.engine_type,
       m.power_hp,
       m.torque_nm,
       m.weight_kg,
       m.fuel_capacity_liters,
       m.description AS model_description,
       m.image_url,
       o.id AS owner_id,
       o.first_name,
       o.last_name,
       o.phone_number,
       o.email,
       o.address,
       o.city,
       o.category,
       o.notes,
       o.created_by AS owner_created_by,
       o.created_at AS owner_created_at,
       o.updated_at AS owner_updated_at
     FROM vehicle v
     LEFT JOIN model m ON v.model_id = m.id
     LEFT JOIN brand b ON m.brand_id = b.id
     LEFT JOIN owners o ON v.owner_id = o.id
     WHERE v.id = $1`, [id]);
    if (result.rows.length === 0)
        return null;
    const row = result.rows[0];
    // Construction des objets imbriqués
    const vehicle = mapDbToVehicle(row); // fonction existante
    const brand = mapDbToBrand(row);
    const model = mapDbToModel(row);
    const owner = mapDbToOwner(row);
    const vehicleInfo = {
        vehicle: vehicle,
        brand: brand,
        model: model,
        owner: owner,
    };
    return vehicleInfo;
}
//--------------------------------------------------------------------------------------------------------------------------
async function findVehicleById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT v.*, 
            o.first_name || ' ' || o.last_name AS owner_name,
            m.name,
            b.name
     FROM vehicle v
     LEFT JOIN owners o ON v.owner_id = o.id
     LEFT JOIN model m ON v.model_id = m.id
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE v.id = $1`, [id]);
    return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function findVehicleByPlate(fastify, plate) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT * FROM vehicle WHERE plate_number = $1`, [plate]);
    return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function createVehicle(fastify, data) {
    const { pg } = fastify;
    const { ownerId, modelId, plateNumber, color, vintage, mileage, createdBy } = data;
    const result = await pg.query(`INSERT INTO vehicle (owner_id, model_id, plate_number, color, vintage, mileage, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`, [ownerId, modelId, plateNumber, color, vintage || null, mileage || 0, createdBy]);
    return mapDbToVehicle(result.rows[0]);
}
//--------------------------------------------------------------------------------------------------------------------------
async function updateVehicle(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let idx = 1;
    const fieldMap = {
        ownerId: "owner_id",
        modelId: "model_id",
        plateNumber: "plate_number",
        color: "color",
        vintage: "vintage",
        mileage: "mileage",
    };
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && fieldMap[key]) {
            fields.push(`${fieldMap[key]} = $${idx++}`);
            values.push(value);
        }
    }
    if (fields.length === 0)
        return null;
    values.push(id);
    const query = `UPDATE vehicle SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}
async function deleteVehicle(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM vehicle WHERE vehicle_id = $1 RETURNING vehicle_id", [
        id,
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
