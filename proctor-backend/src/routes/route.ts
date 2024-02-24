// const express = require('express');
import express from "express";
const router = express.Router();
import {
  createRoomAndRetrieveCode,
  createRoomCode,
  getRoomDetails,
  start_recording,
  stop_recording,
} from "../controllers/rooms/room";

router.post("/create", createRoomAndRetrieveCode);
router.post("/createCode/:roomId", createRoomCode);
router.get("/getRoom/:roomId", getRoomDetails);
router.post("/start_rec/:roomId", start_recording);
router.post("/stop_rec/:roomId", stop_recording);

module.exports = { router };
