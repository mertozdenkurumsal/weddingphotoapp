"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me',
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '7d',
};
