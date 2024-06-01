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
exports.deleteItem = exports.updateItem = exports.getItems = exports.addItem = void 0;
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../utils/db"));
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const id = (0, uuid_1.v4)();
        const user_id = req.userId;
        const result = yield db_1.default.query('INSERT INTO items (id, user_id, name, description) VALUES ($1, $2, $3, $4) RETURNING *', [id, user_id, name, description]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addItem = addItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.userId;
        const result = yield db_1.default.query('SELECT * FROM items WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getItems = getItems;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description } = req.body;
        const user_id = req.userId;
        const result = yield db_1.default.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *', [name, description, id, user_id]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user_id = req.userId;
        yield db_1.default.query('DELETE FROM items WHERE id = $1 AND user_id = $2', [id, user_id]);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteItem = deleteItem;
