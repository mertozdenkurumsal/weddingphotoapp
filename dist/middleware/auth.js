"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.substring('Bearer '.length);
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
