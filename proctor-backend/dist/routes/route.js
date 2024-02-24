"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const room_1 = require("../controllers/rooms/room");
router.post("/create", room_1.createRoomAndRetrieveCode);
router.post("/createCode/:roomId", room_1.createRoomCode);
router.get("/getRoom/:roomId", room_1.getRoomDetails);
router.post("/start_rec/:roomId", room_1.start_recording);
router.post("/stop_rec/:roomId", room_1.stop_recording);
module.exports = { router };
