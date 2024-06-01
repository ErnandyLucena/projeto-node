"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// src/services/authService.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../utils/db"));
const JWT_SECRET = 'your_jwt_secret';
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const id = (0, uuid_1.v4)();
    const result = yield db_1.default.query('INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *', [id, username, hashedPassword]);
    return result.rows[0];
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    return null;
});
exports.login = login;
