import {
  selectPeers,
  useHMSStore,
  useHMSActions,
  selectLocalPeer,
  selectPeerAudioByID,
  selectSpeakers,
  selectDominantSpeaker,
} from "@100mslive/react-sdk";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  /** get localpeer from store */
  const localpeer = useHMSStore(selectLocalPeer);
  /** get a given peer's audio level. */
  const peerAudioLevel = useHMSStore(selectPeerAudioByID(localpeer?.id));
  console.log(`audio level for peer - ${localpeer?.id} is ${peerAudioLevel}`);

  /** get all speakers. Gives back a list of all peers who are not muted. */
  const allSpeakers = useHMSStore(selectSpeakers);
  console.log("all speakers", allSpeakers);

  /** gets the active speaker */
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  console
    .log
    // `current active speaker - ${dominantSpeaker?.name} with role - ${dominantSpeaker?.roleName}`
    ();
  return (
    <div className="conference-section">
      <h2>Conference</h2>

      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
      <>
        <h1>Active Speaker</h1>
        <span>{dominantSpeaker?.id}</span>
      </>
    </div>
  );
}

export default Conference;
