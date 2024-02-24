import { Request, Response, response } from "express";
import axios from "axios";
import { generateManagementToken } from "../auth/auth";

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

export const createRoomAndRetrieveCode = async (
  req: Request,
  res: Response
) => {
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
    const token = await generateManagementToken();
    //   console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(roomURL, roomBody, { headers });
    console.log("room created: ", response.data);

    res.status(200).json(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating room: ", error.message);
    res.status(400).json(error);
  }
};

// create room code to generate room link
export const createRoomCode = async (req: Request, res: Response) => {
  console.log("helloooo");
  const { roomId } = req.params;
  console.log(roomId);
  const roomURL = room + `v2/room-codes/room/${roomId}`;

  //   console.log(token);
  const token = await generateManagementToken();

  console.log(token);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  await axios
    .post(roomURL, {}, { headers })
    .then(async (response) => {
      console.log("room created: ", response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("Error creating room: ", error.message);
      res.status(400).json(error);
    });
};

export const getRoomDetails = async (req: Request, res: Response) => {
  console.log("inside room");
  const { roomId } = req.params;
  const roomURL = room + `v2/room-codes/room/${roomId}`;

  const token = await generateManagementToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  await axios
    .get(roomURL, { headers })
    .then(async (response) => {
      console.log("room details: ", response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching room: ", error.message);
      res.status(400).json(error);
    });
};

// start recording when test is started
export const start_recording = async (req: Request, res: Response) => {
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

  const token = await generateManagementToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const roomBody = {
    meeting_url: meeting_url,
    resolution: resolution,
  };

  await axios
    .post(roomURL, roomBody, { headers })
    .then(async (response) => {
      console.log("room details: ", response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("recording couldnt start: ", error.message);
      res.status(400).json(error);
    });
};

export const stop_recording = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  // console.log(roomId);
  console.log("inside stop recording");

  const roomURL = room + `v2/recordings/room/${roomId}/stop`;

  const token = await generateManagementToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  await axios
    .post(roomURL, {}, { headers })
    .then(async (response) => {
      console.log("room details: ", response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("recording couldnt stop: ", error.message);
      res.status(400).json(error);
    });
};
