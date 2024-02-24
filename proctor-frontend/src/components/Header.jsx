import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import axios from "axios";

const URL = "http://localhost:3000";
// const URL = "https://proctor-backend.onrender.com"

function Header({ roomId }) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  const stopRec = async () => {
    let roomURL = URL + `/api/room/stop_rec/${roomId}`;

    const res = await axios.post(roomURL);
    console.log(res);
  };
  return (
    <header>
      {isConnected && (
        <button
          id="leave-btn"
          className="btn-danger"
          onClick={async () => {
            await stopRec();
            hmsActions.leave();
          }}
        >
          Submit Test
        </button>
      )}
    </header>
  );
}

export default Header;
