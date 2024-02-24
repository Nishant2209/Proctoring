import { useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import axios from "axios";
import Conference from "./Conference";

// const URL = "https://proctor-backend.onrender.com/"
const URL = "http://localhost:3000/";

function JoinRoom({ roomId, setRoomId, roomCode, setRoomCode }) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const [preview, setPreview] = useState(false);

  const joinRoom = async () => {
    try {
      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
      const config = {
        userName: "Jon Snow",
        authToken: authToken, // client-side token generated from your token service
        settings: {
          // initial states
          isAudioMuted: false,
          isVideoMuted: false,
        },
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: true, // whether to measure network score in preview
      };
      await hmsActions.join(config);
      await hmsActions.setScreenShareEnabled(true, {
        // forceCurrentTab: true,
        displaySurface: "monitor",
        Nishant
      });
      setPreview(!preview);

      console.log(hmsActions);

      // once the candidate joins the room, start the recording
      await startRec(roomCode, roomId);
    } catch (error) {
      console.error(error);
    }
  };

  const previewRoom = async () => {
    try {
      const createRoomURL = URL + "api/room/create";
      const date = Date.now();

      const roomBody = {
        name: `new-room-${date}`,
        description: "room for proctoring candidate",
        template_id: "65a662e4cd666ed1654e1f9c",
      };

      const responseRoom = await axios.post(createRoomURL, roomBody);
      console.log(responseRoom);

      roomId = responseRoom.data.id;
      console.log(roomId);
      setRoomId(roomId);
      const createRoomCodeURL = URL + `api/room/createCode/${roomId}`;

      const resRoomCode = await axios.post(createRoomCodeURL);
      console.log(resRoomCode);

      roomCode = resRoomCode.data.data[0].code;
      setRoomCode(roomCode);

      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      const config = {
        userName: "Jon Snow",
        authToken: authToken, // client-side token generated from your token service
        settings: {
          // initial states
          isAudioMuted: false,
          isVideoMuted: false,
        },
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: true, // whether to measure network score in preview
      };

      const res = await hmsActions.preview(config);
      console.log(res?.code);
      // console.log(res?.data?.c);
      setPreview(!preview);
    } catch (error) {
      console.error(error?.data);
    }
  };

  const startRec = async (roomCode, roomId) => {
    let recURL = "";
    console.log("room id start rec: ", roomCode);

    let domain = "abhisheky2401-videoconf-1635.app.100ms.live";
    let meetingURLRoomCode = "https://" + domain + "/meeting/" + roomCode;
    const roomBody = {
      meeting_url: meetingURLRoomCode,
      resolution: {
        width: 1280,
        height: 720,
      },
    };
    console.log(roomBody);
    recURL = URL + `api/room/start_rec/${roomId}`;
    console.log("recURL: ", recURL);

    const recordData = await axios.post(recURL, roomBody);
    console.log(recordData);
  };

  console.log(preview);
  return (
    <div>
      {preview ? (
        <>
          <Conference />
          <button onClick={() => joinRoom()}>Join Room</button>
        </>
      ) : (
        <button onClick={() => previewRoom()}>Start Test</button>
      )}
    </div>
  );
}

export default JoinRoom;
