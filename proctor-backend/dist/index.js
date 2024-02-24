"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require("http");
const cors = require("cors");
const app = (0, express_1.default)();
const server = http.createServer(app);
const { router } = require("./routes/route");
app.use(express_1.default.json());
app.use(cors());
const authenticateMiddleware = (req, res, next) => {
    try {
        const managementToken = req.headers["authorization"]; // Use "authorization" instead of "Authorization"
        if (!managementToken) {
            return res
                .status(401)
                .json({ error: "You are not authorized to perform this action" });
        }
        next();
    }
    catch (error) {
        console.error("Error in fetching token");
        return res.status(500).json({ error: error.message });
    }
};
// app.use(authenticateMiddleware);
const prefix = "/api";
app.use(`${prefix}/room`, router);
app.get("/", (req, res) => {
    res.status(200).json("server running");
});
server.listen(3000, () => {
    console.log(`listening on port 3000`);
});
