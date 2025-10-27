import { RoomEvent, type Room } from "livekit-client";
import { useEffect, useRef } from "react";

type PropTypes = {
	room: Room
}

const VideoRoom = ({ room }: PropTypes) => {
	const localRef = useRef<HTMLVideoElement | null>(null);
	const remoteRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		room.on(RoomEvent.TrackSubscribed, (_pub, track) => {
			if (track.kind === "video" && remoteRef.current) {
				track.
			}
		});

		room.localParticipant.setCameraEnabled(true);

		return () => {
			room.disconnect();
		}
	}, [room])

	return (
		<div>
			<video ref={localRef} autoPlay muted playsInline />
			<video ref={remoteRef} autoPlay playsInline />
		</div>
	);
};

export default VideoRoom
