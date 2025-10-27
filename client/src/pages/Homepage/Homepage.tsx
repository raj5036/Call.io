import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../../api/ApiClient"
import { useState } from "react";
import { Room } from "livekit-client";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

const HomePage = () => {
	const [token, setToken] = useState<string>("");
	const [serverUrl, setServerUrl] = useState<string>("");
	const [roomName, setRoomName] = useState<string>("demo");

	const { mutateAsync: joinRoom, isPending: isJoining } = useMutation({
		mutationFn: () => ApiClient.Room.joinRoom(roomName),
		onSuccess: async (data) => {
			const { token, liveKit_url } = data;
			console.log(token, liveKit_url);
			setToken(token);
			setServerUrl(serverUrl);

			const lkRoom = new Room({
				adaptiveStream: true, // Optimize video quality for each participant's screen
				dynacast: true, // Enable automatic audio/video quality optimization
			});
			await lkRoom.connect(liveKit_url, token);
		
		},
		onError: error => {
			console.error("Failed to join room:", error);
			alert("Failed to join room (see console).");
		},
	})

	const reset = () => {
		setToken("");
		setServerUrl("");
	}

	if (!token || !serverUrl) {
		return (
			<div style={{ padding: 24, maxWidth: 420 }}>
				<h2>Join a LiveKit Room</h2>
				<label style={{ display: "block", marginBottom: 12 }}>
					Room name
					<input
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
						placeholder="demo"
						style={{ display: "block", width: "100%", marginTop: 6 }}
					/>
				</label>
				<button onClick={async () => await joinRoom()} disabled={isJoining || !roomName.trim()}>
					{isJoining ? "Joining..." : "Join Room"}
				</button>
			</div>
		);
	}

	return (
		<LiveKitRoom
			token={token}
			serverUrl={serverUrl}
			connect
			video={true}
			audio={true}
			onDisconnected={reset} // called when the room disconnects (e.g., user clicks Leave)
			style={{ height: "100vh" }}
		>
				<VideoConference />
		</LiveKitRoom>
	);
}

export default HomePage