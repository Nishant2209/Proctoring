import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ height: "250px", width: "250px" }}
      ></video>
    </div>
  );
}

export default Peer;
