"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPartAndLabor = getAllPartAndLabor;
exports.getPartAndLaborById = getPartAndLaborById;
exports.getPartAndLaborByCode = getPartAndLaborByCode;
exports.createPartAndLabor = createPartAndLabor;
exports.updatePartAndLabor = updatePartAndLabor;
exports.deletePartAndLabor = deletePartAndLabor;
const repository = __importStar(require("./repository"));
async function getAllPartAndLabor(fastify, params = {}) {
    //----------------------------------------------------------------------------------------------
    let { page = 1, limit = 20, typeLineCode, categoryCode, subCategoryCode, brandCode, search, } = params;
    //----------------------------------------------------------------------------------------------
    const noPagination = limit !== undefined && limit <= 0;
    const effectivePage = !noPagination && page !== undefined && page > 0 ? page : 1;
    const effectiveLimit = !noPagination && limit !== undefined && limit > 0 ? limit : 20;
    const offset = !noPagination ? (effectivePage - 1) * effectiveLimit : 0;
    //----------------------------------------------------------------------------------------------
    const conditions = [];
    const values = [];
    let idx = 1;
    //----------------------------------------------------------------------------------------------
    if (typeLineCode) {
        conditions.push(`type_line_code = $${idx++}`);
        values.push(typeLineCode);
    }
    if (categoryCode) {
        conditions.push(`category_code = $${idx++}`);
        values.push(categoryCode);
    }
    if (subCategoryCode) {
        conditions.push(`sub_category_code = $${idx++}`);
        values.push(subCategoryCode);
    }
    if (brandCode) {
        conditions.push(`brand_code = $${idx++}`);
        values.push(brandCode);
    }
    if (search) {
        conditions.push(`(name ILIKE $${idx} OR code ILIKE $${idx} OR description ILIKE $${idx})`);
        values.push(`%${search}%`);
        idx++;
    }
    //----------------------------------------------------------------------------------------------
    const whereClause = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
    const total = await repository.count(fastify, whereClause, values);
    //----------------------------------------------------------------------------------------------
    let data;
    if (noPagination) {
        data = await repository.findAll(fastify, whereClause, values, undefined, 0);
    }
    else {
        data = await repository.findAll(fastify, whereClause, values, effectiveLimit, offset);
    }
    //----------------------------------------------------------------------------------------------
    return { data, total };
}
async function getPartAndLaborById(fastify, id) {
    return repository.findById(fastify, id);
}
async function getPartAndLaborByCode(fastify, code) {
    return repository.findByCode(fastify, code);
}
async function createPartAndLabor(fastify, data) {
    return repository.create(fastify, data);
}
async function updatePartAndLabor(fastify, id, data) {
    return repository.update(fastify, id, data);
}
async function deletePartAndLabor(fastify, id) {
    return repository.remove(fastify, id);
}
