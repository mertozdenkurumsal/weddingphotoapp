"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BCRYPT_SALT_ROUNDS = 10;
async function hashPassword(plainPassword) {
    return await bcryptjs_1.default.hash(plainPassword, BCRYPT_SALT_ROUNDS);
}
async function verifyPassword(plainPassword, hashedPassword) {
    return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
}
