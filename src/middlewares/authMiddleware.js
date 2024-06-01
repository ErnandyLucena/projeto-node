"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jwt = require("jsonwebtoken");
var JWT_SECRET = '7gqGgYQ1LzM^&u^%AMO@x!cpTmXivJk8Bfz'; 
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; 
    if (!token) {
        console.log('Token not provided');
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
    try {
        var decoded = jwt.verify(token, JWT_SECRET); 
        console.log('Decoded token:', decoded); 
        req.user = {
            id: decoded.userId,
            //
        };
        next();
    }
    catch (err) {
        console.error('Error verifying JWT:', err);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
