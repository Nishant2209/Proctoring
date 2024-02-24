/* 

  Broadly there are two types of tokens used in our server:

 1. Management Token
 - Used to authenticate the API requests made to 100ms server
 - Requires the APP_ACCESS_KEY and APP_SECRET to generate management token

 2. Auth Token
 - Used to authenticate user while joining the room
 
*/

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import uuid4 from "uuid4";

const APP_ACCESS_KEY = "65a662a3672616331ebab093";
const APP_SECRET =
  "CavYiciXL7WTIeatjFG1Ibj9N4NoUgZdOSHUqZrkhpGeUOml8v92R3U_yXYa-b8T8WR33FCO5EoMZFBNGt7wliw3oZNcZsaQ30VSv2lV0R-xWms-fjY5Xy1wh9jomKOs2SMoVtPa1oitSCSXadNW81CcVi-31c1OFlvYHww5dnw=";

export const generateManagementToken = async () => {
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
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      APP_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24h",
        jwtid: uuid4(),
      },
      function (error: any, token: string | undefined) {
        if (error) {
          console.error(error);
          reject(error);
        } else if (token) {
          console.log("management token: ", token);
          resolve(token);
        } else {
          reject(new Error("Token is undefined."));
        }
      } as jwt.SignCallback
    );
  });
};

export const getAuthToken = () => {};

export const generateAccessToken = () => {
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
    const token = jwt.sign(
      payload,
      APP_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24h",
        jwtid: uuid4(),
      },
      function (error: any, token: string | undefined) {
        if (error) {
          console.error(error);
          throw error;
        } else {
          console.log(token);
        }
      } as jwt.SignCallback
    );
  } catch (error) {
    console.error(error);
  }
};
