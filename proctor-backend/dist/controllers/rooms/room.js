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
exports.stop_recording = exports.start_recording = exports.getRoomDetails = exports.createRoomCode = exports.createRoomAndRetrieveCode = void 0;
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../auth/auth");
/*  A room will be created when a recruiter assigns a assignment to candidate
    data to be stored -
    {
        room_id: string,
        candidate_id: string,
        room_name: string,
        room_code: string
    }

*/
const room = "https://api.100ms.live/";
const createRoomAndRetrieveCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside create room function");
        const { name, description, template_id } = req.body;
        console.log(req.body);
        const roomBody = {
            name: name,
            description: description,
            template_id: template_id,
        };
        const roomURL = room + "v2/rooms";
        const token = yield (0, auth_1.generateManagementToken)();
        //   console.log(token);
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = yield axios_1.default.post(roomURL, roomBody, { headers });
        console.log("room created: ", response.data);
        res.status(200).json(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error creating room: ", error.message);
        res.status(400).json(error);
    }
});
exports.createRoomAndRetrieveCode = createRoomAndRetrieveCode;
// create room code to generate room link
const createRoomCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("helloooo");
    const { roomId } = req.params;
    console.log(roomId);
    const roomURL = room + `v2/room-codes/room/${roomId}`;
    //   console.log(token);
    const token = yield (0, auth_1.generateManagementToken)();
    console.log(token);
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    yield axios_1.default
        .post(roomURL, {}, { headers })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("room created: ", response.data);
        res.status(200).json(response.data);
    }))
        .catch((error) => {
        console.error("Error creating room: ", error.message);
        res.status(400).json(error);
    });
});
exports.createRoomCode = createRoomCode;
const getRoomDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside room");
    const { roomId } = req.params;
    const roomURL = room + `v2/room-codes/room/${roomId}`;
    const token = yield (0, auth_1.generateManagementToken)();
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    yield axios_1.default
        .get(roomURL, { headers })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("room details: ", response.data);
        res.status(200).json(response.data);
    }))
        .catch((error) => {
        console.error("Error fetching room: ", error.message);
        res.status(400).json(error);
    });
});
exports.getRoomDetails = getRoomDetails;
// start recording when test is started
const start_recording = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      To start recording, there are few important parameters
      1. meeting_url
      2. resolution - width, height
      3. transcription
    */
    const { roomId } = req.params;
    console.log(roomId);
    console.log("inside start recording");
    const { meeting_url, resolution } = req.body;
    const roomURL = room + `v2/recordings/room/${roomId}/start`;
    console.log(roomURL);
    const token = yield (0, auth_1.generateManagementToken)();
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const roomBody = {
        meeting_url: meeting_url,
        resolution: resolution,
    };
    yield axios_1.default
        .post(roomURL, roomBody, { headers })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("room details: ", response.data);
        res.status(200).json(response.data);
    }))
        .catch((error) => {
        console.error("recording couldnt start: ", error.message);
        res.status(400).json(error);
    });
});
exports.start_recording = start_recording;
const stop_recording = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    // console.log(roomId);
    console.log("inside stop recording");
    const roomURL = room + `v2/recordings/room/${roomId}/stop`;
    const token = yield (0, auth_1.generateManagementToken)();
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    yield axios_1.default
        .post(roomURL, {}, { headers })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("room details: ", response.data);
        res.status(200).json(response.data);
    }))
        .catch((error) => {
        console.error("recording couldnt stop: ", error.message);
        res.status(400).json(error);
    });
});
exports.stop_recording = stop_recording;
