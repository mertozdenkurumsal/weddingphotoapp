"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
class InMemoryUserStore {
    constructor() {
        this.usersByEmail = new Map();
        this.usersById = new Map();
        this.createUser = (user) => {
            const now = new Date().toISOString();
            const newUser = { ...user, createdAt: now, updatedAt: now };
            this.usersByEmail.set(newUser.email.toLowerCase(), newUser);
            this.usersById.set(newUser.id, newUser);
            return newUser;
        };
        this.getByEmail = (email) => {
            return this.usersByEmail.get(email.toLowerCase());
        };
        this.getById = (id) => {
            return this.usersById.get(id);
        };
    }
}
exports.userStore = new InMemoryUserStore();
