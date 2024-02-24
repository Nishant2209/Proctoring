"use strict";
/*

  Broadly there are two types of tokens used in our server:

 1. Management Token
 - Used to authenticate the API requests made to 100ms server
 - Requires the APP_ACCESS_KEY and APP_SECRET to generate management token

 2. Auth Token
 - Used to authenticate user while joining the room
 
*/
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
exports.generateAccessToken = exports.getAuthToken = exports.generateManagementToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid4_1 = __importDefault(require("uuid4"));
const APP_ACCESS_KEY = "65a662a3672616331ebab093";
const APP_SECRET = "CavYiciXL7WTIeatjFG1Ibj9N4NoUgZdOSHUqZrkhpGeUOml8v92R3U_yXYa-b8T8WR33FCO5EoMZFBNGt7wliw3oZNcZsaQ30VSv2lV0R-xWms-fjY5Xy1wh9jomKOs2SMoVtPa1oitSCSXadNW81CcVi-31c1OFlvYHww5dnw=";
const generateManagementToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        access_key: APP_ACCESS_KEY,
        type: "management",
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
    };
    // try {
    //   jwt.sign(
    //     payload,
    //     APP_SECRET,
    //     {
    //       algorithm: "HS256",
    //       expiresIn: "24h",
    //       jwtid: uuid4(),
    //     },
    //     function (error: any, token: string | undefined) {
    //       if (error) {
    //         console.error(error);
    //         throw error;
    //       }
    //       console.log("management token: ", token);
    //       return token;
    //     } as jwt.SignCallback
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, APP_SECRET, {
            algorithm: "HS256",
            expiresIn: "24h",
            jwtid: (0, uuid4_1.default)(),
        }, function (error, token) {
            if (error) {
                console.error(error);
                reject(error);
            }
            else if (token) {
                console.log("management token: ", token);
                resolve(token);
            }
            else {
                reject(new Error("Token is undefined."));
            }
        });
    });
});
exports.generateManagementToken = generateManagementToken;
const getAuthToken = () => { };
exports.getAuthToken = getAuthToken;
const generateAccessToken = () => {
    const payload = {
        access_key: APP_ACCESS_KEY,
        room_id: "jxu-awyb-gpj",
        user_id: "abhi",
        role: "candidate",
        type: "app",
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
    };
    try {
        const token = jsonwebtoken_1.default.sign(payload, APP_SECRET, {
            algorithm: "HS256",
            expiresIn: "24h",
            jwtid: (0, uuid4_1.default)(),
        }, function (error, token) {
            if (error) {
                console.error(error);
                throw error;
            }
            else {
                console.log(token);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.generateAccessToken = generateAccessToken;
