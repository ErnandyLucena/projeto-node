"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/db.ts
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432, // ou a porta que você estiver usando
});
exports.default = pool;
