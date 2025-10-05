"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const userStore_1 = require("../store/userStore");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
// Simple in-memory refresh token store per userId
const userIdToRefreshTokens = new Map();
function addRefreshToken(userId, token) {
    const set = userIdToRefreshTokens.get(userId) || new Set();
    set.add(token);
    userIdToRefreshTokens.set(userId, set);
}
function revokeRefreshToken(userId, token) {
    const set = userIdToRefreshTokens.get(userId);
    if (set) {
        set.delete(token);
        if (set.size === 0)
            userIdToRefreshTokens.delete(userId);
    }
}
function revokeAllRefreshTokens(userId) {
    userIdToRefreshTokens.delete(userId);
}
router.post('/register', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }
    const existing = userStore_1.userStore.getByEmail(email);
    if (existing) {
        return res.status(409).json({ error: 'email already registered' });
    }
    const passwordHash = await (0, password_1.hashPassword)(password);
    const userId = crypto_1.default.randomUUID();
    const user = userStore_1.userStore.createUser({ id: userId, email, passwordHash });
    const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, email: user.email });
    const refreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id });
    addRefreshToken(user.id, refreshToken);
    return res.status(201).json({ user: { id: user.id, email: user.email }, tokens: { accessToken, refreshToken } });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }
    const user = userStore_1.userStore.getByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'invalid credentials' });
    }
    const ok = await (0, password_1.verifyPassword)(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({ error: 'invalid credentials' });
    }
    const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, email: user.email });
    const refreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id });
    addRefreshToken(user.id, refreshToken);
    return res.json({ user: { id: user.id, email: user.email }, tokens: { accessToken, refreshToken } });
});
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
        return res.status(400).json({ error: 'refreshToken is required' });
    }
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const userId = decoded.sub;
        const set = userIdToRefreshTokens.get(userId);
        if (!set || !set.has(refreshToken)) {
            return res.status(401).json({ error: 'invalid refresh token' });
        }
        const newAccess = (0, jwt_1.signAccessToken)({ sub: userId });
        const newRefresh = (0, jwt_1.signRefreshToken)({ sub: userId });
        // rotate tokens
        revokeRefreshToken(userId, refreshToken);
        addRefreshToken(userId, newRefresh);
        return res.json({ tokens: { accessToken: newAccess, refreshToken: newRefresh } });
    }
    catch (err) {
        return res.status(401).json({ error: 'invalid or expired refresh token' });
    }
});
router.post('/logout', (req, res) => {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
        return res.status(400).json({ error: 'refreshToken is required' });
    }
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const userId = decoded.sub;
        revokeRefreshToken(userId, refreshToken);
        return res.status(204).send();
    }
    catch (err) {
        return res.status(200).json({ message: 'already logged out' });
    }
});
router.get('/me', auth_1.requireAuth, (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = userStore_1.userStore.getById(userId);
    if (!user) {
        return res.status(404).json({ error: 'user not found' });
    }
    return res.json({ user: { id: user.id, email: user.email } });
});
exports.default = router;
