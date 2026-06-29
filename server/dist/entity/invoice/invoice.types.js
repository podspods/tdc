"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceInit = void 0;
const constant_1 = require("../../common/constant");
exports.invoiceInit = {
    id: 0,
    garageId: 0,
    vehicleId: 0,
    invoiceNumber: "invoiceNumber-init",
    issueDate: constant_1.dateInit,
    dueDate: constant_1.dateInit,
    statusCode: 0,
    createdBy: "Init",
    createdAt: constant_1.dateInit,
    updatedAt: constant_1.dateInit,
    notes: "note-init",
};
