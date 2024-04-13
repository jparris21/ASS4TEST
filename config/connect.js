"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_1 = __importDefault(require("./db"));
const client = new mongodb_1.MongoClient(db_1.default.URI);
async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
exports.default = connect;
//# sourceMappingURL=connect.js.map