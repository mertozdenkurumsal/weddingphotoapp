"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', env: env_1.env.nodeEnv });
});
app.use('/api/auth', auth_1.default);
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
app.listen(env_1.env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${env_1.env.port}`);
});
